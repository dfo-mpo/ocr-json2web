"use client";  
import styles from "./Iframe.module.css";  
import { useState, useEffect, useRef } from "react";  
import * as pdfjsLib from "pdfjs-dist";  
import "pdfjs-dist/web/pdf_viewer.css";   
import workerSrc from 'pdfjs-dist/build/pdf.worker?worker&url';
  
// You will need to set the workerSrc for PDF.js  
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";
// pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';
// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(  
//   'pdfjs-dist/build/pdf.worker.min.mjs',  
//   import.meta.url  
// ).toString(); 

const Iframe = ({ fileName, folderName, pageWidth, json, highlightColour, selectedPolygon, onBoxClick }) => {  
  const [isLoading, setIsLoading] = useState(true);  
  const [isPdf, setIsPdf] = useState(true);  
  const [boxes, setBoxes] = useState([]);
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfPage, setPdfPage] = useState(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const canvasRef = useRef(null);  
  const renderTaskRef = useRef(null); 

  const pdfName = fileName.replace(".json", ".pdf");  

  const submitData = {  
    fileName: pdfName,  
    folderName: folderName,  
  };  

  useEffect(() => {
    if (canvasRef.current) {
      setIsCanvasReady(true);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (isCanvasReady) {
      console.log("isCanvasReady", isCanvasReady);
      console.log(canvasRef);
    }
  },[isCanvasReady, canvasRef]);

  //fetch pdf data from blob  
  const fetchPdfData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/readPDF", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok || response.status === 203) {
        setIsPdf(false);
        return;
      }

      const pdfBlob = await response.blob();
      const url = URL.createObjectURL(pdfBlob);
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      setPdfPage(page);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
      setIsPdf(false);
    }
  };

  useEffect(() => {
    console.log("pageWidth:", pageWidth);
  },[pageWidth]);

  const extractBoxesFromJson = (jsonData) => {
    const boxes = [];
    const DPI = 72;

    const scaleFactor = pdfWidth > 0 ? pageWidth / pdfWidth : 1;
    let colourIndex = 0;
    
    const extractCoords = (coordsList) => {
      const combinedCoords = Object.assign({}, ...coordsList);
      return [combinedCoords.x1, combinedCoords.y1, combinedCoords.x3, combinedCoords.y3];
    };

    const processCell = (rowKey, columnKey, bundle) => {
      if (Array.isArray(bundle) && bundle.length > 1 && Array.isArray(bundle[1])) {
        const coordsList = bundle[1];
        if (coordsList && coordsList.every(coord => typeof coord === "object")) {
          const coords = extractCoords(coordsList);
          if (coords.every(coord => coord !== undefined)) {
            const uniqueKey = `${rowKey} - ${columnKey}`;
            boxes.push({
              key: uniqueKey,
              coords: coords.map(coord => coord * DPI * scaleFactor),
            });
            colourIndex++;
          }
        }
      }
    };

    const processJson = (data, parentKey = "") => {
      if (Array.isArray(data)) {
        data.forEach((row, index) => {
          if (typeof row === "object") {
            const rowKey = `${parentKey} Row ${index + 1}`;
            for (const [columnKey, cellValue] of Object.entries(row)) {
              processCell(rowKey, columnKey, cellValue);
            }
          }
        });
      } else if (typeof data === "object") {
        for (const [key, value] of Object.entries(data)) {
          const newKey = parentKey ? `${parentKey} ${key}`.trim() : key;
          if (Array.isArray(value) && value.length > 1 && Array.isArray(value[1])) {
            const coordsList = value[1];
            if (coordsList && coordsList.every(coord => typeof coord === "object")) {
              const coords = extractCoords(coordsList);
              if (coords.every(coord => coord !== undefined)) {
                boxes.push({
                  key: newKey,
                  coords: coords.map(coord => coord * DPI * scaleFactor),
                });
                colourIndex++;
              }
            }
          } else {
            processJson(value, newKey);
          }
        }
      }
    };

    processJson(jsonData);
    return boxes;
  };

  const renderPDF = async (page, canvasRef) => {
    const scale = 1;
    const pdfWidth = page.getViewport({ scale }).width;
    const viewport = page.getViewport({ scale: pageWidth / pdfWidth });
    setPdfWidth(pdfWidth);

    if (canvasRef.current) {
      console.warn("Canvas ref available.");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {  
        canvasContext: context,  
        viewport: viewport,  
      };  

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      await renderTask.promise.catch(console.error);
      renderTaskRef.current = null;
    } else {
      console.warn("Canvas ref is not available.");
    }
  };

  useEffect(() => {
    fetchPdfData();
  }, []);

  useEffect(() => {
    if (pdfPage && !renderTaskRef.current) {
      renderPDF(pdfPage, canvasRef);
      const extractedBoxes = extractBoxesFromJson(json);  
      setBoxes(extractedBoxes);  
      setIsLoading(false);
    }
  }, [pdfPage, pageWidth, canvasRef, json]);

  useEffect(() => {
    console.log("Loading state changed:", isLoading);
  }, [isLoading]); // Log after state changes

  return (
    <>
      {isPdf ? (
        !isLoading ? (
          <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} />
            {boxes.map((box) => (
              <div
                key={box.key}
                className={`${styles.box} ${styles.hoverBackground} ${selectedPolygon === box.key ? styles.highlight : ''}`}
                style={{
                  left: `${box.coords[0]}px`,
                  top: `${box.coords[1]}px`,
                  width: `${box.coords[2] - box.coords[0]}px`,
                  height: `${box.coords[3] - box.coords[1]}px`,
                  borderColor: `${highlightColour}`,
                  display: selectedPolygon && selectedPolygon !== box.key? 'none' : '',
                  '--hover-bg-color': `rgba(${parseInt(highlightColour.slice(1, 3), 16)}, ${parseInt(highlightColour.slice(3, 5), 16)}, ${parseInt(highlightColour.slice(5, 7), 16)}, 0.5)`, 
                }}
                onClick={() => onBoxClick(box.key)}
              >
                {/* <div className={styles.tooltip}>{box.key}</div> */}
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <div className={styles.noData}>No PDF file found</div>
      )}
    </>
  );
};

export default Iframe;

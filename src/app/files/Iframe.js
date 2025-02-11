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

const Iframe = ({ fileName, folderName, pageWidth, json, polygonKeys, highlightColour, selectedPolygon, onBoxClick }) => {  
  const [isLoading, setIsLoading] = useState(false);   
  const [isPdf, setIsPdf] = useState(true);   
  const [boxes, setBoxes] = useState([]);
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfPage, setPdfPage] = useState(null);
  const canvasRef = useRef(null);  
  const renderTaskRef = useRef(null); // Add ref to store the rendering task 
  
  let pdfName = fileName.replace(".json", ".pdf");  
  const submitData = {  
    fileName: pdfName,  
    folderName: folderName,  
  };  
  
  //fetch pdf data from blob  
  const asyncFetch = async () => {  
    setIsLoading(true);  
    const response = await fetch("/api/readPDF", {  
      method: "POST",  
      headers: {  
        "Content-Type": "application/json",  
      },  
      body: JSON.stringify(submitData),  
    });  
  
    if (!response.ok) {  
      setIsPdf(false);  
      throw new Error(response.statusText);  
    } else if (response.status === 203) {  
      console.log("No data");  
      setIsPdf(false);  
    } else {  
      var pdf = await response.blob();  
      const url = URL.createObjectURL(pdf);
      const loadingTask = pdfjsLib.getDocument(url);  
      pdf = await loadingTask.promise;  
      const page = await pdf.getPage(1); 
      
      setPdfPage(page); 
    }  
  };  
  
  const extractBoxesFromJson = (jsonData) => {  
    const boxes = [];  
    const DPI = 72; 

    var scaleFactor = pdfWidth > 0? pageWidth / pdfWidth : 1; 
    let colourIndex = 0;  
  
    function extractCoords(coordsList) {  
      const combinedCoords = {};  
      for (const coords of coordsList) {  
        Object.assign(combinedCoords, coords);  
      }  
      return [combinedCoords.x1, combinedCoords.y1, combinedCoords.x3, combinedCoords.y3];  
    }  
  
    function processCell(rowKey, columnKey, bundle) {  
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
    }  
  
    function processJson(data, parentKey = "") {  
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
    }  
  
    processJson(jsonData);  
    return boxes;  
  }; 
  
  const renderPDF = async (page) => {   
    const scale = 1; 
    const pdfWidth =  page.getViewport({ scale: scale }).width;
    const viewport = page.getViewport({ scale: pageWidth / pdfWidth}); 
    setPdfWidth(pdfWidth); 
  
    if (canvasRef.current) {
      const canvas = canvasRef.current;  
      const context = canvas.getContext("2d");  
      canvas.height = viewport.height;  
      canvas.width = viewport.width;  
    
      const renderContext = {  
        canvasContext: context,  
        viewport: viewport,  
      };  
    
      const renderTask = page.render(renderContext);  
      renderTaskRef.current = renderTask; // Store the render task  
      await renderTask.promise.then(  
        function () {  
          // Render completed  
          renderTaskRef.current = null;  
        },  
        function (error) {  
          // Handle error during rendering  
          console.error(error);  
          renderTaskRef.current = null;  
        }  
      );  
    }
    
  }; 
  
  // useEffect(() => {  
  //   asyncFetch();  
  // }, []);

  // Whenever a new with is defined for this component, re render pdf and boxes to match it
  useEffect(() => {
    const fetchRenderPdf = async () => {
      if (!pdfPage) {
        await asyncFetch();
      }

      if (pdfPage) {
        // If render is active, do not rerender  
        if (renderTaskRef.current) {  
          return;
        }  

        renderPDF(pdfPage); 
        const extractedBoxes = extractBoxesFromJson(json);  
        setBoxes(extractedBoxes);  
        setIsLoading(false); 
      }
    };

    fetchRenderPdf();
  }, [pageWidth, pdfPage])
  
  return (  
    <>  
      {isPdf ? (  
        !isLoading ? (  
          <div className={styles.container}>  
            <canvas ref={canvasRef} className={styles.canvas} />  
            {boxes.map((box) => (  
              <div  
                key={box.key}  
                className={`${styles.box} ${styles.hoverBackground} ${selectedPolygon === box.key? styles.highlight : ''}`}  
                style={{  
                  left: `${box.coords[0]}px`,  
                  top: `${box.coords[1]}px`,  
                  width: `${box.coords[2] - box.coords[0]}px`,  
                  height: `${box.coords[3] - box.coords[1]}px`,  
                  borderColor: `${highlightColour}`,
                  display: selectedPolygon && selectedPolygon !== box.key? 'none' : '',
                  '--hover-bg-color': `rgba(${parseInt(highlightColour.slice(1, 3), 16)}, ${parseInt(highlightColour.slice(3, 5), 16)}, ${parseInt(highlightColour.slice(5, 7), 16)}, 0.5)`, 
                }} 
                onClick={()=>{onBoxClick(box.key);}}
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
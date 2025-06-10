"use client";  
import styles from "./PDFView.module.css";  
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

const PDFView = ({ fileName, folderName, pageWidth, json, highlightColour, selectedPolygon, onBoxClick, onPDFWidth }) => {  
  const [isLoading, setIsLoading] = useState(false);   
  const [isPdf, setIsPdf] = useState(true);   
  const [boxes, setBoxes] = useState([]);
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfPage, setPdfPage] = useState(null);
  const [pdfObject, setPdfObject] = useState(null);
  const [pdfPageNumber, setPdfPageNumber] = useState({current: 1, max: 1});
  const [freezePageBtns, setFreezePageBtns] = useState(false);
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
      setPdfObject(pdf);
      setPdfPageNumber({current: pdfPageNumber.current, max: pdf.numPages});
 
      const page = await pdf.getPage(1); 
      setPdfPage(page);
    }  
  };
  
  const extractBoxesFromJson = (jsonData) => {  
    const boxes = [];  
    const DPI = 72; 

    var scaleFactor = pdfWidth > 0? pageWidth / pdfWidth : 1;  
  
    function extractCoords(coordsList) {  
      const combinedCoords = {};  
      for (const coords of coordsList) {  
        Object.assign(combinedCoords, coords);  
      }  
      return [combinedCoords.x1, combinedCoords.y1, combinedCoords.x3, combinedCoords.y3];  
    }  
  
    function processCell(rowKey, columnKey, bundle) {  
      if (Array.isArray(bundle) && bundle.length > 2 && Array.isArray(bundle[1])) {  
        const coordsList = bundle[1];
        const pageNumber = bundle[2];   
        if (coordsList && coordsList.every(coord => typeof coord === "object")) {  
          const coords = extractCoords(coordsList);
          if (coords.every(coord => coord !== undefined)) {  
            const uniqueKey = `${rowKey} -- ${columnKey}`;  
            boxes.push({  
              key: uniqueKey,  
              coords: coords.map(coord => coord * DPI * scaleFactor),  
              pageNumber: pageNumber   
            });  
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
          const newKey = parentKey ? `${parentKey} -- ${key}`.trim() : key;  
          if (Array.isArray(value) && value.length > 2 && Array.isArray(value[1])) {  
            const coordsList = value[1];
            const pageNumber = value[2];
            if (coordsList && coordsList.every(coord => typeof coord === "object")) {  
              const coords = extractCoords(coordsList);  
              if (coords.every(coord => coord !== undefined)) {  
                boxes.push({  
                  key: newKey,  
                  coords: coords.map(coord => coord * DPI * scaleFactor), 
                  pageNumber: pageNumber  
                });  
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
    onPDFWidth(pdfWidth);
  
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

  // onClick handler for the next page button to switch the current page to the next page
  const prevPage = () => {
    if (pdfPageNumber.current > 1) {
      setFreezePageBtns(true);
      setPdfPageNumber({current: pdfPageNumber.current - 1, max: pdfPageNumber.max});
    }
  };

  // onClick handler for the next page button to switch the current page to the next page
  const nextPage = () => {
    if (pdfPageNumber.current < pdfPageNumber.max) {
      setFreezePageBtns(true);
      setPdfPageNumber({current: pdfPageNumber.current + 1, max: pdfPageNumber.max});
    }
  };
  
  // useEffect(() => {  
  //   asyncFetch();  
  // }, []);

  // Whenever a new with is defined for this component, re render pdf and boxes to match it
  useEffect(() => {
    const fetchRenderPdf = async () => {
      if (!pdfPage && !pdfObject) {
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
        setFreezePageBtns(false);
      }
    };

    fetchRenderPdf();
  }, [pageWidth, pdfPage])

  useEffect(() => {
    const getCurrentPage = async () => {
      if (pdfObject) {
        const page = await pdfObject.getPage(pdfPageNumber.current);
        setPdfPage(page);
      }
    }
    getCurrentPage();
  }, [pdfPageNumber.current])

  useEffect(() => {
    if (selectedPolygon && pdfPageNumber.max > 1) {
      const selected_box = boxes.find(box => box.key === selectedPolygon);
      if (selected_box && pdfPageNumber.current !== selected_box.pageNumber) {
        setFreezePageBtns(true);
        setPdfPageNumber({current: selected_box.pageNumber, max: pdfPageNumber.max});
      }
    }
  }, [selectedPolygon])
  
  return (  
    <>  
      {isPdf ? (  
        !isLoading ? ( 
          <> 
            {pdfPageNumber.max > 1 &&
            <div className={styles.pageToggleContainer}>
              <button onClick={prevPage} disabled={freezePageBtns || pdfPageNumber.current === 1}>Previous Page</button>
              <p>Page: {pdfPageNumber.current} of {pdfPageNumber.max}</p>
              <button onClick={nextPage} disabled={freezePageBtns || pdfPageNumber.current === pdfPageNumber.max}>Next Page</button>
            </div>
            }
            <div className={styles.container}>  
              <canvas ref={canvasRef} className={styles.canvas} />  
              {/* Only render boxes that are in the current page (pdfPageNumber.current) */}
              {boxes.map((box) => (box.pageNumber === pdfPageNumber.current &&
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
          </>
        ) : (  
          <div>Loading...</div>  
        )  
      ) : (  
        <div className={styles.noData}>No PDF file found</div>  
      )}  
    </>  
  );  
};  
  
export default PDFView;  
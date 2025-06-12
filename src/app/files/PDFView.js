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
      // This case is possible if a PDF was deleted, resulting in a JSON with no corrisponding PDF
      console.log("No data");  
      setIsPdf(false);  
    } else { 
      // Store both PDF and page seprately so current page can be rendered but other pages can be rendered on page change. 
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
  
  // Create list of box objects representing each polygon object found in the document JSON
  // The purpose of a given box is to provide a visual overlay of where the information was extracted
  const extractBoxesFromJson = (jsonData) => {  
    const boxes = [];  
    const DPI = 72; 

    // Determine a scaleFactor so generated boxes can grow/shink to allign to where they point on the PDF
    var scaleFactor = pdfWidth > 0? pageWidth / pdfWidth : 1;  
  
    // Get the top-left and bottom-right corners of from a polygon object from the json (coordsList)
    function extractCoords(coordsList) {  
      const combinedCoords = {};  
      for (const coords of coordsList) {  
        Object.assign(combinedCoords, coords);  
      }  
      return [combinedCoords.x1, combinedCoords.y1, combinedCoords.x3, combinedCoords.y3];  
    }  
  
    // Create a box for the given nested object found in JSON
    function processCell(rowKey, columnKey, bundle) {
      // Check that the given object (bundle) is not empty as DI can return empty objects if no detection is found  
      if (Array.isArray(bundle) && bundle.length > 2 && Array.isArray(bundle[1])) {  
        const coordsList = bundle[1];
        const pageNumber = bundle[2];   

        // Ensure the list of cordinates is valid
        if (coordsList && coordsList.every(coord => typeof coord === "object")) {  
          const coords = extractCoords(coordsList);
          if (coords.every(coord => coord !== undefined)) { 
            // Creat box object containing key to map to JSON object, coords for position to place box on PDF, and page number the object came from 
            const uniqueKey = `${rowKey} -- ${columnKey}`;  // Use '--' so it is easy to separate row and column names
            boxes.push({  
              key: uniqueKey,  
              coords: coords.map(coord => coord * DPI * scaleFactor),  
              pageNumber: pageNumber   
            });  
          }  
        }  
      }  
    }  
  
    // Recursive function to handel JSON data.
    // Intially will process entire JSON object.
    // Recursion may be used to process a table/nested object from the JSON. 
    function processJson(data, parentKey = "") {  
      // Case where provided data is a table/nested object from the JSON.
      if (Array.isArray(data)) { 
        // Go through each row and column, calling processCell to create a box for each table cell/nested object
        data.forEach((row, index) => {  
          if (typeof row === "object") {  
            const rowKey = `${parentKey} Row ${index + 1}`;  
            for (const [columnKey, cellValue] of Object.entries(row)) {  
              processCell(rowKey, columnKey, cellValue);  
            }  
          }  
        }); 
      // Case where provided data is the JSON itself 
      } else if (typeof data === "object") {  
        for (const [key, value] of Object.entries(data)) {  
          const newKey = parentKey ? `${parentKey} -- ${key}`.trim() : key;
          if (Array.isArray(value) && value.length > 2 && Array.isArray(value[1])) {  
            const coordsList = value[1];
            const pageNumber = value[2];
            // Ensure the list of cordinates is valid
            if (coordsList && coordsList.every(coord => typeof coord === "object")) {  
              const coords = extractCoords(coordsList);  
              if (coords.every(coord => coord !== undefined)) { 
                // Creat box object containing key to map to JSON object, coords for position to place box on PDF, and page number the object came from 
                boxes.push({  
                  key: newKey,  
                  coords: coords.map(coord => coord * DPI * scaleFactor), 
                  pageNumber: pageNumber  
                });  
              }  
            }  
          } else {  
            // If value is not an array it is likely a nested object and will be handeled with a recursive call
            processJson(value, newKey);  
          }  
        }  
      }  
    }  
  
    processJson(jsonData);  
    return boxes;  
  }; 
  
  // Read the provided pdf page object and renders the page. Render is stored in renderTaskRef
  const renderPDF = async (page) => {   
    const scale = 1; 
    const pdfWidth =  page.getViewport({ scale: scale }).width;
    const viewport = page.getViewport({ scale: pageWidth / pdfWidth}); 
    setPdfWidth(pdfWidth);
    onPDFWidth(pdfWidth);
  
    // Only render page if canvas object hosting the rendered page exists
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

  // Whenever a new width is defined for this component or the PDFPage object changes, re render pdf and boxes to match it
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

  // If the current page number changes, update PDFPage with the new current page
  useEffect(() => {
    const getCurrentPage = async () => {
      if (pdfObject) {
        const page = await pdfObject.getPage(pdfPageNumber.current);
        setPdfPage(page);
      }
    }
    getCurrentPage();
  }, [pdfPageNumber.current])

  // Whenever a new polygon is selected, if it does not exist in the current page, update the current page number 
  useEffect(() => {
    if (selectedPolygon && pdfPageNumber.max > 1) {
      const selected_box = boxes.find(box => box.key === selectedPolygon);
      if (selected_box && pdfPageNumber.current !== selected_box.pageNumber) {
        setFreezePageBtns(true); // Freeze change page btns so rendering does not conflict with user input
        setPdfPageNumber({current: selected_box.pageNumber, max: pdfPageNumber.max});
      }
    }
  }, [selectedPolygon])
  
  return (  
    <>  
      {isPdf ? (  
        !isLoading ? ( 
          <> 
            {/* Only show pages UI if document contains more than a single page */}
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
                </div>  
              ))}  
            </div>
          </>
        ) : (
          // placeholder while page is first rendering
          <div>Loading...</div>  
        )  
      ) : (  
        // Incase no PDF for the given JSON exists or is found
        <div className={styles.noData}>No PDF file found</div>  
      )}  
    </>  
  );  
};  
  
export default PDFView;  
"use client";
import styles from "./Iframe.module.css";
import { useState, useEffect, useRef } from "react";

const Iframe = ({ fileName, folderName, pageHeight, json, polygonColours }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState();
  const [isPdf, setIsPdf] = useState(true);
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  const [boxes, setBoxes] = useState([]); 

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    } else {
      setNewPageHeight(pageHeight);
    }
  }, [pageHeight]);

  let pdfName = fileName.replace(".json", ".pdf");
  const submitData = {
    fileName: pdfName,
    folderName: folderName,
  };

  //fetch pdf data from blob
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/readPDF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });
    if (!Response.ok) {
      setIsPdf(false);
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
      setIsPdf(false);
    } else {
      // Convert the response to a blob

      // const pdfBuffer = await Response.arrayBuffer();
      const pdf = await Response.blob();
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      const extractedBoxes = extractBoxesFromJson(json);  
      setBoxes(extractedBoxes);  
      setIsLoading(false);
    }
  };

  const extractBoxesFromJson = (jsonData) => {  
    const boxes = [];  
    const DPI = 100; // Change this to effect the scaling of the polygon points, DPI(dots per inch)
    let colourIndex = 0;  
    const polygonList = Object.entries(polygonColours);
  
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
              coords: coords.map(coord => coord * DPI),  
              color: polygonList[colourIndex % polygonList.length][1],  
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
                  coords: coords.map(coord => coord * DPI),  
                  color: polygonList[colourIndex % polygonList.length][1],  
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

  useEffect(() => {
    asyncFetch();
    console.log(polygonColours)
  }, []);

  return (
    <>
      {isPdf ? (  
        !isLoading ? (  
          <div className={styles.container} style={{ height: newPageHeight }}>  
            <iframe className={styles.iframe} src={pdfUrl} style={{ height: newPageHeight }} />  
            {boxes.map((box) => (  
              <div  
                key={box.key}  
                className={styles.box}  
                style={{  
                  left: `${box.coords[0]}px`,  
                  top: `${box.coords[1]}px`,  
                  width: `${box.coords[2] - box.coords[0]}px`,  
                  height: `${box.coords[3] - box.coords[1]}px`,  
                  borderColor: `${box.color}`,  
                }}  
              />  
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

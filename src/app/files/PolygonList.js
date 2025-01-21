"use client";
import styles from "./PolygonList.module.css";
import { useState, useEffect, useRef } from "react";

const PolygonList = ({ pageHeight, json, polygonColors, handleUpdatePolygon }) => {
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  // console.log("pageHeight", pageHeight);

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    } else {
      setNewPageHeight(pageHeight);
    }
  }, [pageHeight]);

  // Use Ref to adjust textarea height when loading
  const textAreaRefs = useRef({});

  useEffect(() => {
    Object.keys(json).forEach((item) => {
      const textArea = textAreaRefs.current[item];
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    });
  }, [json]);

  // Function to render polygon list
  const renderPolygon = (key, content, coordinates, color) => {
    // Check if coordinates are valid
    const areCoordinatesValid = Array.isArray(coordinates) &&
     ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"].every((requiredKey) =>
        coordinates.some((coord) => coord[requiredKey] != null)
      );

    // Recursion to handle nested objects
    if (typeof content === "object" && content != null) {
      return Object.keys(content).map((nestedKey) => (
        renderPolygon(`${key} - ${nestedKey}`, content[nestedKey][0], content[nestedKey][1], color)
      ));
    }

    // Render polygon if the content if string or null, with valid coordinates
    if ((typeof content === "string" || content === null) && areCoordinatesValid) {
      return (
        <>
        <div key={key} className={styles.polygonItem}>
          <div className={styles.labelName}>
            <span className={styles.colorCircle} style={{ backgroundColor: color }}></span>
            {key}
          </div>
          <textarea
            ref={(el) => (textAreaRefs.current[key] = el)}
            className={styles.labelText}
            value={content}
            onChange={(e) => handleUpdatePolygon(key, e.target.value)}
            rows={1}
          />
        </div>
        </>
      )
    }

    return null;
  }
  
  return (
    <>
    <div className={styles.polygonList}>
      <h4>Polygon List</h4>
      
      {Object.keys(json).map((key) => {
        const obj = json[key];
        const content = obj[0];
        const coordinates = obj[1];
        const color = polygonColors[key];
        
        return renderPolygon(key, content, coordinates, color);
      })}
      
    </div>

    </>
  );
};

export default PolygonList;

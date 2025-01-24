"use client";
import styles from "./NullFieldList.module.css";
import { useState, useEffect, useRef } from "react";

const NullFieldList = ({ pageHeight, json }) => {
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  // console.log("pageHeight", pageHeight);

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    } else {
      setNewPageHeight(pageHeight);
    }
  }, [pageHeight]);

  // Function to render null field list
  const renderNullField = (key, content, coordinates) => {
    // Check if coordinates are valid
    const areCoordinatesValid = Array.isArray(coordinates) &&
     ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"].every((requiredKey) =>
        coordinates.some((coord) => coord[requiredKey] != null)
      );

    // Recursion to handle nested objects
    if (typeof content === "object" && content != null) {
      return Object.keys(content).map((nestedKey) => (
        renderNullField(
          `${key} - ${nestedKey}`,
          content[nestedKey][0],
          content[nestedKey][1]
        )
      ));
    }

    if (!areCoordinatesValid) {
      return (
        <div 
          key={key} 
          className={styles.nullFieldItem}>
            {key}
        </div>
      )
    }

    return null;
  }
  
  return (
    <div className={styles.nullFieldList}>
      <h4>Null Field List</h4>

      {Object.keys(json).map((key) => {
        const obj = json[key];
        const content = obj[0];
        const coordinates = obj[1];
        
        return renderNullField(key, content, coordinates);
      })}
    </div>
  );
};

export default NullFieldList;

"use client";
import styles from "./NullFieldList.module.css";
import { useState, useEffect, useRef, use } from "react";

const NullFieldList = ({ json, setHasNullField  }) => {
  const hasSetNull = useRef(false);

  const areCoordinatesValid = (coordinates) => {
    return (
      Array.isArray(coordinates) &&
      typeof coordinates === "object" &&
      ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"].every((requiredKey) =>
        coordinates.some((coord) => coord[requiredKey] != null)
      )
    );
  };

  const renderNullField = (key, polygon) => {
    if (key.toLowerCase() === "verified" || key.toLowerCase() === "model id") return null;
    
    const content = polygon[0]? polygon[0] : Object.keys(polygon)[0];

    // Recursion to handle nested objects (case for DI dynamic tables)
    if (Array.isArray(polygon) && typeof polygon[0] === "object" && polygon[0] != null) {
      return polygon.map((row, rowIndex) =>
        Object.entries(row).map(([nestedKey, nestedValue]) => 
          renderNullField(
            `${key} Row ${rowIndex+1} -- ${nestedKey}`,
            nestedValue
          )
        )
      );
    // Recursion to handle nested objects (case for DI fixed tables)
    } else if (!polygon[0] && typeof polygon[content] === "object" && polygon[content] != null) {
      for (const nestedKey in polygon[content]) {
        if (polygon[content].hasOwnProperty(nestedKey)) {
          renderNullField(
            `${key} -- ${content} -- ${nestedKey}`,
            polygon[content][nestedKey]
          )
        }
      }
    }

    if (!areCoordinatesValid(polygon[1])) {
      if (!hasSetNull.current) {
        hasSetNull.current = true;
      }

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

  // Set true if null field exist
  useEffect(() => {
    if (hasSetNull.current) {
      setHasNullField(true);
    }
  }, [setHasNullField]);

  return (
    <div className={styles.nullFieldList}>
      {/* <h4>Null Field List</h4> */}

      {Object.entries(json).map(([key, value]) => {
        return renderNullField(key, value);
      })}
    </div>
  );
};

export default NullFieldList;

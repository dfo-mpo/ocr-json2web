"use client";
import styles from "./NullFieldList.module.css";
import { useState, useEffect, useRef } from "react";

const NullFieldList = ({ json }) => {
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
    const content = polygon[0];

    if (Array.isArray(polygon) && typeof content === "object" && content != null) {
      return polygon.map((row, rowIndex) =>
        Object.entries(row).map(([nestedKey, nestedValue]) => 
          renderNullField(
            `${key} Row ${rowIndex+1} - ${nestedKey}`,
            nestedValue
          )
        )
      );
    }

    return !areCoordinatesValid(polygon[1]) ? (
      <div 
        key={key} 
        className={styles.nullFieldItem}>
          {key}
      </div>
    ) : null;
  }

  return (
    <div className={styles.nullFieldList}>
      <h4>Null Field List</h4>

      {Object.entries(json).map(([key, value]) => {
        return renderNullField(key, value);
      })}
    </div>
  );
};

export default NullFieldList;

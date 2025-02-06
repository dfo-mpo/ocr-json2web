"use client";
import styles from "./Polygon.module.css";
import EditableField from "./EditableField";
import { useState, useEffect, useRef } from "react";

const Polygon = ({
  polygonKey,
  polygon,
  textAreaRefs,
  polygonRef,
  handleUpdatePolygon,
  editedPolygons,
  collectPolygonKey,
  handlePolygonSelect,
  handlePolygonDeselect
}) => {
  // Helper function for coordinates validation logic
  const areCoordinatesValid = (coordinates) => {
    return (
      Array.isArray(coordinates) &&
      typeof coordinates === "object" &&
      ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"].every((requiredKey) =>
        coordinates.some((coord) => coord[requiredKey] != null)
      )
    );
  }; 
  
  const renderPolygon = (polygonKey, polygon, textAreaRefs) => {
    const content = polygon[0];

    // Recursion to handle nested objects
    if (Array.isArray(polygon) && typeof content === "object" && content != null) {
      return polygon.map((row, rowIndex) =>
        Object.entries(row).map(([nestedKey, nestedValue]) => 
          renderPolygon(
            `${polygonKey} Row ${rowIndex+1} - ${nestedKey}`,
            nestedValue,
            textAreaRefs
          )
        )
      );
    }

    // Render polygon if the content is string or null, with valid coordinates
    if (typeof content === "string" || content === null) {
      const coordinates = polygon[1];
      const flag = polygon[4];

      if (areCoordinatesValid(coordinates)) {
        collectPolygonKey(polygonKey);

        return (
          <div ref={(ref) => (polygonRef.current[polygonKey] = ref)} key={polygonKey} className={styles.polygonItem}>
            <div className={styles.labelName}>
              {/* <span className={styles.colorCircle} style={{ backgroundColor: color }}></span> */}
              {polygonKey}
            </div>
            <EditableField
              handleFocus={handlePolygonSelect}  
              handleBlur={handlePolygonDeselect} 
              polygonKey={polygonKey}
              content={content}
              flag={flag}
              textAreaRefs={textAreaRefs}
              handleUpdatePolygon={handleUpdatePolygon}
              editedPolygons={editedPolygons}
            />
          </div>
        )
      }
    }

    return null;
  };


  return renderPolygon(polygonKey, polygon, textAreaRefs);
};

export default Polygon;

"use client";
import styles from "./Polygon.module.css";
import EditableField from "./EditableField";
import { useState, useEffect, useRef } from "react";

const Polygon = ({
  polygonKey,
  polygon,
  highlightColor,
  textAreaRefs,
  polygonRef,
  handleUpdatePolygon,
  editedPolygons,
  collectPolygonKey,
  selectedPolygon,
  handlePolygonSelect,
  handlePolygonDeselect,
  isReadOnly
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
    if (polygonKey.toLowerCase() === "verified" || polygonKey.toLowerCase() === "model id") return null;
    
    const content = polygon[0]? polygon[0] : Object.keys(polygon)[0];

    // Recursion to handle nested objects
    if (!polygon[0] && typeof polygon[content] === "object" && polygon[content] != null) {
      for (const nestedKey in polygon[content]) {
        if (polygon[content].hasOwnProperty(nestedKey)) {
          renderPolygon(
            `${polygonKey} -- ${content} -- ${nestedKey}`,
            polygon[content][nestedKey],
            textAreaRefs
          )
        }
      }
    }

    // Render polygon if the content is string or null, with valid coordinates
    if (typeof content === "string" || content === null) {
      const coordinates = polygon[1];
      const flag = polygon[4];

      if (areCoordinatesValid(coordinates)) {
        collectPolygonKey(polygonKey);

        return (
          <div
            key={polygonKey}
            ref={(ref) => (polygonRef.current[polygonKey] = ref)} 
            className={styles.polygonItem}
            style={{
              borderColor: (selectedPolygon === polygonKey ? highlightColor : ''),
              boxShadow: (selectedPolygon === polygonKey ? `inset 0 0 2px 2px ${highlightColor}` : ''),
            }}
            >
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
              highlightColor={highlightColor}
              textAreaRefs={textAreaRefs}
              handleUpdatePolygon={handleUpdatePolygon}
              editedPolygons={editedPolygons}
              isReadOnly={isReadOnly}
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

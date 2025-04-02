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
  
  const renderPolygon = (polygonKey, polygon) => {
    if (polygonKey.toLowerCase() === "verified" || polygonKey.toLowerCase() === "model id") return null;

    if (typeof polygon === "object" && !Array.isArray(polygon)) {
      return Object.entries(polygon).map(([childKey, childValue]) =>
        renderPolygon(
          `${polygonKey} -- ${childKey}`,
          childValue
        )
      )
    }

    if(Array.isArray(polygon)) {
      const content = polygon[0];
      const coordinates = polygon[1];
      const flag = polygon[4];
      
      if (
        typeof content !== "string" || 
        !areCoordinatesValid(coordinates)
      ) {
        return null;
      }

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
              {polygonKey}
            </div>
            <EditableField
              handleFocus={handlePolygonSelect}  
              handleBlur={handlePolygonDeselect} 
              polygonKey={polygonKey}
              content={content ? content : ""}
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

    return null;
  };


  return renderPolygon(polygonKey, polygon);
};

export default Polygon;

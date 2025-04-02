"use client";
import styles from "./Polygon.module.css";
import EditableField from "./EditableField";
import { useState, useEffect, useRef } from "react";

const NullField = ({
  polygonKey,
  polygon,
  textAreaRefs,
  polygonRef,
  handleUpdatePolygon,
  editedPolygons,
  setHasNullField,
  isReadOnly
}) => {  
  const hasSetNull = useRef(false);
  
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
  
  const renderNullField = (polygonKey, polygon) => {
    if (polygonKey.toLowerCase() === "verified" || polygonKey.toLowerCase() === "model id") return null;

    if (typeof polygon === "object" && !Array.isArray(polygon)) {
      return Object.entries(polygon).map(([childKey, childValue]) =>
        renderNullField(
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
        if (!hasSetNull.current) {
          hasSetNull.current = true;
        }

        return (
          <div
            key={polygonKey}
            ref={(ref) => (polygonRef.current[polygonKey] = ref)} 
            className={styles.polygonItem}
            >
            <div className={styles.labelName}>
              {polygonKey}
            </div>
            <EditableField
              polygonKey={polygonKey}
              content={content ? content : ""}
              flag={flag}
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

  // Set true if null field exist
  useEffect(() => {
    if (hasSetNull.current) {
      setHasNullField(true);
    }
  }, [setHasNullField]);

  return renderNullField(polygonKey, polygon);
};

export default NullField;

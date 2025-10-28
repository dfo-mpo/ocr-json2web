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
  
  const renderNullField = (polygonKey, polygon, textAreaRefs) => {
    if (polygonKey.toLowerCase() === "verified" || polygonKey.toLowerCase() === "model id") return null;
    
    const content = polygon[0];

    // Recursion to handle nested objects
    if (Array.isArray(polygon) && typeof content === "object" && content != null) {
      return polygon.map((row, rowIndex) =>
        Object.entries(row).map(([nestedKey, nestedValue]) => 
          renderNullField(
            `${polygonKey} Row ${rowIndex+1} -- ${nestedKey}`,
            nestedValue,
            textAreaRefs
          )
        )
      );
    // If polygon is a nested object, recurse into its children (case for fixed table where object contains objects that have their own objects)
    } else if (typeof polygon === "object" && !Array.isArray(polygon)) {
      return Object.entries(polygon).map(([childKey, childValue]) =>
        renderPolygon(
          `${polygonKey} -- ${childKey}`,
          childValue
        )
      )
    }

    // Render polygon if the content is string or null, with valid coordinates
    if (Array.isArray(polygon) || (typeof content === "string" || content === null)) {
      const coordinates = polygon[1];
      const flag = polygon[4];

      if (typeof content !== "string" || !areCoordinatesValid(coordinates)) {
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

  return renderNullField(polygonKey, polygon, textAreaRefs);
};

export default NullField;

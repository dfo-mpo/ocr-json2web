"use client";
import styles from "./Polygon.module.css";
import EditableField from "./EditableField";
import { useState, useEffect, useRef } from "react";

const Polygon = ({
  polygonKey,
  content,
  coordinates,
  flag,
  color,
  textAreaRef,
  handleUpdatePolygon,
  editedPolygons,
}) => {

  // Function to render polygon list
  const renderPolygon = (key, content, coordinates, flag, color, textAreaRef) => {
    // Check if coordinates are valid
    const areCoordinatesValid = Array.isArray(coordinates) &&
     ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"].every((requiredKey) =>
        coordinates.some((coord) => coord[requiredKey] != null)
      );

    // Recursion to handle nested objects
    if (typeof content === "object" && content != null) {
      return Object.keys(content).map((nestedKey) => (
        renderPolygon(
          `${key} - ${nestedKey}`,
          content[nestedKey][0],
          content[nestedKey][1],
          content[nestedKey][4],
          color
        )
      ));
    }

    // Render polygon if the content is string or null, with valid coordinates
    if ((typeof content === "string" || content === null) && areCoordinatesValid) {
      return (
        <div key={key} className={styles.polygonItem}>
          <div className={styles.labelName}>
            <span className={styles.colorCircle} style={{ backgroundColor: color }}></span>
            {key}
          </div>
          <EditableField
            polygonKey={key}
            content={content}
            flag={flag}
            textAreaRef={textAreaRef}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
          />
        </div>
      )
    }

    return null;
  }
  
  return renderPolygon(polygonKey, content, coordinates, flag, color, textAreaRef);
};

export default Polygon;

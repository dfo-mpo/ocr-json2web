"use client";
import styles from "./LeftPanel.module.css";
import { useState, useEffect, useRef } from "react";

const LeftPanel = ({ pageHeight, polygons, polygonColors, handleUpdatePolygon }) => {
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  console.log("pageHeight", pageHeight);

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
    Object.keys(polygons).forEach((polygon) => {
      const textArea = textAreaRefs.current[polygon];
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    });
  }, [polygons]);
  
  return (
    <>
    <div className={styles.leftPanel}>
      <h4>Polygon List</h4>

      {Object.keys(polygons).map((polygon) => {
        const label = polygons[polygon];
        const labelText = label[0];
        const color = polygonColors[polygon];

        return (
          <div key={polygon} className={styles.polygonItem}>
            <div className={styles.labelName}>
              <span className={styles.colorCircle} style={{ backgroundColor: color }}></span>
              {polygon}
            </div>
            <textarea
              ref={(el) => (textAreaRefs.current[polygon] = el)}
              className={styles.labelText}
              value={labelText}
              onChange={(e) => handleUpdatePolygon(polygon, e.target.value)}
              rows={1}
            />
          </div>
        )

      })}
      
    </div>

    </>
  );
};

export default LeftPanel;

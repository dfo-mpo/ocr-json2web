"use client";
import styles from "./RightPanel.module.css";
import { useState, useEffect, useRef } from "react";

const RightPanel = ({ pageHeight, nullFields }) => {
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  console.log("pageHeight", pageHeight);

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    } else {
      setNewPageHeight(pageHeight);
    }
  }, [pageHeight]);
  
  return (
    <>
    <div className={styles.rightPanel}>
      <h4>Null Field List</h4>
      
      {Object.keys(nullFields).map((nullField) => (
        <div 
          key={nullField} 
          className={styles.nullFieldItem}>
            {nullField}
        </div>
      ))}
    </div>
    </>
  );
};

export default RightPanel;

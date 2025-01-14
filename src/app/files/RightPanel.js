"use client";
import styles from "./RightPanel.module.css";
import { useState, useEffect, useRef } from "react";

const RightPanel = ({ pageHeight }) => {
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
      <div className={styles.panelHeader}>Null Field List</div>
        {/* TODO: Create dynamic list */}
        <div className={styles.nullFieldItem}>Plant/packer/collector</div>
        <div className={styles.nullFieldItem}>FISHERMAN'S SIGNATURE</div>
        <div className={styles.nullFieldItem}>Plant/packer/collector</div>
        <div className={styles.nullFieldItem}>FISHERMAN'S SIGNATURE</div>
        <div className={styles.nullFieldItem}>Plant/packer/collector</div>
        <div className={styles.nullFieldItem}>FISHERMAN'S SIGNATURE</div>
    </div>
    </>
  );
};

export default RightPanel;

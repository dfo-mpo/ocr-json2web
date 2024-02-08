import React, { useState } from "react";
import styles from "./UnusualCon.module.css";
const UnusualCon = ({ items, folderName }) => {
  // Component logic goes here
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format7e = folderName == "7eresultocr";
  const isSelect = false;

  const A = items["(A) Enhancement or intense biological activities"];
  const B = items["(B) Unusual mortalities"];
  const C = items["(C) Obstruction or changes in habitat with recommendations"];
  const D =
    items["(D) Large variations in sex ratio or unusual number of jacks"];
  const E =
    items["(E) Unusual high or low water flow level during spawning period"];

  return (
    // JSX code goes here

    <>
      <div className={styles.title}>UNUSUAL CONDITIONS</div>
      <div className={styles.wrapper}>
        <ul className={styles.myList}>
          <li className={`${styles[A[0]]} ${A[1] ? "" : styles.isRed}`}>
            (A) Enhancement activities or intense biological activities.
          </li>
          <li className={`${styles[B[0]]} ${B[1] ? "" : styles.isRed}`}>
            (B) Unusual Mortalities.
          </li>
          <li className={`${styles[C[0]]} ${C[1] ? "" : styles.isRed}`}>
            (C) Obstructions or changes in habitat with recommendations.
          </li>
          <li className={`${styles[D[0]]} ${D[1] ? "" : styles.isRed}`}>
            (D) Large variation in sex ratio or unusual number of jacks.
          </li>
          <li className={`${styles[E[0]]} ${E[1] ? "" : styles.isRed}`}>
            (E) High/low water flow level during spawning.
          </li>
        </ul>
      </div>
    </>
  );
};

export default UnusualCon;

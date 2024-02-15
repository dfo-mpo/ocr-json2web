import React, { useState, useContext } from "react";
import styles from "./UnusualCon.module.css";

import modifyContext from "../../../state/modify-context";
import EditableSelectField from "./EditableField/EditableSelectField";
const UnusualCon = ({ items, folderName }) => {
  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;
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

  const handleChange = (event) => {
    updateItem(() => {
      return {
        ...itemCtx,
        [event.target.name]: [event.target.value, 2],
      };
    });
  };
  return (
    // JSX code goes here

    <>
      <div className={styles.title}>UNUSUAL CONDITIONS</div>
      <div className={styles.wrapper}>
        <ul className={styles.myList}>
        <li
            className={`${
              A[1] === false ? styles.isRed : A[1] === 2 ? styles.isGreen : ""
            }`}
          >
            <EditableSelectField
              fieldName="(A) Enhancement or intense biological activities"
              fieldValue={A[0]}
              handleChange={handleChange}
            />
           (A) Enhancement activities or intense biological activities.
          </li>
          <li
            className={`${
              B[1] === false ? styles.isRed : B[1] === 2 ? styles.isGreen : ""
            }`}
          >
            <EditableSelectField
              fieldName="(B) Unusual mortalities"
              fieldValue={B[0]}
              handleChange={handleChange}
            />
            (B) Unusual Mortalities.
          </li>
          <li
            className={`${
              C[1] === false ? styles.isRed : C[1] === 2 ? styles.isGreen : ""
            }`}
          >
            <EditableSelectField
              fieldName="(C) Obstruction or changes in habitat with recommendations"
              fieldValue={C[0]}
              handleChange={handleChange}
            />
            (C) Obstructions or changes in habitat with recommendations.
          </li>
          <li
            className={`${
              D[1] === false ? styles.isRed : D[1] === 2 ? styles.isGreen : ""
            }`}
          >
            <EditableSelectField
              fieldName="(D) Large variations in sex ratio or unusual number of jacks"
              fieldValue={D[0]}
              handleChange={handleChange}
            />
            (D) Large variation in sex ratio or unusual number of jacks.
          </li>
          <li
            className={`${
              E[1] === false ? styles.isRed : E[1] === 2 ? styles.isGreen : ""
            }`}
          >
            <EditableSelectField
              fieldName="(E) Unusual high or low water flow level during spawning period"
              fieldValue={E[0]}
              handleChange={handleChange}
            />
            (E) High/low water flow level during spawning.
          </li>
        </ul>
      </div>
    </>
  );
};

export default UnusualCon;

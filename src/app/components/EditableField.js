"use client";
import styles from "./EditableField.module.css";
import { useState, useEffect, useRef } from "react";

const EditableField = ({
  polygonKey,
  content,
  flag,
  textAreaRef,
  handleUpdatePolygon,
  editedPolygons,
  handleFocus,
  handleBlur
}) => {

  let flagStyle = '';
  switch (flag) {
    case 1:
      flagStyle = editedPolygons.has(polygonKey) ? styles.edited : styles.flagged;
      break;
    case 2:
      flagStyle = styles.edited;
      break;
    default:
      flagStyle = editedPolygons.has(polygonKey) ? styles.edited : '';
      break;
  }
  
  return (
    <textarea
      onFocus={()=>{handleFocus(polygonKey);}}  
      onBlur={handleBlur} 
      ref={textAreaRef}
      className={`${styles.labelText} ${flagStyle}`}
      value={content}
      onChange={(e) => handleUpdatePolygon(polygonKey, e.target.value)}
      rows={1}
    />
  )
};

export default EditableField;

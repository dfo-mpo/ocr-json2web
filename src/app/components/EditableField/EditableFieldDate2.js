import React, { useState } from "react";
import styles from "./EditableFieldDate2.module.css";

const EditableFieldDate = ({
  fieldNameM,
  fieldValueM,
  isRedM,
  fieldNameD,
  fieldValueD,
  isRedD,
  handleChange,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  let stylingClassM = "";
  switch (isRedM) {
    case 0:
      break;
    case 1:
      stylingClassM = styles.isRed;
      break;
    case 2:
      stylingClassM = styles.isGreen;
      break;
    default:
      // Handle other cases if needed
      break;
  }
  let stylingClassD = "";
  switch (isRedD) {
    case true:
      break;
    case false:
      stylingClassD = styles.isRed;
      break;
    case 2:
      stylingClassD = styles.isGreen;
      break;
    default:
      // Handle other cases if needed
      break;
  }
  return (
    <span onDoubleClick={() => setIsEditing(true)}>
      {isEditing ? (
        <>
          <input
            index={index}
            type="text"
            name={fieldNameM}
            defaultValue={fieldValueM}
            onChange={handleChange}
            autoFocus
          />
          /
          <input
            index={index}
            type="text"
            name={fieldNameD}
            defaultValue={fieldValueD}
            onChange={handleChange}
          />
          <button className={styles.done} onClick={() => setIsEditing(false)}>Done</button>
        </>
      ) : (
        <>
          <span className={stylingClassM}>{fieldValueM}</span>/
          <span className={stylingClassD}>{fieldValueD}</span>
        </>
      )}
    </span>
  );
};

export default EditableFieldDate;

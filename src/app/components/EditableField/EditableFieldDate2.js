import React, { useState } from "react";
import styles from "./EditableFieldDate2.module.css";

const EditableFieldDate2 = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
  index,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  let stylingClass = "";
  switch (isFlag) {
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

  return (
    <span
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
      }}
    >
      {isEditing ? (
        <>
          <input
            index={index}
            type="text"
            name={fieldName}
            defaultValue={fieldValue}
            onChange={handleChange}
            autoFocus
          />
        </>
      ) : (
        <>
          <span className={stylingClass}>{fieldValue} </span>
        </>
      )}
    </span>
  );
};

export default EditableFieldDate2;

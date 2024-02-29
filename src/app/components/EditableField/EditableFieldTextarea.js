import React, { useState } from "react";
import styles from "./EditableFieldTextarea.module.css";

const EditableFieldTextarea = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  let stylingClass = "";
  switch (isFlag) {
    case 0:
      break;
    case 1:
      stylingClass = styles.isRed;
      break;
    case 2:
      stylingClass = styles.isGreen;
      break;
    default:
      // Handle other cases if needed
      break;
  }
  return (
    <div
      className={`${stylingClass} ${styles.textField} ${!fieldValue&&styles.content}`}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
      }}
    >
      {isEditing ? (
        <textarea
          name={fieldName}
          defaultValue={fieldValue}
          onBlur={() => setIsEditing(false)}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <span className={stylingClass}>{fieldValue || "\u200B"}</span>
      )}
    </div>
  );
};

export default EditableFieldTextarea;

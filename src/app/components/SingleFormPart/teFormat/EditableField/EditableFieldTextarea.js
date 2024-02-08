import React, { useState } from "react";
import styles from "./EditableFieldTextarea.module.css";

const EditableFieldTextarea = ({
  fieldName,
  fieldValue,
  isRed,
  handleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  let stylingClass = "";
  switch (isRed) {
    case true:
      break;
    case false:
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
      className={`${stylingClass} ${styles.textField}`}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
      }}
    >
      {isEditing ? (
        <textarea
          type="text"
          name={fieldName}
          defaultValue={fieldValue}
          onBlur={() => setIsEditing(false)}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <span className={stylingClass}>{fieldValue|| '\u200B'}</span>
      )}
    </div>
  );
};

export default EditableFieldTextarea;

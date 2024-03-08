import React, { useState } from "react";
import styles from "./EditableFieldForTable.module.css";

const EditableFieldForTable = ({
  fieldKey,
  fieldValue,
  isRed,
  handleChange,
  itemName,
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
      className={`${styles.content} ${stylingClass}`}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
      }}
    >
      {isEditing ? (
        <input
          className={styles.input}
          itemname={itemName}
          type="text"
          name={fieldKey}
          defaultValue={fieldValue}
          onBlur={() => setIsEditing(false)}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <span className={stylingClass}> {fieldValue || "\u200B"} </span>
      )}
    </div>
  );
};

export default EditableFieldForTable;

import React, { useState } from "react";
import styles from "./EditableFieldForTable.module.css";

const EditableFieldForTable = ({
  fieldKey,
  fieldValue,
  isFlag,
  handleChange,
  itemName,
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

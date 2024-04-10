import React from "react";
import styles from "./EditableCheckFieldMulti.module.css";

const EditableCheckFieldMulti = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
  fieldText,
  index,
}) => {
  let isSelected = fieldValue === "selected";
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
    <label htmlFor={fieldName} className={styles.checkboxLabel}>
      <input
        id={fieldName}
        type="checkbox"
        className={styles.hiddenCheckbox}
        name={fieldName}
        defaultChecked={isSelected}
        onChange={handleChange}
      />

      <span className={`${stylingClass} ${styles.fieldTextStyle}`}>
        {fieldText}
      </span>
      {fieldName && (
        <div
          className={`${styles.customCheckbox} ${isSelected && styles.checked}`}
        ></div>
      )}
    </label>
  );
};

export default EditableCheckFieldMulti;

import React from "react";
import styles from "./EditableCheckField.module.css";

const EditableCheckField = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
  index,
}) => {
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
    <label
      htmlFor={`checkbox-${index}`}
      className={styles.checkboxLabel}
    >
      <input
        id={`checkbox-${index}`}
        type="checkbox"
        className={styles.hiddenCheckbox}
        checked={fieldValue === "selected"}
        onChange={handleChange}
      />
      <div
        className={`${styles.customCheckbox} ${
          fieldValue === "selected" ? styles.checked : ""
        }`}
      ></div>
      <span className={`${stylingClass}`}>
        
        {fieldName}
        </span>
    </label>
  );
};

export default EditableCheckField;

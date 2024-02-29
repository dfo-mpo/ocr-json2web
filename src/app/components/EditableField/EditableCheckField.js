import React from "react";
import styles from "./EditableCheckField.module.css";

const EditableCheckField = ({
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
      {fieldName && (
        <div
          className={`${styles.customCheckbox} ${isSelected && styles.checked}`}
        ></div>
      )}
      <span className={`${stylingClass} ${styles.fieldTextStyle}`}>
        {fieldText}
      </span>
    </label>
  );
};

export default EditableCheckField;

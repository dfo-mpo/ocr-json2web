import React from "react";
import styles from "./EditableCheckField.module.css";

const EditableCheckField = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
  fieldText,
  fieldText2,
  boxName,
  fieldCode,
  textFirst,
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
      {textFirst &&
        <span className={`${stylingClass} ${styles.fieldTextStyle} ${fieldText2? styles.smallText : ''}`}>
          {fieldText2? (<>{fieldText} <br/> {fieldText2}</>)
          :
          {fieldText}
          }
        </span>
      }
      <input
        id={fieldName}
        type="checkbox"
        className={styles.hiddenCheckbox}
        name={fieldName}
        defaultChecked={isSelected}
        onChange={handleChange}
      />
      {boxName && 
        <div className={styles.boxName}>
          {boxName}
        </div>
      }
      {fieldName && (
        <div
          className={`${styles.customCheckbox} ${isSelected && styles.checked}`}
        ></div>
      )}
      {fieldCode && 
        <div className={styles.codeCheckbox}>
          {fieldCode}
        </div>
      }
      {!textFirst &&
        <span className={`${stylingClass} ${styles.fieldTextStyle}`}>
          {fieldText}
        </span>
      }
    </label>
  );
};

export default EditableCheckField;

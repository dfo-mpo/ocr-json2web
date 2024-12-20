import React from "react";
import styles from "./EditableCheckField.module.css";

const EditableCheckField = ({
  fieldName,
  fieldValue,
  isFlag,
  handleChange,
  fieldText,
  fieldText2,
  type,
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

  const returnContent = (() => {
    return(
      <>
        <input
          id={fieldName}
          type="checkbox"
          className={styles.hiddenCheckbox}
          name={fieldName}
          defaultChecked={isSelected}
          onChange={handleChange}
        />
        <div className={type === '3'? styles.flex:''} style={{flexDirection: type === '3'? 'row':''}}>
          {boxName && 
            <div className={styles.boxName}>
              {boxName}
            </div>
          }
          {fieldName && (
            <div
              className={`${styles.customCheckbox} ${isSelected && styles.checked} ${type === '4'? styles.type4Box :''}`}
            ></div>
          )}
        </div>
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
      </>
    )
  })
  
  return (
    <label htmlFor={fieldName} className={`${styles.checkboxLabel} ${type === '3'? styles.flex: ''}`}>
      {textFirst &&
        <span className={`${stylingClass} ${styles.fieldTextStyle} ${fieldText2? styles.smallText : ''} ${['4','5'].includes(type)? styles.type4Text :''}`}>
          {fieldText2 && typeof fieldText === 'string'? (<>{fieldText} <br/> {fieldText2}</>)
          :
          fieldText && typeof fieldText === 'string'? fieldText
          :
          <></>
          }
        </span>
      }
      {type === '3'? 
      <div>
        {returnContent()}
      </div>:
      returnContent()}
    </label>
  );
};

export default EditableCheckField;

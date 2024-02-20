import React, { useState } from "react";
import styles from "./EditableSelectField.module.css";
import selected from "../../../../../../public/images/selected.svg";
import unselected from "../../../../../../public/images/unselected.svg";
import Image from "next/image";
const EditableSelectField = ({
  fieldName,
  fieldValue,
  handleChange,
  speciesName,
}) => {
  const [isEditing, setIsEditing] = useState(false);

 

  return (
    <span
      className={styles.content}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => {
        setIsEditing(false);
      }}
    >
      {isEditing ? (
        <span>
          <select
            className={styles.input}
            speciesname={speciesName ? speciesName : ""}
            type="text"
            name={fieldName}
            defaultValue={fieldValue}
            onBlur={() => setIsEditing(false)}
            onChange={handleChange}
            autoFocus
          >
            <option value="selected">Selected</option>
            <option value="unselected">Unselected</option>
          </select>
        </span>
      ) : (
        <span  className={styles.imageBox}>
        
          {fieldValue == "selected" ? (
            <Image height={19}  style={{ fill: "#ff0000" }} src={selected} alt="selected img" />
          ) : (
            <Image height={19} src={unselected} alt="unselected img" />
          )}
        </span>
      )}
    </span>
  );
};

export default EditableSelectField;

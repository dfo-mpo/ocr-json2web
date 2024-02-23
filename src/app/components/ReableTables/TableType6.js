import React from "react";

import styles from "./TableType6.module.css";

import EditableField from "../EditableField/EditableField";

const TableType6 = ({
  items,

  folderName,

  fileName,

  formSetting,

  myStyle,

  onEdit,
}) => {
  const tableName = formSetting.tableName;

  const tableData = formSetting.tableData;

  const handleChange = (key, checked) => {
    const updateJson = { ...items, [key]: checked ? "checked" : "unchecked" };

    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      {" "}
      {}
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.wrapper}>
        {" "}
        {}
        <ul className={styles.myList}>
          {tableData.map((data, index) => (
            <li key={index} className={styles.tableRow}>
              <label
                htmlFor={`checkbox-${index}`}
                className={styles.checkboxLabel}
              >
                <input
                  id={`checkbox-${index}`}
                  type="checkbox"
                  className={styles.hiddenCheckbox}
                  checked={items[data.key] === "checked"}
                  onChange={(e) => handleChange(data.key, e.target.checked)}
                />

                <div
                  className={`${styles.customCheckbox} ${
                    items[data.key] === "checked" ? styles.checked : ""
                  }`}
                ></div>

                {data.fieldName}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TableType6;

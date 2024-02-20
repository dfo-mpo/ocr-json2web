import React from "react";
import styles from "./TableType4.module.css";

const TableType4 = ({ items, folderName, fileName, formSetting, myStyle }) => {
  const tableName = formSetting.tableName;
  const subTableName = formSetting.subTableName;
  const tableData = formSetting.tableData;

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <div className={styles.wrapper}>
          {subTableName && <div className={styles.title2}>{subTableName}</div>}
          <ul className={styles.myList}>
            {tableData.map((data, index) => {
              return (
                <li key={index}>
                  {data.fieldName}
                  <div className={styles.subList}>{items[data.key]?items[data.key]:<br/>}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    </div>
  );
};

export default TableType4;

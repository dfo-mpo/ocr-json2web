import React from "react";
import styles from "./TableType5.module.css";
//duplicate from tableType4, working on this one
const TableType5 = ({ items, folderName, fileName, formSetting, myStyle }) => {
  const tableName = formSetting.tableName;
  const insideTableName = formSetting.insideTableName;
  const tableData = formSetting.tableData;

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <div className={styles.wrapper}>
          {insideTableName && <div className={styles.title2}>{insideTableName}</div>}
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

export default TableType5;

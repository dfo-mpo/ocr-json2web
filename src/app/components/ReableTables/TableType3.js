import React from "react";
import styles from "./TableType3.module.css";

const TableType3 = ({ items, folderName, fileName, formSetting, myStyle }) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}

      {tableData.map((data, index) => {
        return (
          <div key={index}>
            {items[data.key] && (
              <div className={styles.myTable}>
                <span>{data.fieldName} </span>
                <span>{items[data.key]}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableType3;

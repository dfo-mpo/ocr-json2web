import React from "react";
import styles from "./TableType3.module.css";

const TableType3 = ({ items, folderName, fileName, formSetting, myStyle }) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const insideTableName = formSetting.insideTableName;

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}

      {tableData.map((data, index) => {
        return (
          <div key={index}>
            {items[data.key] && (
              <div className={styles.myTable}>
                {insideTableName && <div className={styles.title2}>{insideTableName}</div>}
                <div>{data.fieldName} </div>
                <div>{items[data.key]}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableType3;

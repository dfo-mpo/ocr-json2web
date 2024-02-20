import React from "react";
import styles from "./TableType2.module.css";

const TableType2 = ({ items, folderName, fileName, formSetting, myStyle }) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const itemName = formSetting.itemName;

  const dates = items[itemName];

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.myTable}>
        <div>
          {dates
            ? dates.map((date, index) => {
                return (
                  <div key={index}>
                    {tableData.map((data, index) => {
                      return <span key={index}>{date[data.key]} </span>;
                    })}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default TableType2;

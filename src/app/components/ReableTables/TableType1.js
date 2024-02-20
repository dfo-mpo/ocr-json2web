import React from "react";
import styles from "./TableType1.module.css";

const TableType1 = ({ items, folderName, fileName, formSetting, myStyle }) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <table className={styles.myTable}>
        <tbody>
          {tableData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.fieldName}</td>
                <td>{items[data.key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableType1;

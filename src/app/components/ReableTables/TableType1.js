import React from "react";
import styles from "./TableType1.module.css";
import EditableField from "../EditableField/EditableField";

const TableType1 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  let updateJson = { ...items };
  const handleChange = (event) => {
    updateJson[event.target.name] = event.target.value;
    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <table className={styles.myTable}>
        <tbody>
          {tableData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.fieldName}</td>
                <td>
                  <EditableField
                    isFlag=""
                    fileName={fileName}
                    fieldName={data.key}
                    fieldValue={items[data.key]}
                    handleChange={handleChange}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableType1;

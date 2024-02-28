import React from "react";
import styles from "./TableType3.module.css";
import EditableFieldTextarea from "../EditableField/EditableFieldTextarea";

const TableType3 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const insideTableName = formSetting.insideTableName;
  let updateJson = { ...items };
  const handleChange = (event) => {
    updateJson[event.target.name] = event.target.value;
    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}

      {tableData.map((data, index) => {
        return (
          <div key={index}>
            <div className={styles.myTable}>
              {insideTableName && (
                <div className={styles.title2}>{insideTableName}</div>
              )}
              <div>{data.fieldName} </div>
              <EditableFieldTextarea
                key={index}
                isFlag=""
                fieldName={data.key}
                fieldValue={items[data.key]}
                handleChange={handleChange}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableType3;

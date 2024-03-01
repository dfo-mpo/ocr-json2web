import React from "react";
import styles from "./TableType4.module.css";
import EditableFieldTextarea from "../EditableField/EditableFieldTextarea";

const TableType4 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
  insideStyle,
}) => {
  const tableName = formSetting.tableName;
  const insideTableName = formSetting.insideTableName;
  const tableData = formSetting.tableData;

  let updateJson = { ...items };
  const handleChange = (event) => {
    updateJson[event.target.name] = event.target.value;
  
    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <div className={styles.wrapper} style={insideStyle}>
          {insideTableName && (
            <div className={styles.title2}>{insideTableName}</div>
          )}
          <ul className={styles.myList}>
            {tableData.map((data, index) => {
              return (
                <li key={index}>
                  {data.fieldName}
                  <div className={styles.subList}>
                    <EditableFieldTextarea
                      key={index}
                      isFlag= ''
                      fieldName={data.key}
                      fieldValue={items[data.key]}
                      handleChange={handleChange}
                    />
                  </div>
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

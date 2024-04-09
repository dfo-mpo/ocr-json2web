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
    // updateJson[event.target.name] = event.target.value;
    // updateJson[event.target.name][0] = event.target.value;
    if (updateJson[event.target.name]) {
      updateJson[event.target.name][0] = event.target.value;
      updateJson[event.target.name][4] = 2;
    } else {
      updateJson = {
        ...updateJson,
        [event.target.name]: [event.target.value, {}, "", "", 2],
      };
    }
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
                      isFlag={items[data.key] ? items[data.key][4] : ""}
                      fieldName={data.key}
                      // fieldValue={items[data.key]}
                      fieldValue={items[data.key] ? items[data.key][0] : ""}
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

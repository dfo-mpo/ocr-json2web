import React from "react";
import styles from "./TableType6_multi.module.css";
import EditableCheckField from "../EditableField/EditableCheckFieldMulti";

const TableType6_multi = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
  insideStyle,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const insideTableName = formSetting.insideTableName;

  const fontSize = formSetting.style.fontSize;
  console.log("fontSize", fontSize);
  let updateJson = { ...items };
  const handleChange = (event) => {
    const key = event.target.name;
    const selected = event.target.checked;
    const value = selected ? "selected" : "unselected";

    // updateJson[key] = value;
    //TODO: Json with flag
    if (!updateJson[key]) {
      updateJson = {
        ...updateJson,
        [key]: [value, {}, "", "", 2],
      };
    } else {
      updateJson[key][0] = value;
      updateJson[key][4] = 2;
    }
    // updateJson[key][3] = 2;

    // const updateJson = {
    //   ...items,
    //   [key]: selected ? "selected" : "unselected",

    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.wrapper} style={insideStyle}>
        {insideTableName && (
          <div className={styles.title2}>{insideTableName}</div>
        )}
        <ul className={styles.myList}>
          {tableData.map((data, index) => {
            console.log("data", data);
            return (
              <li key={index} className={styles.tableRow}>
                <div className={styles.filedName}>{data.fieldName}</div>
                {data.key &&
                  data.key.map((key, index) => {
                    return (
                      <EditableCheckField
                        isFlag={items[key.key] ? items[key.key][4] : ""}
                        //TODO: items[data.key][3] for TAN's json version
                        // isFlag={items[data.key][3]}
                        fieldName={key.key}
                        fieldText={key.displayName}
                        // fieldValue={items[data.key]}
                        //TODO: items[data.key][0] for TAN's json version
                        fieldValue={items[key.key] ? items[key.key][0] : ""}
                        handleChange={handleChange}
                      />
                    );
                  })}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default TableType6_multi;

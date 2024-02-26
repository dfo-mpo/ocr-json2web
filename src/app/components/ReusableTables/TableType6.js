import React from "react";
import styles from "./TableType6.module.css";
import EditableCheckField from "../EditableField/EditableCheckField";

const TableType6 = ({
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
  const handleChange = (key, selected) => {
    const value = selected ? "selected" : "unselected";
    updateJson[key] = value;
    //TODO: Json with flag
    // updateJson[key][0] = value;
    // updateJson[key][3] = 2;

    // const updateJson = {
    //   ...items,
    //   [key]: selected ? "selected" : "unselected",

    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.wrapper}>
        <ul className={styles.myList}>
          {tableData.map((data, index) => (
            <li key={index} className={styles.tableRow}>
              <EditableCheckField
                key={index}
                isFlag= ""
                //TODO: items[data.key][3] for TAN's json version
                // isFlag={items[data.key][3]}
                fieldName={data.fieldName}
                fieldValue={items[data.key]}
                //TODO: items[data.key][0] for TAN's json version
                // fieldValue={items[data.key][0]}
                handleChange={(e) => handleChange(data.key, e.target.checked)}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TableType6;

import React from "react";
import styles from "./TableType6_multi.module.css";
import EditableCheckField from "../EditableField/EditableCheckFieldMulti";
import Link from "next/link";

const TableType6_multi = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
  insideStyle,  isEditingTable,
  formSettingIndex,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const insideTableName = formSetting.insideTableName;



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
  const onDelete = async () => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if (confirmDelete) {
      const Response = await fetch("/api/DeleteTable", {
        method: "POST",
        body: JSON.stringify({
          folderName: folderName,
          formSettingIndex: formSettingIndex,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!Response.ok) {
        alert("Error");
      } else {
        alert("Success");
        window.location.reload();
      }
    }
  };

  const combinedStyle = {  
    ...myStyle,  
    ...insideStyle  
  };

  return (
    <div style={combinedStyle} className={styles.myBox}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.wrapper} style={insideStyle}>
        {insideTableName && (
          <div className={styles.title2}>{insideTableName}</div>
        )}
        <ul className={styles.myList}>
          {tableData.map((data, index) => {
     
            return (
              <li key={index} className={styles.tableRow}>
               {data.fieldName&& <div className={styles.filedName}>{data.fieldName}</div>}
                <div className ={styles.selectedBox}>
                {data.key &&
                  data.key.map((key, index) => {
                    return (
                      <EditableCheckField
                        key={index}
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
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {isEditingTable && (
        <div>
          <Link
            className={styles.linkButton}
            rel="noopener noreferrer"
            target="_blank"
            href={{
              pathname: "/editSingleTable/",
              query: {
                formSettingIndex: formSettingIndex,
                folderName: folderName,
              },
            }}
          >
            Edit
          </Link>
          <button onClick={onDelete} className={styles.button}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default TableType6_multi;

import { useState } from "react";
import styles from "./TableType1.module.css";
import EditableField from "../EditableField/EditableField";
import Link from "next/link";

const TableType1 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  selfStyle,
  onEdit,
  insideStyle,
  isEditingTable,
  formSettingIndex,
}) => {
  const tableName = formSetting.tableName;
  const insideTableName = formSetting.insideTableName;
  const tableData = formSetting.tableData;
  const smallText = formSetting.smallText;
  const smallTitle = formSetting.smallTitle;
  let updateJson = { ...items };
  const handleChange = (event) => {
    // updateJson[event.target.name] = event.target.value;
    //TODO: Json with flag

    if (updateJson[event.target.name]) {
      updateJson[event.target.name][0] = event.target.value;
      updateJson[event.target.name][4] = 2;
    } else {
      updateJson = {
        ...updateJson,
        [event.target.name]: [event.target.value, {}, "", "", 2],
      };
    }

    // updateJson[event.target.name][3] = 2;
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
      {tableName && <div className={styles.title} style={{fontSize: smallTitle ? '0.86em' : ''}}>{tableName}</div>}
      <table className={styles.myTable} style={selfStyle}>
        {insideTableName && <div className={`${styles.title} ${styles.insideTitle}`} style={{fontSize: smallTitle && smallText ? '0.74em' : smallTitle? '0.86em' : ''}}>{insideTableName}</div>}
        <tbody>
          {tableData.map((data, index) => {
            return (
              <tr key={index} className={smallText === 'true' ? styles.smallText : ''}>
                {data.fieldName && <td style={{fontSize: smallTitle && smallText && !tableName && !insideTableName? '1.1em' : '' }}>{data.fieldName}</td>}
                {data.key && <td>
                  <EditableField
                    // onMouseEnter={() =>
                    //   handleHover(items[data.key] ? items[data.key][1] : "")
                    // }
                    // onMouseLeave={handleLeave}
                    isFlag={items[data.key] ? items[data.key][4] : ""}
                    //TODO: items[data.key][3] for TAN's json version
                    // isFlag={items[data.key][3]}
                    fieldName={data.key}
                    // fieldValue={items[data.key]}
                    //TODO: items[data.key][0] for TAN's json version
                    fieldValue={items[data.key] ? items[data.key][0] : ""}
                    handleChange={handleChange}
                  />
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>

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

export default TableType1;

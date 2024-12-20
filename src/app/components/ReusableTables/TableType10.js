import React from "react";
import styles from "./TableType10.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
import Link from "next/link";
const TableType10 = ({
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
  const rowName = formSetting.rowName;
  const tableData = formSetting.tableData;
  const type = formSetting.type;
  const hideSideLines = formSetting.hideSideLines;
  const allOjb = formSetting.itemName;
  const itemOjb = items[allOjb];

  let updateJson = { ...items };
  const handleChange = (event) => {
    const itemName = event.target.getAttribute("itemname");
    const key = event.target.name;
    const value = event.target.value;
    console.log("itemName", itemName);
    console.log("key", key);
    console.log("value", value);
    const singleItem = {
      [itemName]: {},
    };
    if (!updateJson[allOjb]) {
      updateJson[allOjb] = {};
    }

    if (!updateJson[allOjb][itemName]) {
      updateJson[allOjb] = {
        ...updateJson[allOjb],
        ...singleItem,
      };
    }

    if (!updateJson[allOjb][itemName][key]) {
      updateJson[allOjb][itemName][key] = [value, {}, "", "", 2];
    } else {
      updateJson[allOjb][itemName][key][0] = value;
      updateJson[allOjb][itemName][key][4] = 2;
    }
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

  const returnEditFeild = (key) => {
    return (
      <EditableFieldForTable
        itemName={rowName}
        fieldKey={key}
        fieldValue={
          itemOjb &&
          itemOjb[rowName] &&
          itemOjb[rowName][key]
            ? itemOjb[rowName][key][0]
            : ""
        }
        isFlag={
          itemOjb &&
          itemOjb[rowName] &&
          itemOjb[rowName][key]
            ? itemOjb[rowName][key][4]
            : ""
        }
        handleChange={handleChange}
      />
    );
  }

  return (
    <div style={myStyle}>
      <>
        <table className={`${styles.myTable} ${hideSideLines === 'true'? '' : styles.myTableBoxed}`} style={insideStyle}>
          <tbody>
            <div>
              <div className={styles.topRow}>
                <div className={`${styles.titleBox} ${["2","4"].includes(type)? styles.type2TitleBox : type === "3"? styles.type3TitleBox : ''}`} style={{borderRight: type === '4'? '0':''}}>
                  {tableName && <div className={styles.title}>{tableName}</div>}
                  {type !== "3" && returnEditFeild(tableData.key[0].key) }
                </div>
                {!["3","4"].includes(type) &&
                  <div className={styles.codeBox} style={{width: ["2"].includes(type)? "40%":""}}>
                    { returnEditFeild(tableData.key[1].key) }
                  </div>
                }
              </div>
              <div className={styles.bottomRow}>
                <div style={{width: ["2","3","4"].includes(type)? "28%":"25%"}}>
                  { returnEditFeild(tableData.key[type === '3'? 0 : type === '4'? 1 : 2].key) }
                </div>
                <div style={{width: ["2","3","4"].includes(type)? "28%":"25%", fontSize: '0.64em', fontWeight: '500'}}>
                  { returnEditFeild(tableData.key[type === '3'? 1 : type === '4'? 2 : 3].key) }
                </div>
                <div style={{width: ["2","3","4"].includes(type)? "10.5%":"15%"}}>
                  { returnEditFeild(tableData.key[type === '3'? 2 : type === '4'? 3 : 4].key) }
                </div>
                <div style={{width: ["2","3","4"].includes(type)? "28%":"25%"}}>
                  { returnEditFeild(tableData.key[type === '3'? 3 : type === '4'? 4 : 5].key) }
                </div>
                <div style={{width: "10%"}}>
                  { returnEditFeild(tableData.key[type === '3'? 4 : type === '4'? 5 : 6].key) }
                </div>
              </div>
            </div>
          </tbody>
        </table>
      </>
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

export default TableType10;

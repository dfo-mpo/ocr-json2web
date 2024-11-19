import React from "react";
import styles from "./TableType5_reverse.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
import Link from "next/link";
const TableType5_reverse = ({
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
  const tableHeader = formSetting.tableHeader;
  const displayFieldNames = formSetting.displayFieldNames;

  const tableData = formSetting.tableData;
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
      updateJson[allOjb][itemName][key] = [value, {}, "", "", "", 2];
    } else {
      updateJson[allOjb][itemName][key][0] = value;
      updateJson[allOjb][itemName][key][4] = 2;
    }

    // updateJson[allOjb][itemName][key][0] = value;
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

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <table className={styles.myTable} style={insideStyle}>
          <tbody>
            {/* <tr>
              {tableHeader.map((header, index) => {
                return (
                  header.fieldName && <td className={styles.tdFieldName} key={index}>
                    {header.fieldName}
                  </td>
                );
              })}
            </tr> */}

            {tableData.map((data, index) => {
              return (
                <tr key={index}>
                  {tableHeader.map((header, index) => {
                    // console.log("header", header);
                    // console.log("headerFiled", header.itemName);

                    // console.log("data", data.key);

                    // console.log("obj", itemOjb[header.itemName]);
                    const itemName = header.itemName;
                    const dataKey = data.key;

                    return (
                      <td key={index}>
                        {header.itemName === "" ? (
                          <span className={styles.tdFieldName}>
                            {data.fieldName}
                          </span>
                        ) : (
                          <div className={displayFieldNames === "true"? styles.contentContainer : styles.editFieldContainer}>
                            <div style={{display: displayFieldNames === "true"? '' : 'none'}}>
                                {data.key}
                            </div>
                            <EditableFieldForTable
                              itemName={itemName}
                              fieldKey={dataKey}
                              fieldValue={
                                itemOjb &&
                                itemOjb[itemName] &&
                                itemOjb[itemName][dataKey]
                                  ? itemOjb[itemName][dataKey][0]
                                  : ""
                              }
                              isFlag={
                                itemOjb &&
                                itemOjb[itemName] &&
                                itemOjb[itemName][dataKey]
                                  ? itemOjb[itemName][dataKey][4]
                                  : ""
                              }
                              handleChange={handleChange}
                            />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
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

export default TableType5_reverse;

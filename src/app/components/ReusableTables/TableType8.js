import React from "react";
import styles from "./TableType8.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
import Link from "next/link";
const TableType8 = ({
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
  const tableData = formSetting.tableData;
  const allOjb = formSetting.itemName;
  const itemOjb = items[allOjb];
  const addNewItem = () => {
    updateJson[allOjb].push({});
    onEdit(updateJson);
  };

  const removeItem = (index) => {
    updateJson[allOjb].splice(index, 1);

    onEdit(updateJson);
  };

  let updateJson = { ...items };
  const handleChange = (event, index) => {
    // const itemName = event.target.getAttribute("itemname");
    const key = event.target.name;
    const value = event.target.value;

    if (updateJson[allOjb][index][key]) {
      updateJson[allOjb][index][key][0] = value;
      updateJson[allOjb][index][key][4] = 2;
    } else {
      updateJson[allOjb][index] = {
        ...updateJson[allOjb][index],
        [key]: [value, {}, "", "", 2],
      };
    }
    onEdit(updateJson);

    // const singleItem = {
    //   [itemName]: {},
    // };
    // if (!updateJson[allOjb]) {
    //   updateJson[allOjb] = {};
    // }

    // if (!updateJson[allOjb][itemName]) {
    //   updateJson[allOjb] = {
    //     ...updateJson[allOjb],
    //     ...singleItem,
    //   };
    // }
    // updateJson[allOjb][itemName][key][0] = value;
    // onEdit(updateJson);
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
        <button onClick={addNewItem} className={styles.addRemoveButton}>
          Add Item
        </button>
        <table className={styles.myTable} style={insideStyle}>
          <tbody>
            {tableHeader.map((data, index) => {
              return (
                <tr key={index}>
                  {data.map((data, index) => {
                    const rowItem = data.rowItem;
                    const span = data.span;
                    const rowSpan = span && span.rowSpan ? span.rowSpan : 1;
                    const colSpan = span && span.colSpan ? span.colSpan : 1;
                    return (
                      <td key={index} rowSpan={rowSpan} colSpan={colSpan}>
                        {data.key ? (
                          itemOjb[rowItem] ? (
                            itemOjb[rowItem][data.key][0]
                          ) : (
                            ""
                          )
                        ) : (
                          <span className={styles.tdFieldName}>
                            {data.fieldName}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {itemOjb &&
              itemOjb.map((item, index) => {
                return (
                  <tr key={index}>
                    {Object.keys(tableData).length === 0
                      ? null
                      : tableData.key.map((data, dataIndex) => {
                          return (
                            <td key={dataIndex}>
                              <EditableFieldForTable
                                fieldKey={data.key}
                                isFlag={item[data.key] ? item[data.key][4] : ""}
                                fieldValue={
                                  item[data.key] ? item[data.key][0] : ""
                                }
                                handleChange={() => handleChange(event, index)}
                              />
                            </td>
                          );
                        })}
                    <td>
                      <button
                        onClick={() => removeItem(index)}
                        className={styles.addRemoveButton}
                      >
                        -
                      </button>
                    </td>
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

export default TableType8;

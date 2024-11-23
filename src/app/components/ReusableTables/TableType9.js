import React from "react";
import styles from "./TableType9.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
import Link from "next/link";
const TableType9 = ({
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
  const hideSideLines = formSetting.hideSideLines;
  const allOjb = formSetting.itemName;
  const itemOjb = items[allOjb];
  const position = ["Premier casier / First trap", "Dernier casier / Last trap"]

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

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <table className={`${styles.myTable} ${hideSideLines === 'true'? '' : styles.myTableBoxed}`} style={insideStyle}>
          <tbody>
            {tableHeader.map((data, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {data.map((data, colIndex) => {
                    const rowItem = data.rowItem;
                    const span = data.span;
                    const rowSpan = span && span.rowSpan ? span.rowSpan : 1;
                    const colSpan = span && span.colSpan ? span.colSpan : 1;
                    const thickBorderRow = (colSpan > 1 && colIndex > 6)  || (rowIndex === 1 && colIndex % 3 === 2)
                    return (
                      <td key={colIndex} rowSpan={rowSpan} colSpan={colSpan} style={{display: data.fieldName ? '' : 'none', borderLeft: thickBorderRow ? '2px solid black' : ''}}>
                        {data.key ? (
                          itemOjb[rowItem] ? (
                            itemOjb[rowItem][data.key][0]
                          ) : (
                            ""
                          )
                        ) : (
                          <span className={data.fieldName === "Position" ? styles.position : styles.tdFieldName} >
                            {data.fieldName}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {Object.keys(tableData).length === 0
              ? null
              : tableData.item.map((data, rowIndex) => {
                  const rowItem = data.itemName;
                  return (
                    <tr key={rowIndex}>
                      <td className={styles.tdRowName} style={{display: data.fieldName ? '' : 'none'}}>{data.fieldName}</td>
                      {tableData.key.map((data, colIndex) => {
                        const key = data.key;
                        const mergeCell = colIndex > 6 || colIndex === 0;
                        const lastTrapRow = rowIndex % 2 === 1;
                        const thickBorderRow = mergeCell && colIndex % 3 === 1

                        return (
                          <td key={colIndex} rowSpan={mergeCell ? 2 : 1} style={{display: (mergeCell && lastTrapRow) ? 'none' : '', borderLeft: thickBorderRow ? '2px solid black' : ''}}>
                            { colIndex !== 1 ? (
                              <EditableFieldForTable
                              itemName={rowItem}
                              fieldKey={key}
                              fieldValue={
                                itemOjb &&
                                itemOjb[rowItem] &&
                                itemOjb[rowItem][key]
                                  ? itemOjb[rowItem][key][0]
                                  : ""
                              }
                              isFlag={
                                itemOjb &&
                                itemOjb[rowItem] &&
                                itemOjb[rowItem][key]
                                  ? itemOjb[rowItem][key][4]
                                  : ""
                              }
                              handleChange={handleChange}
                            />
                            ) :
                            ( <div style={{fontSize: '0.86em'}}>{position[rowIndex % 2]}</div>)
                            }
                            
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

export default TableType9;
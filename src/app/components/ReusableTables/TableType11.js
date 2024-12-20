import React from "react";
import styles from "./TableType11.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
import EditableCheckField from "../EditableField/EditableCheckField";
import Link from "next/link";
const TableType11 = ({
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
  const subType = formSetting.subType;
  const tableHeader = formSetting.tableHeader;
  const tableData = formSetting.tableData;
  const table2Data = formSetting.table2Data;
  const table3Data = formSetting.table3Data;
  const hideSideLines = formSetting.hideSideLines;
  const allOjb = formSetting.itemName;
  const itemOjb = items[allOjb];
  const position = subType === "3" ? ["Premier engin levé / First gear hauled", "Dernier engin levé / Last gear hauled"] : subType === "2" ? ["Premier engin levé / First gear lift off", "Premier engin levé / First gear lift off"] : ["Premier casier / First trap", "Dernier casier / Last trap"]
  const effort = ['Numbre de casiers utilisés / Number of traps used'];
  let updateJson = { ...items };
  const handleChange2 = (event) => {
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
                    const thickTop = rowIndex < 2;
                    const thickBorderRow = (rowIndex === 0)  || (rowIndex === 1 && [1,2,7].includes(colIndex));

                    return (
                      <td key={colIndex} rowSpan={rowSpan} colSpan={colSpan} 
                        style={{display: data.fieldName ? '' : 'none', borderLeft: thickBorderRow ? '2px solid black' : '', maxWidth: rowIndex === 0 && [6,12].includes(colIndex) ? '180px' : '', minWidth: '45px', borderTop: thickTop? '3px solid black':''}}
                        className={([4,5,6,7,8,9,10,11,12].includes(colIndex) && subType === '3')? styles.smallerText : ''}>
                        {data.key && !["Second table", "Third table"].includes(data.fieldName) ? (
                          itemOjb[rowItem] ? (
                            itemOjb[rowItem][data.key][0]
                          ) : (
                            ""
                          )
                        ) : (
                           data.fieldName === 'Second table' ? (
                            table2Data.map((data) => {
                              return(
                                <EditableCheckField
                                  isFlag={items[data.key] ? items[data.key][4] : ""}
                                  fieldName={data.key}
                                  fieldText={data.fieldName}
                                  // fieldText2={data.fieldName2}
                                  // boxName={data.boxName}
                                  textFirst={true}
                                  type={'4'}
                                  fieldValue={items[data.key] ? items[data.key][0] : ""}
                                  handleChange={handleChange2}
                                />
                              )
                            })
                            
                           ) : data.fieldName === 'Third table' ? (
                              table3Data.map((data) => {
                                return(
                                  <EditableCheckField
                                    isFlag={items[data.key] ? items[data.key][4] : ""}
                                    fieldName={data.key}
                                    fieldText={data.fieldName}
                                    // fieldText2={data.fieldName2}
                                    // boxName={data.boxName}
                                    textFirst={true}
                                    type={'5'}
                                    fieldValue={items[data.key] ? items[data.key][0] : ""}
                                    handleChange={handleChange2}
                                  />
                                )
                              })
                           ) : (
                            <span className={(rowIndex > 0) ? styles.smallerText :  styles.tdFieldName} >
                              {data.fieldName}
                            </span>
                           )
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
                        const mergeCell = colIndex < 2 || (colIndex > 7 && colIndex < 11);
                        const mergeCol = colIndex 
                        const lastTrapRow = rowIndex % 2 === 1;
                        const thickTop = (rowIndex !== 0 || colIndex > 7) && rowIndex % 2 === 0; 
                        const thickBorderRow = [1,2,8].includes(colIndex);

                        return (
                          <td key={colIndex} rowSpan={mergeCell ? 2 : 1}  colSpan={colIndex === 5 ? 2 : 1} style={{display: (mergeCell && lastTrapRow) || colIndex === 6 ? 'none' : '', borderLeft: thickBorderRow ? '2px solid black' : '', borderTop: thickTop ? '2px solid black' : ''}}>
                            { !(colIndex === 2 || colIndex === 8)? (
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
                            ( <div style={{fontSize: '0.74em'}}>{colIndex === 2? position[rowIndex % 2] : effort[0]}</div>)
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

export default TableType11;
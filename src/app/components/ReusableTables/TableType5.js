import React from "react";
import styles from "./TableType5.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
import Link from "next/link";
const TableType5 = ({
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
  const type = formSetting.type;
  const sideTableName = formSetting.sideTableName;
  const hideSideLines = formSetting.hideSideLines;
  const allOjb = formSetting.itemName;
  const secondOjb = formSetting.secondItemName;
  const secondItemOjb = items[secondOjb];
  const itemOjb = items[allOjb];

  let updateJson = { ...items };
  const handleChange = (event, isSecondObject) => {
    const itemName = event.target.getAttribute("itemname");
    const key = event.target.name;
    const value = event.target.value;
    console.log(event.target);
    console.log("itemName", itemName);
    console.log("key", key);
    console.log("value", value);
    const ojb = isSecondObject === 'true'? secondOjb : allOjb;
    const singleItem = {
      [itemName]: {},
    };
    if (!updateJson[ojb]) {
      updateJson[ojb] = {};
    }

    if (!updateJson[ojb][itemName]) {
      updateJson[ojb] = {
        ...updateJson[ojb],
        ...singleItem,
      };
    }

    if (!updateJson[ojb][itemName][key]) {
      updateJson[ojb][itemName][key] = [value, {}, "", "", 2];
    } else {
      updateJson[ojb][itemName][key][0] = value;
      updateJson[ojb][itemName][key][4] = 2;
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
        <div style={{display: 'flex'}}>
          {sideTableName && 
            <span className={styles.sideTableName} style={{width: sideTableName.length > 40? 'auto': '', borderTop: insideStyle.borderTop, borderLeft: insideStyle.borderLeft, borderBottom: insideStyle.borderBottom}}>
              {sideTableName}
            </span>
          }
          <table className={`${styles.myTable} ${hideSideLines === 'true'? '' : styles.myTableBoxed} ${type === "2"? styles.thickBorder : ""}`} style={insideStyle}>
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
                        <td key={index} rowSpan={rowSpan} colSpan={colSpan} style={{display: data.fieldName ? '' : 'none'}}>
                          {data.key ? (
                            itemOjb[rowItem] ? (
                              itemOjb[rowItem][data.key][0]
                            ) : (
                              ""
                            )
                          ) : (
                            <span className={styles.tdFieldName} >
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
                : 
                  tableData.item.map((data, rowIndex) => {
                    let rowItem = data.itemName;
                    const titleRow1 = data.titleRow1;
                    const titleRow2 = data.titleRow2;
                    const secondRowItem = data.secondItem;
                    const ojb = secondRowItem === 'true'? secondItemOjb : itemOjb;
                    return (
                      <tr key={rowIndex}>
                        <td className={styles.tdRowName} style={{display: data.fieldName ? '' : 'none'}}>{data.fieldName}</td>
                        {tableData.key.map((data, colIndex) => {
                          if (type === '2' && rowIndex === 1) {
                            data = tableData.key.find(obj => obj.key === 'Longitude');
                            rowItem = "ROW1";
                          }
                          
                          const key = data.key;
                          const colSpan = colIndex === 3? 2 : 1;
                          const rowSpan = ['Latitude', 'Longitude'].includes(key)? 1 : 2
                          if (rowIndex === 0 && key !== 'Longitude' || rowIndex === 1 && colIndex === 0 || type !== '2') {
                            return (
                              <td rowSpan={type === "2"? rowSpan : ''} colSpan={type === "2"? colSpan: ''} key={colIndex}>
                                {secondRowItem && key === "Espèce"? 
                                  titleRow1? <><div style={{fontSize:'0.78em'}}>{titleRow1}</div><div style={{fontSize:'0.78em'}}>{titleRow2}</div></>
                                  :
                                  <div>REJETS - DISCARD</div>
                                :
                                  <EditableFieldForTable
                                    itemName={rowItem}
                                    fieldKey={key}
                                    fieldValue={
                                      ojb &&
                                      ojb[rowItem] &&
                                      ojb[rowItem][key]
                                        ? ojb[rowItem][key][0]
                                        : ""
                                    }
                                    isFlag={
                                      ojb &&
                                      ojb[rowItem] &&
                                      ojb[rowItem][key]
                                        ? ojb[rowItem][key][4]
                                        : ""
                                    }
                                    handleChange={(e) => handleChange(e, secondRowItem)}
                                  />
                                }
                              </td>
                            );
                          }              
                        })}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        
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

export default TableType5;

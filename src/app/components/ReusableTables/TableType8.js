import React from "react";
import styles from "./TableType8.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
const TableType8 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
  insideStyle,
}) => {
  const tableName = formSetting.tableName;
  const tableHeader = formSetting.tableHeader;
  const tableData = formSetting.tableData;
  const allOjb = formSetting.itemName;
  const itemOjb = items[allOjb];

  let updateJson = { ...items };
  const handleChange = (event, index) => {
    // const itemName = event.target.getAttribute("itemname");
    const key = event.target.name;
    const value = event.target.value;

    if (updateJson[allOjb][index][key]) {
      updateJson[allOjb][index][key][0] = value;
    } else {
      updateJson[allOjb][index] = {
        ...updateJson[allOjb][index],
        [key]: [value, {}, ""],
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
  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
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
                                fieldValue={
                                  item[data.key] ? item[data.key][0] : ""
                                }
                                handleChange={() => handleChange(event, index)}
                              />
                            </td>
                          );
                        })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TableType8;

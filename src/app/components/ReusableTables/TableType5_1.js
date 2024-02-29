import React from "react";
import styles from "./TableType5.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
const TableType5_1 = ({
  items,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
}) => {
  const tableName = formSetting.tableName;
  const tableData = formSetting.tableData;
  const allOjb = formSetting.itemName;
  const itemOjb = items[allOjb];

  let updateJson = { ...items };
  const handleChange = (event) => {
    const itemName = event.target.getAttribute("itemname");
    const key = event.target.name;
    const value = event.target.value;

    const singleItem = {
      [itemName]: {},
    };
    if(!updateJson[allOjb]){
      updateJson[allOjb] = {};
    }

    if (!updateJson[allOjb][itemName]) {
      updateJson[allOjb] = {
        ...updateJson[allOjb],
        ...singleItem,
      };
    }
    updateJson[allOjb][itemName][key] = value;
    onEdit(updateJson);
  };

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <table className={styles.myTable}>
          <tbody>
            {tableData.map((data, index) => {
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
                          <EditableFieldForTable
                            itemName={rowItem}
                            filedKey={data.key}
                            fieldValue={
                              itemOjb && itemOjb[rowItem]
                                ? itemOjb[rowItem][data.key]
                                : ""
                            }
                            isFlag=""
                            handleChange={handleChange}
                          />
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
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TableType5_1;

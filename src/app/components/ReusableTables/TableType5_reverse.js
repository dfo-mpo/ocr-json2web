import React from "react";
import styles from "./TableType5_reverse.module.css";
import EditableFieldForTable from "../EditableField/EditableFieldForTable";
const TableType5_reverse = ({
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

  return (
    <div style={myStyle}>
      <>
        {tableName && <div className={styles.title}>{tableName}</div>}
        <table className={styles.myTable} style={insideStyle}>
          <tbody>
            <tr>
              {tableHeader.map((header, index) => {
                return (
                  <td className={styles.tdFieldName} key={index}>
                    {header.fieldName}
                  </td>
                );
              })}
            </tr>

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
                          // <div>
                          // {itemOjb[header.itemName] &&
                          //   itemOjb[header.itemName][data.key] &&
                          //   itemOjb[header.itemName][data.key][0]}
                          // </div>
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

export default TableType5_reverse;

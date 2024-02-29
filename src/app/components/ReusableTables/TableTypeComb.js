import React from "react";
import styles from "./TableTypeComb.module.css";
import TableType1 from "./TableType1";
import TableType2 from "./TableType2";
import TableType3 from "./TableType3";
import TableType4 from "./TableType4";
import TableType5 from "./TableType5";
import TableType6 from "./TableType6";
import TableType7 from "./TableType7";

const TableTypeComb = ({
  updateJson,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
}) => {
  const tableName = formSetting.tableName;
  const insideTableName = formSetting.insideTableName;
  const insideFormSetting = formSetting.insideFormSetting;

  const changeHandler = (newJson) => {
    onEdit(newJson);
  };

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.wrapper}>
        {insideTableName && (
          <div className={styles.title2}>{insideTableName}</div>
        )}
        <div style={formSetting.style && formSetting.style}>
          {insideFormSetting.map((formSettingItem, index) => {
            if (formSettingItem.tableType === "TableType1") {
              return (
                <TableType1
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType2") {
              return (
                <TableType2
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType3") {
              return (
                <TableType3
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType4") {
              return (
                <TableType4
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType5") {
              return (
                <TableType5
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType6") {
              return (
                <TableType6
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType7") {
              return (
                <TableType7
                  myStyle={formSettingItem.style}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableTypeComb") {
              return (
                <TableTypeComb
                  myStyle={formSettingItem.style}
                  key={index}
                  updateJson={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default TableTypeComb;

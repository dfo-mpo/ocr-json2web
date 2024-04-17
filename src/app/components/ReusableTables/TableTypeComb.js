import React from "react";
import styles from "./TableTypeComb.module.css";
import TableType1 from "./TableType1";
import TableType2 from "./TableType2";
import TableType3 from "./TableType3";
import TableType4 from "./TableType4";
import TableType5 from "./TableType5";
import TableType5_reverse from "./TableType5_reverse";
import TableType6 from "./TableType6";
import TableType6_multi from "./TableType6_multi";
import TableType7 from "./TableType7";
import TableType8 from "./TableType8";
import Link from "next/link";

const TableTypeComb = ({
  updateJson,
  folderName,
  fileName,
  formSetting,
  myStyle,
  onEdit,
  insideStyle,  isEditingTable,
  formSettingIndex,
}) => {
  const tableName = formSetting.tableName;
  const insideTableName = formSetting.insideTableName;
  const insideFormSetting = formSetting.insideFormSetting;

  const changeHandler = (newJson) => {
    onEdit(newJson);
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
      {tableName && <div className={styles.title}>{tableName}</div>}
      <div className={styles.wrapper} style={insideStyle}>
        {insideTableName && (
          <div className={styles.title2}>{insideTableName}</div>
        )}
        <div style={formSetting.style && formSetting.style}>
          {insideFormSetting.map((formSettingItem, index) => {
            if (formSettingItem.tableType === "TableType1") {
              return (
                <TableType1
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType5_reverse") {
              return (
                <TableType5_reverse
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType6_multi") {
              return (
                <TableType6_multi
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                />
              );
            } else if (formSettingItem.tableType === "TableType8") {
              return (
                <TableType8
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
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
                  insideStyle={formSettingItem.insideStyle}
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

export default TableTypeComb;

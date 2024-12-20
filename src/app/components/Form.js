"use client";
import { useState } from "react";
import styles from "./Form.module.css";
// import formSetting from "../formSetting.json";
import TableType1 from "./ReusableTables/TableType1";
import TableType2 from "./ReusableTables/TableType2";
import TableType3 from "./ReusableTables/TableType3";
import TableType4 from "./ReusableTables/TableType4";
import TableType5 from "./ReusableTables/TableType5";
import TableType5_reverse from "./ReusableTables/TableType5_reverse";
import TableType6 from "./ReusableTables/TableType6";
import TableType6_multi from "./ReusableTables/TableType6_multi";
import TableTypeComb from "./ReusableTables/TableTypeComb";
import TableType7 from "./ReusableTables/TableType7";
import TableType8 from "./ReusableTables/TableType8";
import TableType9 from "./ReusableTables/TableType9";
import TableType10 from "./ReusableTables/TableType10";
import TableType11 from "./ReusableTables/TableType11";

const Form = ({
  items,
  folderName,
  fileName,
  formSetting,
  saveChange,
  cancelChange,
  isEditingTable,
}) => {
  const title = formSetting.title;
  const subtitle = formSetting.subtitle;
  const [updateJson, setUpdateJson] = useState(items);
  const [isEditing, setIsEditing] = useState(false);

  const changeHandler = (value) => {
    setIsEditing(true);
    setUpdateJson(value);
  };

  const onClickHandler = async (updateJson) => {
    const Response = await fetch("/api/saveModified", {
      method: "POST",
      body: JSON.stringify({
        folderName: folderName,
        fileName: fileName,
        data: updateJson,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Response.ok) {
      setIsEditing(false);
      alert("Error");
    } else {
      setIsEditing(false);
      alert("Success");
      saveChange();
    }
  };

  const saveHandler = () => {
    //TODO: delete this line
    // console.log(updateJson);
    // setIsEditing(false); alert("Success, testing locally now");
    //TODO: uncomment this line to enable save button
    onClickHandler(updateJson);
  };
  const resetEdit = () => {
    setIsEditing(false);
    cancelChange();
  };
  return (
    <div className={styles.container}>
      {isEditing ? (
        <>
          <button onClick={saveHandler} className={styles.saveChange}>
            Save
          </button>
          <button onClick={resetEdit} className={styles.cancelChange}>
            Cancel
          </button>
        </>
      ) : null}
      <div className={styles.header}>
        {title && <div className={styles.header1}>{title}</div>}
        {subtitle && <div className={styles.header2}>{subtitle}</div>}
      </div>
      {formSetting[folderName] ? (
        <div style={formSetting.style && formSetting.style}>
          {formSetting[folderName].map((formSettingItem, index) => {
            if (formSettingItem.tableType === "TableType1") {
              // console.log("formSettingItem", formSettingItem.style);
              const { alignSelf, justifySelf, ...otherStyles } = formSettingItem.style;
              const selfStyle = {alignSelf, justifySelf}

              return (
                <TableType1
                  myStyle={otherStyles}
                  selfStyle={selfStyle}
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  formSettingIndex={index}
                  isEditingTable={isEditingTable}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
                />
              );
            } else if (formSettingItem.tableType === "TableType9") {
              return (
                <TableType9
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
                />
              );
            } else if (formSettingItem.tableType === "TableType10") {
              return (
                <TableType10
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
                />
              );
            } else if (formSettingItem.tableType === "TableType11") {
              return (
                <TableType11
                  myStyle={formSettingItem.style}
                  insideStyle={formSettingItem.insideStyle}
                  key={index}
                  items={updateJson}
                  folderName={folderName}
                  fileName={fileName}
                  formSetting={formSettingItem}
                  onEdit={changeHandler}
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
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
                  isEditingTable={isEditingTable}
                  formSettingIndex={index}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className={styles.error}>
          Folder Name does not exist. Please return to the home page and click
          on 'Update Settings'.
        </div>
      )}
    </div>
  );
};

export default Form;

"use client";
import { useState } from "react";
import styles from "./Form.module.css";
// import formSetting from "../formSetting.json";
import TableType1 from "./ReusableTables/TableType1";
import TableType2 from "./ReusableTables/TableType2";
import TableType3 from "./ReusableTables/TableType3";
import TableType4 from "./ReusableTables/TableType4";
import TableType6 from "./ReusableTables/TableType6";

const Form = ({ items, folderName, fileName, formSetting, saveChange, cancelChange }) => {
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
    console.log(updateJson);
    //TODO: delete this line 
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
      <div style={formSetting.style && formSetting.style}>
        {formSetting[folderName].map((formSettingItem, index) => {
          if (formSettingItem.tableType === "TableType1") {
            // console.log("formSettingItem", formSettingItem.style);
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
          }
        })}
      </div>
    </div>
  );
};

export default Form;

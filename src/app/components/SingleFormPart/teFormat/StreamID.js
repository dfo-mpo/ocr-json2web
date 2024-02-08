import React, { use } from "react";
import styles from "./StreamID.module.css";
import { useContext, useEffect, useState } from "react";
import modifyContext from "../../../state/modify-context";
import EditableField from "./EditableField/EditableField";
function StreamID({ items, folderName }) {
  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;

  // useEffect(() => {
  //   updateItem(items);
  //   updateFolderName(folderName);
  // }, [items, folderName]);

  // useEffect(() => {
  //   if (itemCtx) {
  //     setNewItem(itemCtx);
  //   }
  // }, [itemCtx]);

  const watershedCode =
    // 4C, 4H, 6E: Watershed code
    // 5A: Watershed Code
    // 7E: RAB code
    items["Watershed Code"] || items["Watershed code"] || items["RAB code"];

  const gazettedName =
    //4C,4H,6E,5A,7E:Gazetted name
    items["Gazetted name"];

  const firstLocalName =
    //4C,4H,7E :  First local name
    //5A: 1st Local name
    //6E: Local name
    items["First local name"] || items["Local name"] || items["1st Local name"];

  const secondLocalName =
    //4C, 7E: Second local name
    //4H, 6E: none
    //5A: 2nd local name
    items["Second local name"] || items["2st Local name"];

  const flowsInto =
    //4C: Flows Into
    //4H, 6E, 5A, 7E: Flows into
    items["Flows Into"] || items["Flows into"];

  // const startEditing = (fieldName, initialValue) => {
  //   setEditableField(fieldName);
  // };

  // const stopEditing = () => {
  //   setEditableField(null);
  // };

  const handleChange = (event) => {
    updateItem(() => {
      return {
        ...itemCtx,
        [event.target.name]: [event.target.value, 2],
      };
    });
  };

  return (
    <div className={styles.StreamBox}>
      <div className={styles.title}>STREAM IDENTIFICATION</div>
      <table className={styles.myTable}>
        <tbody>
          <tr>
            <td>Watershed Code:</td>
            <td>
              <EditableField
                fieldName="Watershed code"
                fieldValue={watershedCode[0]}
                isRed={watershedCode[1]}
                handleChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Gazetted Name:</td>
            <td>
              <EditableField
                fieldName="Gazetted name"
                fieldValue={gazettedName[0]}
                isRed={gazettedName[1]}
                handleChange={handleChange}
              />
            </td>
            {/* <td className={gazettedName[1] ? "" : styles.isRed}>
              {gazettedName}
            </td> */}
          </tr>
          <tr>
            <td>First Local Name:</td>
            <td>
              <EditableField
                fieldName="First local name"
                fieldValue={firstLocalName[0]}
                isRed={firstLocalName[1]}
                handleChange={handleChange}
              />
            </td>
            {/* <td className={firstLocalName[1] ? "" : styles.isRed}>
              {firstLocalName}
            </td> */}
          </tr>
          <tr>
            <td>Second Local Name:</td>
            <td>
              <EditableField
                fieldName="Second local name"
                fieldValue={secondLocalName[0]}
                isRed={secondLocalName[1]}
                handleChange={handleChange}
              />
            </td>
            {/* <td className={secondLocalName[1] ? "" : styles.isRed}>
              {secondLocalName}
            </td> */}
          </tr>
          <tr> 
            <td>Flows Into:</td>
            <td>
              <EditableField
                fieldName="Flows Into"
                fieldValue={flowsInto[0]}
                isRed={flowsInto[1]}
                handleChange={handleChange}
              />
            </td>
            {/* <td className={flowsInto[1] ? "" : styles.isRed}>{flowsInto}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StreamID;

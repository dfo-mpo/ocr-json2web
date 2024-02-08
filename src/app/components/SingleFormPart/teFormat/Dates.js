import React from "react";
import styles from "./Dates.module.css";
import { useContext, useEffect, useState } from "react";
import modifyContext from "../../../state/modify-context";
import EditableField from "./EditableField/EditableField";
import EditableFieldTextarea from "./EditableField/EditableFieldTextarea";
import EditableFieldDate from "./EditableField/EditableFieldDate";
const Dates = ({ items, folderName }) => {
  const format7e = folderName == "7eresultocr";
  const format4h = folderName == "4hresultocr";
  const format4c = folderName == "4cresultocr";
  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;
  const datesComment =
    //Dates of inspection (1)
    items["Dates of inspection (1)"];
  const dates =
    // 5A, 6E: Dates of inspection
    //4C: Date of inspection   array
    //4H: Dates of Inspection    array
    //7e: Inspection dates
    items["Dates of inspection"] ||
    items["Dates of Inspection"] ||
    items["Inspection dates"] ||
    items["Date of inspection"];

  let updateDate = [...dates];
  // const dateArray = {
  //   "Date of inspection": [
  //     {
  //       Month: ["SEP", true],
  //       Day: ["07", false],
  //     },
  //     {
  //       Month: ["SEP", false],
  //       Day: ["20", true],
  //     },
  //   ],
  // };

  const handleChange = (event) => {
    updateItem(() => {
      return {
        ...itemCtx,
        [event.target.name]: [event.target.value, 2],
      };
    });
  };

  const handleDateChange = (event) => {
    const index = event.target.getAttribute("index");
    const { name, value } = event.target;
    updateDate[index][name] = [value, 2];
    updateItem(() => {
      return {
        ...itemCtx,
        "Date of inspection": updateDate,
      };
    });
  };

  const addDateHandler = () => {
    updateDate.push({
      Month: ["Month", 2],
      Day: ["Day", 2],
    });
    updateItem(() => {
      return {
        ...itemCtx,
        "Date of inspection": updateDate,
      };
    });
  };
  let newitemCtx = {...itemCtx}


  const deleteDateHandler = (key) => {
    newitemCtx["Date of inspection"].splice(key, 1)
    updateItem(() => {
      return newitemCtx;
    });
    // updateDate.splice(key, 1)
    // console.log(updateDate)
  };

  //Start date

  //End date

  return (
    <div className={styles.StreamBox}>
      <div className={styles.title}>
        DATES OF INSPECTION
        <button onClick={addDateHandler} className={styles.addButton}>
          +
        </button>
        {/* <button onClick={deleteDateHandler} className={styles.addButton}>
          -
        </button> */}
      </div>

      <div className={styles.dates}>
        <>
          <div>
            {dates[0]
              ? dates.map((date, key) => (
                  <span key={key}>
                    <EditableFieldDate
                      index={key}
                      fieldNameM={"Month"}
                      fieldValueM={date.Month[0]}
                      isRedM={date.Month[1]}
                      fieldNameD={"Day"}
                      fieldValueD={date.Day[0]}
                      isRedD={date.Day[1]}
                      handleChange={handleDateChange}
                    />
                    <button
                      onClick={()=> deleteDateHandler(key)}
                      className={styles.addButton}
                    >
                      -
                    </button>

                    <br />
                  </span>
                ))
              : ""}
          </div>

          <EditableFieldTextarea
            fieldName="Dates of inspection (1)"
            fieldValue={datesComment[0]}
            isRed={datesComment[1]}
            handleChange={handleChange}
          />
        </>
      </div>
    </div>
  );
};

export default Dates;

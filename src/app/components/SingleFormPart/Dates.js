import React from "react";
import styles from "./Dates.module.css";
const Dates = ({ items, folderName }) => {
  const format7e = folderName == "7eresultocr";
  const format4h = folderName == "4hresultocr";
  const format4c = folderName == "4cresultocr";

  const dates =
    // 5A, 6E: Dates of inspection
    //4C: Date of inspection   array
    //4H: Dates of Inspection    array
    //7e: Inspection dates
    items["Dates of inspection"] ||
    items["Dates of Inspection"] ||
    items["Inspection dates"] ||
    items["Date of inspection"];

  const datesComment =
    //Dates of inspection (1)
    items["Dates of inspection (1)"];

  //Start date

  //End date

  return (
    <div className={styles.StreamBox}>
      <div className={styles.title}>DATES OF INSPECTION</div>
      <div className={styles.dates}>
        {!format4c && !format4h ? (
          <div>{dates} </div>
        ) : (
          <>
            <div>
              {dates
                ? dates.map((date) => `${date.Month} ${date.Day}`).join(" ")
                : ""}
            </div>
            <div>{datesComment}</div>
          </>
        )}
      </div>

      {format7e && (
        <div className={styles.startEndWrap}>
          <div className={styles.title2}>CONTINUOUS COUNTS</div>
          <div className={styles.startEndDiv}>
            <table className={styles.startEnd}>
              <tbody>
                <tr>
                  <td>Start date:</td>
                  <td>{items["Start date"]}</td>
                </tr>
                <tr>
                  <td>End date:</td>
                  <td>{items["End date"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dates;

import React from "react";
import styles from "./StreamID.module.css";
function StreamID({ items, folderName }) {
  const format7e = folderName == "7eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format6e = folderName == "6eresultocr";
  const format5a = folderName == "5aresultocr";
  const formatTe = folderName == "teresultocr";
  
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

  return (
    <div className={styles.StreamBox}>
      <div className={styles.title}>STREAM IDENTIFICATION</div>
      <table className={styles.myTable}>
        <tbody>
          <tr>
            <td>Watershed Code:</td>
            <td>{watershedCode}</td>
          </tr>
          <tr>
            <td>Gazetted Name:</td>
            <td>{gazettedName}</td>
          </tr>
          <tr>
            <td>First Local Name:</td>
            <td>{firstLocalName}</td>
          </tr>
          <tr>
            <td>Second Local Name:</td>
            <td>{secondLocalName}</td>
          </tr>
          <tr>
            <td>Flows Into:</td>
            <td>{flowsInto}</td>
          </tr>
          {format7e && (
            <>
              <tr>
                <td>Latitude:</td>
                <td>{items["Latitude"]}</td>
              </tr>
              <tr>
                <td>Longitude:</td>
                <td>{items["Longitude"]}</td>
              </tr>

              <tr>
                <td>Filed Crew:</td>
                <td>{items["Field Crew"]}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StreamID;

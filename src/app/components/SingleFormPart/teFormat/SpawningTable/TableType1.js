import React from "react";
import styles from "./TableType1.module.css";
import EditableField from "../EditableField/EditableField";
import { useContext } from "react";
import modifyContext from "../../../../state/modify-context";
//for 6E and 4C
const TableType1 = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";

  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;

  let tableObject = { ...itemCtx["Spawning run timing and estimated number"] };
  let updateInfo = {};
  const handleChange = (event) => {
    const speciesName = event.target.getAttribute("speciesname");
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    let updateTable = {};
    let speciesContext = {};
    updateInfo = {
      [speciesName]: { [fieldName]: [fieldValue, 2] },
    };
    
    if (tableObject[speciesName]) {
      speciesContext = tableObject[speciesName];
      updateTable = { ...speciesContext, ...updateInfo[speciesName] };
    } else {
      updateTable = { ...tableObject, ...updateInfo };
    }
    console.log("updateTable", updateTable);

    // updateTable = { ...tableObject, ...updateInfo };


  };
  const renderTable = (item) => {
    const species = items["Spawning run timing and estimated number"]?.[item];
    if (species) {
      return (
        <>
          <>
            <td
              className={`${
                species["Arrival month"] && species["Arrival month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {/* {species["Arrival month"]} */}

              <EditableField
                speciesName={item}
                fieldName="Arrival month"
                fieldValue={species["Arrival month"][0]}
                isRed={species["Arrival month"] && species["Arrival month"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Arrival day"] && species["Arrival day"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Arrival day"]}
            </td>
            <td
              className={`${
                species["Start month"] && species["Start month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Start month"]}
            </td>
            <td
              className={`${
                species["Peak month"] && species["Peak month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Start day"]}
            </td>
            <td
              className={`${
                species["Peak month"] && species["Peak month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Peak month"]}
            </td>
            <td
              className={`${
                species["Peak day"] && species["Peak day"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Peak day"]}
            </td>
            <td
              className={`${
                species["End month"] && species["End month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["End month"]}
            </td>
            <td
              className={`${
                species["End day"] && species["End day"][1] ? "" : styles.isRed
              }`}
            >
              {species["End day"]}
            </td>
            <td
              className={`${
                species["No. of observer"] && species["No. of observer"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["No. of observer"]}
            </td>
            <td
              className={`${
                species["Method"] && species["Method"][1] ? "" : styles.isRed
              }`}
            >
              {species["Method"]}
            </td>
            <td
              className={`${
                species["Reliability"] && species["Reliability"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Reliability"]}
            </td>
            <td
              className={`${
                species["Estimated total No. on grounds"] &&
                species["Estimated total No. on grounds"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Estimated total No. on grounds"]}
            </td>
            <td
              className={`${
                species["Optimum escapement"] &&
                species["Optimum escapement"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              {species["Optimum escapement"]}
            </td>
          </>
        </>
      );
    } else {
      return (
        <>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Arrival month"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </>
      );
    }
  };

  return (
    <table className={styles.myTable}>
      <tbody>
        <tr className={styles.tableHeader}>
          <td rowSpan={2}>
            (1) <br />
            SPECIES
          </td>
          <td colSpan="2">
            (2) <br />
            ARRIVAL IN STREAM
          </td>
          <td colSpan="6">
            <div>
              (3) <br />
              DATES of SPAWNING{" "}
            </div>
            <div className={styles.columThree}>
              <span>START</span>
              <span>PEAK</span>
              <span>END</span>
            </div>
          </td>
          <td rowSpan={2}>
            (4) <br /> # of OBS.
          </td>
          <td rowSpan={2}>
            (5) <br /> MTH
          </td>
          <td rowSpan={2}>
            (6) <br /> REL.
          </td>
          <td rowSpan={2}>
            (7) <br />
            TOT. ON GROUNDS
          </td>
          <td rowSpan={2}>
            (8) <br />
            TARGET ESCAPE.
          </td>
        </tr>
        <tr className={styles.secondRow}>
          <td>mth.</td>
          <td>day</td>
          <td>mth.</td>
          <td>day</td>
          <td>mth.</td>
          <td>day</td>
          <td>mth.</td>
          <td>day</td>
        </tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            SOCKEYE 1
            <br />2
          </td>
          {renderTable("Sockeye 1")}
        </tr>
        <tr>{renderTable("Sockeye 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            COHO 1 <br />2
          </td>
          {renderTable("Coho 1")}
        </tr>
        <tr>{renderTable("Coho 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            PINK 1
            <br />2
          </td>
          {renderTable("Pink 1")}
        </tr>
        <tr>{renderTable("Pink 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            CHUM 1
            <br />2
          </td>
          {renderTable("Chum 1")}
        </tr>
        <tr>{renderTable("Chum 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            CHINOOK 1
            <br />2
          </td>
          {renderTable("Chinook 1")}
        </tr>
        <tr>{renderTable("Chinook 2")}</tr>
      </tbody>
    </table>
  );
};

export default TableType1;

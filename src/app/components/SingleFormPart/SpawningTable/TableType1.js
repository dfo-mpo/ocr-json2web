import React from "react";
import styles from "./TableType1.module.css";
//for 6E and 4C
const TableType1 = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const renderTable = (item) => {
    const species =
      (format6e && items["Spawning run timing"]?.[item]) ||
      (format4c && items["Spawning run timing and estimated number"]?.[item]);
    if (species) {
      
      return (
        <>
          {format6e && (
            <>
              <td>{species["Arrival month"]}</td>
              <td>{species["Arrival day"]}</td>
              <td>{species["Spawning start month"]}</td>
              <td>{species["Spawning start day"]}</td>
              <td>{species["Spawning peak month"]}</td>
              <td>{species["Spawning peak day"]}</td>
              <td>{species["Spawning end month"]}</td>
              <td>{species["Spawning end day"]}</td>
              <td>{species["Observers"]}</td>
              <td>{species["Methods"]}</td>
              <td>{species["Reliability"]}</td>
              <td>{species["Total on grounds"]}</td>
              <td>{species["Target escape"]}</td>
            </>
          )}
          {format4c && (
            <>
              <td>{species["Arrival month"]}</td>
              <td>{species["Arrival day"]}</td>
              <td>{species["Start month"]}</td>
              <td>{species["Start day"]}</td>
              <td>{species["Peak month"]}</td>
              <td>{species["Peak day"]}</td>
              <td>{species["End month"]}</td>
              <td>{species["End day"]}</td>
              <td>{species["No. of observer"]}</td>
              <td>{species["Method"]}</td>
              <td>{species["Reliability"]}</td>
              <td>{species["Estimated total No. on grounds"]}</td>
              <td>{species["Optimum escapement"]}</td>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
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

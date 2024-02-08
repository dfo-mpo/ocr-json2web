import React from "react";
import styles from "./TableType2.module.css";
//for 4h
const TableType2 = ({ items, folderName }) => {
  const renderTable = (item) => {
    const species = items["Spawning Run Timing and Estimated Number"]?.[item];
    if (species) {
  

      return (
        <>
           <td>{species["Arrival In Stream Month"]}</td>
          <td>{species["Arrival In Stream Day"]}</td>
          <td>{species["Spawning Start Month"]}</td>
          <td>{species["Spawning Start Day"]}</td>
          <td>{species["Spawning Peak Month"]}</td>
          <td>{species["Spawning Peak Day"]}</td>
          <td>{species["Spawning End Month"]}</td>
          <td>{species["Spawning End Day"]}</td>

          <td>{species["Methods"]}</td>
          <td>{species["Reliability"]}</td>
          <td>{species["Estimated Total on Grounds"]}</td>
          <td>{species["Optimum Escapements"]}</td>
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
              DATES of SPAWNING
            </div>
            <div className={styles.columThree}>
              <span>START</span>
              <span>PEAK</span>
              <span>END</span>
            </div>
          </td>
          <td rowSpan={2}>
            (4) <br /> MTH
          </td>
          <td rowSpan={2}>
            (5) <br /> REL.
          </td>
          <td rowSpan={2}>
            (6) <br />
            TOT. ON GROUNDS
          </td>
          <td rowSpan={2}>
            (7) <br />
            OPTIMUM ESCAPE.
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

export default TableType2;

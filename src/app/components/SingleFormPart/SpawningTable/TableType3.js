import React from "react";
import styles from "./TableType3.module.css";
//for 5a
const TableType2 = ({ items, folderName }) => {
  const renderTable = (item) => {
    const species = items["Duration of Spawning"]?.[item];
    if (species) {


      return (
        <>
          <td>{species["Arrival"]}</td>
          <td>{species["Start"]}</td>
          <td>{species["Peak"]}</td>
          <td>{species["End"]}</td>
          <td>{species["Methods"]}</td>
          <td>{species["Reliability"]}</td>
          <td>{species["Est. Esc"]}</td>
          <td>{species["Brood esc."]}</td>
          <td>{species["Jacks"]}</td>
          <td>{species["Optimum Esc."]}</td>
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
        </>
      );
    }
  };

  return (
    <table className={styles.myTable}>
      <tbody>
        <tr className={styles.tableHeader}>
          <td>
            (1) <br />
            SPECIES
          </td>
          <td>
            (2) <br />
            ARRIVAL
          </td>
          <td colSpan="3">
            <div>
              (3) <br />
              DURATION OF SPAWNING
            </div>
            <div className={styles.columThree}>
              <span>START</span>
              <span>PEAK</span>
              <span>END</span>
            </div>
          </td>
          <td>
            (4) <br /> METHODS
          </td>
          <td>
            (5) <br /> REL.
          </td>
          <td>
            (6) <br />
            ESTIMATED ESC.
          </td>
          <td>
            (7) <br />
            BROOD ESC.
          </td>
          <td>
            (8) <br />
            JACKS
          </td>
          <td>
            (9) <br />
            OPTIMUM ESC.
          </td>
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

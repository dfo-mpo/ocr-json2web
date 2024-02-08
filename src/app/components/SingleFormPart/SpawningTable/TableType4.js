import React from "react";
import styles from "./TableType4.module.css";
//for 7E
const TableType4 = ({ items, folderName }) => {
  const No5 = items["(5) Escapement comments"];
  const No6 = items["(6) General comments"];
  const renderTable = (item) => {
    const species = items["Spawning run timing"]?.[item];
    const details = items["Details affecting salmon escapement"]?.[item];

    // "(5) Escapement comments": "selected",
    // "(6) General comments": "unselected",

    return (
      <> 
        <td>{species ? species["Arrival month"] : ""}</td>
        <td>{species ? species["Arrival day"] : ""}</td>
        <td>{species ? species["Start month"] : ""}</td>
        <td>{species ? species["Start day"] : ""}</td>
        <td>{species ? species["Peak month"] : ""}</td>
        <td>{species ? species["Peak day"] : ""}</td>
        <td>{species ? species["End month"] : ""}</td>
        <td>{species ? species["End day"] : ""}</td>
        <td>{details ? details["N"] : ""}</td>
        <td>{details ? details["Methods"] : ""}</td>
        <td>{details ? details["%Spawn habitat surveyed"] : ""}</td>
        <td>{details ? details["Rel"] : ""}</td>
        <td>{details ? details["Enum Class"] : ""}</td>
        <td>{details ? details["Esc Code"] : ""}</td>
        <td>{details ? details["Est total adults"] : ""}</td>
        <td>{details ? details["Brood stock removals"] : ""}</td>
        <td>{details ? details["Jacks"] : ""}</td>
        <td>{details ? details["Escapement Goal"] : ""}</td>
      </>
    );
  };

  return (
    <>
      <table className={styles.myTable}>
        <tbody>
          <tr className={styles.tableHeader}>
            <td rowSpan={2}>SPECIES</td>
            <td colSpan="2">ARRIVAL IN STREAM</td>
            <td colSpan="6">
              <div>DATES of SPAWNING</div>
              <div className={styles.columThree}>
                <span>START</span>
                <span>PEAK</span>
                <span>END</span>
              </div>
            </td>
            <td rowSpan={2}>N</td>
            <td rowSpan={2}>(1) MTH</td>
            <td rowSpan={2}>%SPAWN HABITA SURVEYED</td>
            <td rowSpan={2}>(2) REL.</td>
            <td rowSpan={2}>(3) ENUM CLASS</td>
            <td rowSpan={2}>ESC. CODE</td>
            <td rowSpan={2}>(4) EST. TOTAL ADULTS</td>
            <td rowSpan={2}>BROOD STOCK REMOVALS</td>
            <td rowSpan={2}>JACKS</td>
            <td rowSpan={2}>ESC. GOAL</td>
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
            {renderTable("SK 1")}
          </tr>
          <tr>{renderTable("SK 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              COHO 1 <br />2
            </td>
            {renderTable("CO 1")}
          </tr>
          <tr>{renderTable("CO 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              PINK 1
              <br />2
            </td>
            {renderTable("PK 1")}
          </tr>
          <tr>{renderTable("PK 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              CHUM 1
              <br />2
            </td>
            {renderTable("CM 1")}
          </tr>
          <tr>{renderTable("CM 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              CHINOOK 1
              <br />2
            </td>
            {renderTable("CN 1")}
          </tr>
          <tr>{renderTable("CN 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              ST 1
              <br />2
            </td>
            {renderTable("ST 1")}
          </tr>
          <tr>{renderTable("ST 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              AT 1
              <br />2
            </td>
            {renderTable("AT 1")}
          </tr>
          <tr>{renderTable("AT 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              CT 1
              <br />2
            </td>
            {renderTable("CT 1")}
          </tr>
          <tr>{renderTable("CT 2")}</tr>
          <tr>
            <td rowSpan={2} className={styles.colOne}>
              TR 1
              <br />2
            </td>
            {renderTable("TR 1")}
          </tr>
          <tr>{renderTable("TR 2")}</tr>
        </tbody>
      </table>
      <div className={styles.commentBox}>
        <div className={styles.inlineFlex}>
          <div className={styles[No5]}></div>
          <div>(5) ESCAPEMENT ESTIMATION COMMENTS</div>
        </div>
        <div className={styles.inlineFlex}>
          <div className={styles[No6]}></div>
          <div>(6) GENERAL COMMENTS ON RUN TIMING</div>
        </div>
      </div>
    </>
  );
};

export default TableType4;

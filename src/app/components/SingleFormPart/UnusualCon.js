import React, { useState } from "react";
import styles from "./UnusualCon.module.css";
const UnusualCon = ({ items, folderName }) => {
  // Component logic goes here
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format7e = folderName == "7eresultocr";
  const isSelect = false;


  const A =
    (format4c || format6e) &&
    (items["(A) Enhancement"] ||
      items["(A) Enhancement or intense biological activities"]);
  const B = (format4c || format6e) && items["(B) Unusual mortalities"];
  const C =
    (format4c || format6e) &&
    (items["(C) Obstructions"] ||
      items["(C) Obstruction or changes in habitat with recommendations"]);
  const D =
    (format4c || format6e) &&
    (items["(D) Large variation"] ||
      items["(D) Large variations in sex ratio or unusual number of jacks"]);
  const E =
    (format4c || format6e) &&
    (items["(E) High/low water"] ||
      items["(E) Unusual high or low water flow level during spawning period"]);

  const No7 = format7e && items["(7) Enhancement"];
  const No8 = format7e && items["(8) Unusual mortalities"];
  const No9 = format7e && items["(9) Upslope instability"];
  const No10 = format7e && items["(10) Debris jams present"];
  const No11 = format7e && items["(11) Severe bank erosion"];
  const No13 = format7e && items["(13) Unusual drought"];
  const No14 = format7e && items["(14) Flood"];
  const No15 = format7e && items["(15) General comments"];
  return (
    // JSX code goes here
    <>
      {(format4c || format6e) && (
        <>
          <div className={styles.title}>UNUSUAL CONDITIONS</div>
          <div className={styles.wrapper}>
            <ul className={styles.myList}>
              <li className={styles[A]}>
                (A) Enhancement activities or intense biological activities.
              </li>
              <li className={styles[B]}>(B) Unusual Mortalities.</li>
              <li className={styles[C]}>
                (C) Obstructions or changes in habitat with recommendations.
              </li>
              <li className={styles[D]}>
                (D) Large variation in sex ratio or unusual number of jacks.
              </li>
              <li className={styles[E]}>
                (E) High/low water flow level during spawning.
              </li>
            </ul>
          </div>
        </>
      )}
      {format7e && (
        <>
          <div className={styles.title}>
            UNUSUAL CONDITIONS IN STREAM COURSE OR SPAWNING GROUNDS
          </div>
          <div className={styles.wrapper}>
            <ul className={styles.myList}>
              <li className={styles[No7]}>
                (7) Enhancement or intense biological activities.
              </li>
              <li className={styles[No8]}>(8) Unusual mortalities</li>
              <li className={styles[No9]}>(9) Upslope instability</li>
              <li className={styles[No10]}>
                (10) Debris jams present which could become a debris torrent
              </li>
              <li className={styles[No11]}>(11) Severe bank erosion</li>
              <li className={styles.no12}>
                (12) Percent(%) of spawning habitat degradations:
              </li>
              <span className={styles.no13span}> Unusual</span>
              <li className={`${styles[No13]} ${styles.inlineList}`}>
                (13) drought or
              </li>

              <li className={`${styles[No14]} ${styles.inlineList}`}>
                (14) Flood
                <span className={styles.no14span}>
                  impacts on spawning or egg incubation success of salmon this
                  year
                </span>
              </li>
              <li className={styles[No15]}>
                (15) GENERAL COMMENTS ON UNUSUAL CONDITIONS
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default UnusualCon;

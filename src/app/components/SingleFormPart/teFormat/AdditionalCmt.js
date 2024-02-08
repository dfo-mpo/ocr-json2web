import React from "react";
import styles from "./AdditionalCmt.module.css";
const AdditionalCmt = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";

  /*  4c: 
    Additional (A) Evidence of erosion and silting
   Additional (B) Particulars of scouring of spawning beds
   Additional (C) Water levels flow
   Biological (D) Particulars of distribution
   Biological (E) Comments on predators
   Biological (F) Evidence of digging eggs
   Biological (G) New obstruction
    Comments (K)
*/

  const a4c = items["Additional (A) Evidence of erosion and silting"];
  const b4c = items["Additional (B) Particulars of scouring of spawning beds"];
  const c4c = items["Additional (C) Water levels flow"];
  const d4c = items["Biological (D) Particulars of distribution"];
  const e4c = items["Biological (E) Comments on predators"];
  const f4c = items["Biological (F) Evidence of digging eggs"];
  const g4c = items["Biological (G) New obstruction"];
  const k4c = items["Comments (K)"];

  /*
 4H: 
 Physical Condition (A)
 Physical Condition (B)
 Physical Condition (C)
 Biological Condition (D)
 Biological Condition (E)
 Biological Condition (F)
 Biological Condition (G)
 Comments on any other conditions
*/
  const a4h = items["Physical Condition (A)"];
  const b4h = items["Physical Condition (B)"];
  const c4h = items["Physical Condition (C)"];
  const d4h = items["Biological Condition (D)"];
  const e4h = items["Biological Condition (E)"];
  const f4h = items["Biological Condition (F)"];
  const g4h = items["Biological Condition (G)"];
  const k4h = items["Comments on any other conditions"];

  /*
5A:
    (A) Evidence of Erosion
    (B) Particulars of Scouring
    (C) Water levels
    (D) Spawning distribution
    (E) Comments on predators
    (F) Egg digging
    (G) New obstructions
    (H) recommended enhancement
    (I) Habitat change
    (K) Additional comments
    (K) Additional comments continued
*/
  const a5a = items["(A) Evidence of Erosion"];
  const b5a = items["(B) Particulars of Scouring"];
  const c5a = items["(C) Water levels"];
  const d5a = items["(D) Spawning distribution"];
  const e5a = items["(E) Comments on predators"];
  const f5a = items["(F) Egg digging"];
  const g5a = items["(G) New obstructions"];
  const h5a = items["(H) recommended enhancement"];
  const i5a = items["(I) Habitat change"];
  const k5a = items["(K) Additional comments"];
  const k5a2 = items["(K) Additional comments continued"];

  /*
6E:
Physical conditions (A) Evidence
Physical conditions (B) Particulars
Physical conditions (C) Water levels
Biological conditions (D) Particulars
Biological conditions (E) Predators comments
Biological conditions (F) Evidence
Biological conditions (G) New obstructions
Comments
*/
  const a6e = items["Physical conditions (A) Evidence"];
  const b6e = items["Physical conditions (B) Particulars"];
  const c6e = items["Physical conditions (C) Water levels"];
  const d6e = items["Biological conditions (D) Particulars"];
  const e6e = items["Biological conditions (E) Predators comments"];
  const f6e = items["Biological conditions (F) Evidence"];
  const g6e = items["Biological conditions (G) New obstructions"];
  const k6e = items["Comments"];

  return (
    <>
      <div className={styles.title}>ADDITIONAL COMMENTS</div>
      <div className={styles.wrapper}>
        <div className={styles.title2}>
          PHYSICAL CONDITION of SPAWNING GROUNDS
        </div>
        <ul className={styles.myList}>
          <li>
            (A) Evidence of erosion and silting. Give extent or percent of
            stream bed affected:
          </li>

          <div className={`${styles.subList} ${a4c && a4c[1] ? "" : styles.isRed}`}>{a4c ? a4c : <br />}</div>

          <li>
            (B) Particulars of scouring of spawning beds or change in course of
            stream:
          </li>

          <div
            className={`${styles.subList} ${b4c && b4c[1] ? "" : styles.isRed}`}
          >
            {b4c ? b4c : <br />}
          </div>

          <li>
            (C) Water levels flow, normal, abnormal. If abnormal, details should
            be given:
          </li>

          <div className={`${styles.subList} ${c4c && c4c[1] ? "" : styles.isRed}`}>{c4c ? c4c : <br />}</div>
        </ul>
      </div>
      <div className={styles.wrapper2}>
        <div className={styles.title2}>BIOLOGICAL CONDITIONS</div>
        <ul className={styles.myList}>
          <li>(D) Particulars of distribution of salmon over stream bed:</li>

          <div className={`${styles.subList} ${d4c && d4c[1] ? "" : styles.isRed}`}>{d4c ? d4c : <br />}</div>

          <li>(E) Comments on predators:</li>

          <div className={`${styles.subList} ${e4c && e4c[1] ? "" : styles.isRed}`}>{e4c ? e4c : <br />}</div>

          <li>(F) Evidence of digging up eggs by late spawning fish:</li>

          <div className={`${styles.subList} ${f4c && f4c[1] ? "" : styles.isRed}`}>{f4c ? f4c : <br />}</div>

          <li>(G) New obstructions (nature and recommendations):</li>

          <div className={`${styles.subList} ${g4c && g4c[1] ? "" : styles.isRed}`}>{g4c ? g4c : <br />}</div>
        </ul>
      </div>
      <div className={styles.title}>
        COMMENTS ON ANY OTHER CONDITIONS AFFECTING THIS STREAM
      </div>
      <div className={styles.wrapper3}>
        <div className={styles.myList}>
          <div className={`${styles.subList} ${k4c && k4c[1] ? "" : styles.isRed}`}>{k4c ? k4c : <br />}</div>
        </div>
      </div>
    </>
  );
};

export default AdditionalCmt;

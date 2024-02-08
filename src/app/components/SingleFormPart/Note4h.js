import React from "react";
import styles from "./Note4h.module.css";
const Note4h = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.myList}>
        <li>
          (1) Provision is made fro two runs per species. If only one use line 1
        </li>
        <li>
          (2) Date entry:
          <div className={styles.subList}>
            {" "}
            Month: enter first 3 letters (AUG) or (Oct)
          </div>
          <div className={styles.subList}>Day: enter date (12) or (04)</div>
          <div className={styles.subList}>
            or Enter letter codes - (A) 1 - 10th (B) 11 - 20th (C) 21 - 31st
          </div>
        </li>
        <li>
          (3) Method of inspection used: Enter up to 4 methods
          <div className={styles.subList2}>
            <div>
              <div>[1] Walk</div>
              <div>[2] Float</div>
              <div>[3] Plane</div>
            </div>
            <div>
              <div>[4] Helicopter</div>
              <div>[5] Redd Counts</div>
              <div>[6] Spot Check</div>
            </div>
            <div>
              <div>[7] Strip Counts</div>
              <div>[8] Dead Pitch</div>
              <div>[9] Tag Recovery</div>
            </div>
            <div>
              <div>[10] Other</div>
            </div>
          </div>
        </li>
        <li>
            (4) Reliability of spawning population estimate<br/>
            <div className={styles.subList3}>LOW   1   2   3   4   5   HIGH</div>
        </li>
        <li>
            (5) Estimate total annual escapement or N.O. (none observed) J.P. (juveniles present) U.K. (unknown) N.I. (not inspected)
        </li>
      </ul>
    </div>
  );
};

export default Note4h;

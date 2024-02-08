import React from "react";
import styles from "./Signature.module.css";

const Signature = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";
  const format7e = folderName == "7eresultocr";

  //4c: no signature
  //4h: signature
  //5a: Signature, Fishery Officer
  //6e: Person preparing
  //7e: Person preparing report

  const signature4h = items["signature"];
  const signature5a = items["Signature"];
  const preparing5a = items["Fishery Officer"];
  const preparing6e = items["Person preparing"];
  const preparing7e = items["Person preparing report"];
  return (
    <div className={styles.wrapper}>
      {format4h && (
        <div className={styles.nameBox}>
          <div>
            <div className={styles.signatureFont}>
              {signature4h ? signature4h : <br />}
            </div>
            <div className={styles.underName}>Signature</div>
          </div>
        </div>
      )}
      {
        format5a && (
          <div className={styles.nameBox}>
            <div>
              <div className={styles.signatureFont}>
                {signature5a ? signature5a : <br />}
              </div>
              <div className={styles.underName}>Signature</div>
            </div>
            <div>
              <div className={styles.officeName}>
                {preparing5a ? preparing5a : <br />}
              </div>
              <div className={styles.underName}>
                Fishery Office/Person Preparing Report
              </div>
            </div>
          </div>
        ) //5a
      }
      {
        format6e && (
          <div className={styles.nameBox}>
            <div>
              <div className={styles.officeName}>
                {preparing6e ? preparing6e : <br />}
              </div>
              <div className={styles.underName}>Person Preparing Report</div>
            </div>
          </div>
        ) //6e
      }
      {
        format7e && (
          <div className={styles.nameBox}>
            <div>
              <div className={styles.officeName}>
                {preparing7e ? preparing7e : <br />}
              </div>
              <div className={styles.underName}>Person Preparing Report</div>
            </div>
          </div>
        ) //7e
      }
    </div>
  );
};

export default Signature;

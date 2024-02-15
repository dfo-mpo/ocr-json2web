import styles from "./AdditionalCmt.module.css";
import EditableFieldTextarea from "./EditableField/EditableFieldTextarea";
import { useContext } from "react";
import modifyContext from "../../../state/modify-context";
const AdditionalCmt = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";

  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;

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

  const handleChange = (event) => {
    updateItem(() => {
      return {
        ...itemCtx,
        [event.target.name]: [event.target.value, 2],
      };
    });
  };
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

          <div
            className={`${styles.subList} ${a4c && a4c[1] ? "" : styles.isRed}`}
          >
            {a4c ? (
              <EditableFieldTextarea
                fieldName="Additional (A) Evidence of erosion and silting"
                fieldValue={a4c[0]}
                isRed={a4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>

          <li>
            (B) Particulars of scouring of spawning beds or change in course of
            stream:
          </li>

          <div
            className={`${styles.subList} ${b4c && b4c[1] ? "" : styles.isRed}`}
          >
            {b4c ? (
              <EditableFieldTextarea
                fieldName="Additional (B) Particulars of scouring of spawning beds"
                fieldValue={b4c[0]}
                isRed={b4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>

          <li>
            (C) Water levels flow, normal, abnormal. If abnormal, details should
            be given:
          </li>

          <div
            className={`${styles.subList} ${c4c && c4c[1] ? "" : styles.isRed}`}
          >
            {c4c ? (
              <EditableFieldTextarea
                fieldName="Additional (C) Water levels flow"
                fieldValue={c4c[0]}
                isRed={c4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>
        </ul>
      </div>
      <div className={styles.wrapper2}>
        <div className={styles.title2}>BIOLOGICAL CONDITIONS</div>
        <ul className={styles.myList}>
          <li>(D) Particulars of distribution of salmon over stream bed:</li>

          <div
            className={`${styles.subList} ${d4c && d4c[1] ? "" : styles.isRed}`}
          >
            {d4c ? (
              <EditableFieldTextarea
                fieldName="Biological (D) Particulars of distribution"
                fieldValue={d4c[0]}
                isRed={d4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>

          <li>(E) Comments on predators:</li>

          <div
            className={`${styles.subList} ${e4c && e4c[1] ? "" : styles.isRed}`}
          >
            {e4c ? (
              <EditableFieldTextarea
                fieldName="Biological (E) Comments on predators"
                fieldValue={e4c[0]}
                isRed={e4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>

          <li>(F) Evidence of digging up eggs by late spawning fish:</li>

          <div
            className={`${styles.subList} ${f4c && f4c[1] ? "" : styles.isRed}`}
          >
            {f4c ? <EditableFieldTextarea
                fieldName="Biological (F) Evidence of digging eggs"
                fieldValue={f4c[0]}
                isRed={f4c[1]}
                handleChange={handleChange}
              /> : <br />}
          </div>

          <li>(G) New obstructions (nature and recommendations):</li>

          <div
            className={`${styles.subList} ${g4c && g4c[1] ? "" : styles.isRed}`}
          >
            {g4c ? (
              <EditableFieldTextarea
                fieldName="Biological (G) New obstruction"
                fieldValue={g4c[0]}
                isRed={g4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>
        </ul>
      </div>
      <div className={styles.title}>
        COMMENTS ON ANY OTHER CONDITIONS AFFECTING THIS STREAM
      </div>
      <div className={styles.wrapper3}>
        <div className={styles.myList}>
          <div
            className={`${styles.subList} ${k4c && k4c[1] ? "" : styles.isRed}`}
          >
            {k4c ? (
              <EditableFieldTextarea
                fieldName="Comments (K)"
                fieldValue={k4c[0]}
                isRed={k4c[1]}
                handleChange={handleChange}
              />
            ) : (
              <br />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalCmt;

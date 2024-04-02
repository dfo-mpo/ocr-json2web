import React from "react";
import styles from "./SaveButtonComb.module.css";

const SaveButtonComb = ({onSaveInsideComb}) => {
  return (
    <>
      <div className={styles.note}>Please ensure it's saved before saving this form.</div>
      <div className={styles.buttonWrapper}>
        <button 
        onClick = {onSaveInsideComb}
        className={styles.submit}>Save</button>
      </div>
    </>
  );
};

export default SaveButtonComb;

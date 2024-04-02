import React from "react";
import styles from "./SaveButton.module.css";

const SaveButton = () => {
  return (
    <>
      <div className={styles.note}>Please saved this form before submitting form.</div>
      <div className={styles.buttonWrapper}>
        <button className={styles.submit}>Save</button>
      </div>
    </>
  );
};

export default SaveButton;

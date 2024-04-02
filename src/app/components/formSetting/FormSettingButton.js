import React from "react";
import styles from "./FormSettingButton.module.css";

const FormSettingButton = ({ onSubmit }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.submit} onClick={onSubmit}>
        Submit
      </button>
      <button
        type="button"
        onClick={() => window.close()}
        className={styles.cancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default FormSettingButton;

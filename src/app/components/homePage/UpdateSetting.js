import { useState, useEffect } from "react";
import styles from "./UpdateSetting.module.css";

const UpdateSetting = (folderNames) => {
  const [isToggled, setIsToggled] = useState(false);

  const onClickHandler = async () => {
    const Response = await fetch("/api/saveFormSetting", {
      method: "POST",
      body: JSON.stringify(folderNames),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Response.ok) {
      alert("Error");
    } else {
      alert("Success");
      setIsToggled(false);
    }
  };
  return (
    <>
      <button
        className={styles.importButton}
        onClick={() => setIsToggled(!isToggled)}
      >
        Update Settings
      </button>
      {isToggled && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsToggled(!isToggled)}
          ></div>
          <div
            className={styles.confirmWindow}
            // action={formAction}
            // onSubmit={() => setIsToggled(false)}
          >
            <div className={styles.title}>Import folder names</div>

            <div className={styles.warming}>
              This will update folder names in the formSetting.json file. You
              only need to do this during the initial setup of the web app or
              when there are updates to the folders
            </div>

            <div className={styles.buttonWrapper}>
              <button
                className={styles.submit}
                onClick={() => onClickHandler()}
              >
                Confirm
              </button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setIsToggled(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateSetting;

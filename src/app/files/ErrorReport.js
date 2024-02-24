"use client";
import { useState, useRef, useEffect } from "react";

import styles from "./ErrorReport.module.css";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import error from "../../../public/images/error.svg";
const ErrorReport = ({ folderName, fileName, reFetch }) => {

  const [isError, setIsError] = useState(false);
  const [isToggled, setIsToggled] = useState(false);


  useEffect(() => {
    isToggled &&
      setSubmitData({
        fileName: fileName,
        folderName: folderName,
        errorDescription: "",
      });
  }, [isToggled]);

  // useEffect(() => {
  //   if (state.status === 200) {
  //     setIsToggled(false);
  //     setSubmitData({
  //       fileName: fileName,
  //       folderName: folderName,
  //       errorField: "Stream Identification",
  //       errorDescription: "",
  //     });
  //     errorFieldRef.current.value = "";
  //     errorDescriptionRef.current.value = "";
  //   }

  //   if (state.status === 500) {
  //     setIsError(true);
  //   }
  // }, [state.status]);

  const errorFieldRef = useRef(null);
  const errorDescriptionRef = useRef(null);
  const [submitData, setSubmitData] = useState({
    fileName: fileName,
    folderName: folderName,
    errorDescription: "",
    error: true,
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();

    setSubmitData({
      ...submitData,
      [name]: trimmedValue,
    });
  };

  const onClickHandler = async () => {
    if (submitData.errorField === "") {
      alert("Please select an error field");
      return;
    }

    const Response = await fetch("/api/errorStatus", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Response.ok) {
      setIsError(true);
      alert("Error");
    } else {
      alert("Success");
      setIsError(false);
      setIsToggled(false);
      reFetch();
      setSubmitData({
        fileName: fileName,
        folderName: folderName,
        errorDescription: "",
      });
      errorDescriptionRef.current.value = "";
    }
  };

  return (
    <>
      <button
        className={styles.reportButton}
        onClick={() => setIsToggled(!isToggled)}
      >
        Report Errors <Image src={error} alt="error" width={15} height={15} />
      </button>
      {isToggled && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsToggled(!isToggled)}
          ></div>
          <div
            className={styles.errorWindow}
            // action={formAction}
            // onSubmit={() => setIsToggled(false)}
          >
            <div className={styles.title}>Report Errors</div>
            <div className={styles.formField}>
              <input
                type="hidden"
                id="folderName"
                name="folderName"
                value={folderName}
              />
              <input
                type="hidden"
                id="fileName"
                name="fileName"
                value={fileName}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="errorDescription">Error Description</label>
              <textarea
                className={styles.errorDescription}
                type="text"
                name="errorDescription"
                onChange={handleChange}
                ref={errorDescriptionRef}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.submit}
                onClick={() => onClickHandler()}
              >
                Submit
              </button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setIsToggled(false);
                  setSubmitData({
                    fileName: fileName,
                    folderName: folderName,
                    errorField: "Stream Identification",
                    errorDescription: "",
                  });
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

export default ErrorReport;

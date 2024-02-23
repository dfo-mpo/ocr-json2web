"use client";
import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import verifiedIcon from "../../../public/images/verified.svg";
import styles from "./VerifiedFile.module.css";
const VerifiedFile = ({ folderName, fileName, verified }) => {
  //   const [state, formAction] = useFormState(verified, {
  //     status: null,
  //     message: null,
  //   });
  const [isToggled, setIsToggled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isToggled) {
      passwordRef.current.focus();
    }
  }, [isToggled]);

  const onClickHandler = async (e) => {
    const submitData = {
      folderName: e.target.folderName.value,
      fileName: e.target.fileName.value,
      verified: e.target.verified.value,
    };

    const Response = await fetch("/api/verified", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else {
      console.log("Success");
      alert("Success");
      setIsSuccess(true);
      setIsToggled(false);
    }
  };
  const onPasswordHandler = (e) => {
    const password = document.getElementById("password").value;
    if (password === "123") {
      onClickHandler(e);
    } else {
      alert("Wrong Password");
    }
  };
  return (
    <>
      {isToggled && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsToggled(!isToggled)}
          ></div>
          <form
            className={styles.errorWindow}
            onSubmit={(e) => {
              e.preventDefault();
              onPasswordHandler(e);
            }}
          >
            <div className={styles.passwordWrap}>
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                ref={passwordRef}
                name="password"
              />
            </div>

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
            <input type="hidden" id="verified" name="verified" value="true" />
            {isSuccess && <p className={styles.success}>Submit Successfully</p>}
            <div className={styles.buttonWrapper}>
              <button className={styles.submit} type="submit">
                Submit
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
          </form>
        </>
      )}

      {!isSuccess && !verified && (
        <button
          className={styles.verifiedButton}
          type="submit"
          onClick={() => setIsToggled(true)}
        >
          Verified File
          <Image src={verifiedIcon} alt="verified" width={22} height={22} />
        </button>
      )}
    </>
  );
};

export default VerifiedFile;

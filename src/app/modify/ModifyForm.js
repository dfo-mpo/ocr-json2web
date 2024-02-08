"use client";
import React from "react";
import styles from "./ModifyForm.module.css";
const ModifyForm = async ({ jsonData, folderName, fileName }) => {
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newJsonData = JSON.parse(event.target.jsonData.value);
    const dataToSubmit = {
      folderName,
      fileName,
      jsonData: newJsonData,
    };

    const Response = await fetch("/api/modify", {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else {
      console.log("Success");
      alert("Success! The tab will now be closed.");
      window.close();
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <textarea
        name="jsonData"
        className={styles.textarea}
        defaultValue={JSON.stringify(jsonData, null, 2)}
      ></textarea>
      <div className={styles.buttonWrap}>
        <button type="submit" className={styles.button}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ModifyForm;

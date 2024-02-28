"use client";
import SingleForm from "./SingleForm";
import Form from "./Form";
import { useState, useEffect, use } from "react";
import styles from "./FormRender.module.css";
//TODO: remove import formSetting from "../formSetting.json"
import formSetting from "../formSetting.json"
//TODO: add formSetting as a prop
const FormRender = ({ items, folderName, fileName, reFetch, reFetchJson }) => {
 
  const [isForm, setIsForm] = useState(true);
  const saveChange = () => {
    reFetch();
  };

  const cancelChange = () => {
    reFetchJson();
  };
 
  
  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsForm(!isForm)}
      >
        Switch
      </button>
      

      {!isForm && (
        <SingleForm folderName={folderName} fileName={fileName} items={items} />
      )}
      {isForm && (
        <Form folderName={folderName} formSetting = {formSetting} fileName={fileName} items={items} saveChange= {saveChange}
        cancelChange={cancelChange}
        />
      )}
    </>
  );
};

export default FormRender;

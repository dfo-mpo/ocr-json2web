//TODO: can be deleted
"use client";
import SingleForm from "./SingleForm";
import Form from "./Form";
import { useState, useEffect } from "react";
import styles from "./FormRender.module.css";


const FormRender = ({ items, folderName, fileName, formSetting }) => {
  const [isForm, setIsForm] = useState(true);


  
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
      {isForm &&  (<Form folderName={folderName} formSetting = {formSetting} fileName={fileName} items={items} />)
      }
    </>
  );
};

export default FormRender;

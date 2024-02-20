"use client";
import SingleForm from "./SingleForm";
import Form from "./Form";
import { useState } from "react";
import styles from "./FormRender.module.css";

const FormRender = ({ items, folderName, fileName }) => {
  const [isForm, setIsForm] = useState(false);
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
        <Form folderName={folderName} fileName={fileName} items={items} />
      )}
    </>
  );
};

export default FormRender;

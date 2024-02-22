"use client";
import SingleForm from "./SingleForm";
import Form from "./Form";
import { useState, useEffect, use } from "react";
import styles from "./FormRender.module.css";

const FormRender = ({ items, folderName, fileName }) => {
  const [isForm, setIsForm] = useState(true);
  const [formSetting, setFormSetting] = useState({});
  const [isReload, setIsReload] = useState(true);

  const asyncFetch = async () => {
    setIsReload(true);
    const Response = await fetch("/api/formSetting", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
    } else {
      const reader = Response.body.getReader();
      const readData = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // `value` contains the chunk of data as a Uint8Array
            const jsonString = new TextDecoder().decode(value);
            // Parse the JSON string into an object
            const dataObject = JSON.parse(jsonString);
        
            setFormSetting(dataObject);
            setIsReload(false);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when done
        }
      };
      readData();
    }
  };
  useEffect(() => {
    asyncFetch();
  }, []);
  
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
        isReload ? (<div>Loading...</div>) : (<Form folderName={folderName} formSetting = {formSetting} fileName={fileName} items={items} />)
      )}
    </>
  );
};

export default FormRender;

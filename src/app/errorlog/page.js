"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const ErrorLog = ({ searchParams }) => {
  const folderNames = JSON.parse(searchParams.folderNames);
  const [errorArray, setErrorArray] = useState([]);
  const [selectErrorArray, setSelectErrorArray] = useState([]);
  

  const asyncFetch = async () => {
    const Response = await fetch("/api/errorLog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folderNames),
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

            dataObject
              .sort((a, b) => {
                a.folderName.localeCompare(b.folderName);
              })
              .sort((a, b) => {
                a.fileName.localeCompare(b.fileName);
              });
            setErrorArray(dataObject);
            setSelectErrorArray(dataObject);
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


  const handleChange = (event) => {
    if( event.target.value === "all"){
      setSelectErrorArray(errorArray);
    }
    else{
      const filteredErrorArray = errorArray.filter((error) => {
        return error.folderName === event.target.value;
      });
      setSelectErrorArray(filteredErrorArray);
    }

  };

  return (
    <div className={styles.container}>
      <h3>Error Log</h3>
    <div className={styles.selectContainer}>
      <select className={styles.select}    onChange={handleChange} >
        <option value="all">All</option>
        {
          folderNames.map((folderName) => {
            return <option key={folderName} value={folderName}>{folderName}</option>
          })
        }
      </select>
    </div>
      <div className={styles.errorContainer}>

        {selectErrorArray.length? selectErrorArray.map((error, index) => {
          return (
            <div key={index} className={styles.eachError}>
              <div className={styles.folderName}>{error.folderName}</div>
              <div className={styles.fileName}>{error.fileName}</div>
              <div className={styles.errorInfoBox}>
                {error.errorInfo.map((errorInfo, index) => {
                  return (
                    <div key={index} className={styles.errorInfo}>
                      <div>Error Field: {errorInfo.errorField}</div>
                      <div>Error Description: {errorInfo.errorDescription}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
        : <div
          className={styles.noError}
        >
          No Error Log
          </div>
          }
      </div>
    </div>
  );
};

export default ErrorLog;

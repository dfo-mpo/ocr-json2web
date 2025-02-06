"use client";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import ViewJson from "./ViewJson";

const JsonPage = ({ folderName, fileName, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jsonData, setJsonData] = useState({});

  //fetch json data from blob
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/jsonDataModified", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: fileName,
        folderName: folderName,
      }),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
    } else {
      const reader = Response.body.getReader();
      const readData = async () => {
        // try {
        //   while (true) {
        //     const { done, value } = await reader.read();
        //     if (done) {
        //       break;
        //     }
        //     // `value` contains the chunk of data as a Uint8Array
        //     const jsonString = new TextDecoder().decode(value);
        //     // Parse the JSON string into an object
        //     const dataObject = JSON.parse(jsonString);

        //     setJsonData(dataObject);
        //     setIsLoading(false);
        //   }
        try {
          let jsonString = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Process the entire JSON when the stream is complete
              const dataObject = JSON.parse(jsonString);
              console.log(dataObject);
              setJsonData(dataObject);
              setIsLoading(false);
              break;
            }
            // Concatenate the chunks into a single string
            jsonString += new TextDecoder().decode(value);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when
        }
      };
      readData();
    }
  };
  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <div className={styles.container}>
      <title>{`Json: ${fileName
        .replace(".json", "")
        .replace(/_/g, " ")}`}</title>
      <div className={styles.fileName}>File Name: {fileName}</div>
      <div className={styles.closeIcon} onClick={onClose}>🞭</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ViewJson
          jsonData={jsonData}
          folderName={folderName}
          fileName={fileName}
        />
      )}
    </div>
  );
};
export default JsonPage;

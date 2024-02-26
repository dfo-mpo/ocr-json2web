"use client";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import ViewJson from "./ViewJson";

const page = ({ searchParams }) => {
  const { folderName, fileName } = searchParams;
  const [isLoading, setIsLoading] = useState(true);
  const [jsonData, setJsonData] = useState({});

  //fetch json data from blob
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/jsonData", {
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

            setJsonData(dataObject);
            setIsLoading(false);
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
    <div className={styles.container}>
            <title>{`Json: ${fileName.replace(".json", "").replace(/_/g, " ")}`}</title>
      <div className={styles.fileName}>File Name: {fileName}</div>
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
export default page;

"use client";

import FileNameList from "./FileNameList";
import Link from "next/link";
import styles from "./FileNameReader.module.css";
import { useState, useEffect } from "react";

// this component reads the file names and folder name from the bc16Data folder
// then combines the file names and folder names as an array of objects: [ {folderName: folderName, fileName: fileName},  ....]
// and displays file names in a list on the Home page.

const FileNameReader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchResult, setFetchResult] = useState([]);
  const [folderNames, setFolderNames] = useState([]);

  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/fileName", {
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
          let jsonString = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Process the entire JSON when the stream is complete
              const dataObject = JSON.parse(jsonString);
              setFetchResult(dataObject);

              // Extract unique folder names
              const uniqueFolderNames = [
                ...new Set(dataObject.map((item) => item.folderName)),
              ];
              setFolderNames(uniqueFolderNames);
              setIsLoading(false);
              break;
            }

            // Concatenate the chunks into a single string
            jsonString += new TextDecoder().decode(value);
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

  // Sort the array of file details by file name

  // Return the component with the list of file details
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <FileNameList filesByFolder={fetchResult} />
          <div className={styles.errorLink}>
            <Link
              href={{
                pathname: "/errorlog/",
                query: { folderNames: folderNames },
              }}
            >
              Error Log
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default FileNameReader;

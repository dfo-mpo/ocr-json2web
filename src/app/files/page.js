"use client";
import FormRender from "../components/FormRender";
import styles from "./page.module.css";
import ErrorReport from "./ErrorReport";
import Link from "next/link";
import LogoHeader from "../components/LogoHeader";
import Iframe from "./Iframe";
import Image from "next/image";
import errorIcon from "../../../public/images/error.svg";
import verifiedIcon from "../../../public/images/verified.svg";
import modifiedIcon from "../../../public/images/modified.svg";

import VerifiedButton from "./VerifiedButton";
import { useState, useEffect, useRef } from "react";

const File = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormsettingReady, setIsFormsettingReady] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [formSetting, setFormSetting] = useState({});
  const [verified, setVerified] = useState(false);
  const [fileStatusJson, setFileStatusJson] = useState([]);
  const [modified, setModified] = useState(false);
  const [error, setError] = useState(false);
  const [pageHeight, setPageHeight] = useState(1500);

  // this is the Form page
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;

  const myContainer = useRef(null);

  useEffect(() => {
    if (myContainer.current) {
      const height = myContainer.current.clientHeight;
      setPageHeight(height);
    }
  });

  // const error = searchParams.error === "true";
  // const modified = searchParams.modified === "true";

  const submitData = {
    fileName: fileName,
    folderName: folderName,
  };

  //fetch json data from blob
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/jsonDataModified", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
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
          reader.releaseLock(); // Release the reader's lock when done
        }
      };
      readData();
    }
  };

  const asyncFetchFormSetting = async () => {
    setIsFormsettingReady(true);
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

        //     setFormSetting(dataObject);
        //     setIsFormsettingReady(false);
        //   }

        try {
          let jsonString = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Process the entire JSON when the stream is complete
              const dataObject = JSON.parse(jsonString);

              setFormSetting(dataObject);
              setIsFormsettingReady(false);
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

  //fetching the fire status
  const asyncFetchStatus = async () => {
    const Response = await fetch("/api/fileStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([folderName]),
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

        //     dataObject.forEach((item) => {
        //       if (item.fileName === fileName) {
        //         setVerified(item.verified);
        //         setModified(item.modified);
        //         setError(item.error);
        //       }
        //     });
        //   }

        try {
          let jsonString = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Process the entire JSON when the stream is complete
              const dataObject = JSON.parse(jsonString);
              dataObject.forEach((item) => {
                if (item.fileName === fileName) {
                  setVerified(item.verified);
                  setModified(item.modified);
                  setError(item.error);
                }
              });
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
    asyncFetchFormSetting();
    asyncFetchStatus();
  }, []);
  return (
    <div className={styles.allPage}>
      {/* <title>{folderName}</title> */}
      <title>{fileName.replace(".json", "").replace(/_/g, " ")}</title>
      <LogoHeader />
      {/* <Link className={styles.backButton} href="/">
          Back
        </Link> */}
      <h5 className={styles.fileName}>
        File Name: {fileName.replace(/_/g, " ").replace(".json", "")}
        {verified && (
          <Image src={verifiedIcon} alt="verified" width={20} height={20} />
        )}
        {error && <Image src={errorIcon} alt="error" width={15} height={15} />}
        {modified && (
          <Link
            className={styles.modifiedLink}
            rel="noopener noreferrer"
            target="_blank"
            href={{
              pathname: "/filesOriginal/",
              query: {
                fileName: fileName,
                folderName: folderName,
              },
            }}
          >
            <Image src={modifiedIcon} alt="modified" height={23} width={23} />
            <span>View Original Version</span>
          </Link>
        )}
      </h5>

      {isLoading || isFormsettingReady ? (
        <div>Loading...</div>
      ) : (
        <>
          <ErrorReport
            fileName={fileName}
            folderName={folderName}
            reFetch={asyncFetchStatus}
          />
          <br />
          <VerifiedButton
            fileName={fileName}
            folderName={folderName}
            verified={verified}
            reFetch={asyncFetchStatus}
          />
          <div className={styles.container} ref={myContainer}>
            <FormRender
              folderName={folderName}
              items={jsonData}
              fileName={fileName}
              formSetting={formSetting}
              reFetch={asyncFetchStatus}
              reFetchJson={asyncFetch}
              // verified={verified}
            />
            <Link
              className={styles.linkStyle}
              rel="noopener noreferrer"
              target="_blank"
              href={{
                pathname: "/viewJson/",
                query: {
                  folderName: folderName,
                  fileName: fileName,
                },
              }}
            >
              View Json
            </Link>
            <Iframe
              formSetting={formSetting}
              folderName={folderName}
              fileName={fileName}
              pageHeight={pageHeight}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default File;

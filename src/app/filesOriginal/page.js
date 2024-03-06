"use client";
import FormRender from "../components/FormRender";
import styles from "./page.module.css";

import VerifiedButton from "../files/VerifiedButton";
import Link from "next/link";
import LogoHeader from "../components/LogoHeader";
import Iframe from "../files/Iframe";
import Image from "next/image";

import verifiedIcon from "../../../public/images/verified.svg";
import { useState, useEffect } from "react";

const File = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormsettingReady, setIsFormsettingReady] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [formSetting, setFormSetting] = useState({});
  const [verified, setVerified] = useState(false);

  // this is the Form page
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;

  const submitData = {
    fileName: fileName,
    folderName: folderName,
  };

  //fetch json data from blob
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/jsonData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
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
   //fetching the firle status
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

  useEffect(() => {
    asyncFetch();
    asyncFetchFormSetting();
    asyncFetchStatus();
  }, []);
  return (
    <div className={styles.allPage}>
      {/* <title>{folderName}</title> */}
      <title>{`Original Version: ${fileName.replace(".json", "").replace(/_/g, " ")}`}</title>
      <LogoHeader />
      {/* <Link className={styles.backButton} href="/">
          Back
        </Link> */}
      <h5 className={styles.fileName}>
        File Name: {fileName.replace(/_/g, " ").replace(".json", "")}
        {verified && (
          <Image src={verifiedIcon} alt="verified" width={20} height={20} />
        )}
        <span className={styles.version}>(Original Version)</span>
      </h5>

      {isLoading || isFormsettingReady ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.container}>
            <VerifiedButton
              fileName={fileName}
              folderName={folderName}
              verified={verified}
              reFetch={asyncFetchStatus}
            />
            <FormRender
              folderName={folderName}
              items={jsonData}
              fileName={fileName}
              formSetting={formSetting}
              reFetch={asyncFetchStatus}
              reFetchJson={asyncFetch}
            />

            <Iframe
              formSetting={formSetting}
              folderName={folderName}
              fileName={fileName}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default File;

"use client";
import styles from "./page.module.css";
import ErrorReport from "./ErrorReport";
import Link from "next/link";
import LogoHeader from "../components/LogoHeader";
import Iframe from "./Iframe";
import PolygonList from "./PolygonList";
import NullFieldList from "./NullFieldList";
import Image from "next/image";
import errorIcon from "../../../public/images/error.svg";
import verifiedIcon from "../../../public/images/verified.svg";
import modifiedIcon from "../../../public/images/modified.svg"; 

import VerifiedButton from "./VerifiedButton";
import { useState, useEffect, useRef } from "react";

// Function to generate polygon bounding box color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
  const [isFormSetting, setIsFormSetting] = useState();
  const [isEditingTable, setIsEditingTable] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [polygonOverlayDimensions, setPolygonOverlayDimensions] = useState([0,0]);
  const polygonOverlayRef = useRef(null);
  
  const [polygonKeys, setPolygonKeys] = useState(new Set());
  const [polygonColors, setPolygonColors] = useState({});

  useEffect(() => {
    if (Object.keys(polygonColors).length === 0) {
      const colors = Object.keys(jsonData).reduce((acc, polygon) => {
        acc[polygon] = getRandomColor();
        return acc;
      }, {});
      setPolygonColors(colors);
    }
  }, [jsonData]);

  // this is the Form page
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;

  const myContainer = useRef(null);

  // useEffect(() => {
  //   if (myContainer.current) {
  //     const height = myContainer.current.clientHeight;
  //     setPageHeight(height);
  //   }
  // });

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("test"),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
      setIsFormSetting(false);
      setIsFormsettingReady(false);
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
              console.log("it loading");

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

  const onBoxClick = (key) => {
    console.log(key)
  }

  const handlePolygonSelect = (key) => {  
    setSelectedPolygon(key);
  };  
  
  const handlePolygonDeselect = () => {  
    setSelectedPolygon(null);
  }; 

  useEffect(() => {  
    const checkDimensions = () => {  
      if (polygonOverlayRef.current && polygonOverlayRef.current.offsetHeight) {  
        setPolygonOverlayDimensions([  
          polygonOverlayRef.current.offsetWidth - 22,  
          polygonOverlayRef.current.offsetHeight  
        ]);  
      }  
    };  
  
    // Initial check  
    checkDimensions();  
  
    // Set up interval to check for changes  
    const intervalId = setInterval(checkDimensions, 100); // check every 100ms  
  
    // Clean up the interval on component unmount  
    return () => clearInterval(intervalId);  
  }, [polygonOverlayRef]);

  useEffect(() => {
    asyncFetch();
    asyncFetchFormSetting();
    asyncFetchStatus();

    window.addEventListener('resize', () => {          
      if (polygonOverlayRef && polygonOverlayRef.current) setPolygonOverlayDimensions([polygonOverlayRef.current.offsetWidth - 22, polygonOverlayRef.current.offsetHeight]);       
    }); 
  }, []);
  
  return (
    <div className={styles.allPage}>
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
      ) : isFormSetting === false ? (
        <div className={styles.error}>
          FormSetting.json file does not exist. Please return to the home page
          and click on 'Update Settings'.
        </div>
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
            {/* This return statement will contain calls the React elements created for the 2 other containers */}
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

            {/* <Link
              className={styles.linkStyle2}
              rel="noopener noreferrer"
              target="_blank"
              href={{
                pathname: "/formSetting/",
                query: {
                  folderName: folderName,
                },
              }}
            >
              Add Table
            </Link>
            <button
              className={styles.linkStyle3}
              onClick={() => {
                setIsEditingTable(!isEditingTable);
              }}
            >
              {isEditingTable ? "Close Editing" : "Edit Table"}
            </button> */}
            
            <div className={styles.layoutContainer} style={{ maxHeight: polygonOverlayDimensions[1] }}>

              <PolygonList
                fileName={fileName}
                folderName={folderName}
                json={jsonData}
                setJsonData={setJsonData}
                polygonKeys={polygonKeys}
                setPolygonKeys={setPolygonKeys}
                polygonColors={polygonColors}
                reFetch={asyncFetchStatus}
                reFetchJson={asyncFetch}
                handlePolygonSelect={handlePolygonSelect}  
                handlePolygonDeselect={handlePolygonDeselect} 
              />

              <div ref={polygonOverlayRef} className={styles.polygonOverlay}>
                <h4>Polygon Overlay</h4>
                <Iframe
                  folderName={folderName}
                  fileName={fileName}
                  pageWidth={polygonOverlayDimensions[0]}
                  json={jsonData}
                  polygonKeys={polygonKeys}
                  polygonColours={polygonColors}
                  selectedPolygon={selectedPolygon}
                  onBoxClick={onBoxClick}
                />
              </div>

              <NullFieldList
                json={jsonData}
              />

            </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default File;

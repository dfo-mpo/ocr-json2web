"use client";
import styles from "./page.module.css";
import LogoHeader from "../components/LogoHeader";
import Iframe from "../files/Iframe";
import PolygonList from "../files/PolygonList";
import NullFieldList from "../files/NullFieldList";
import HighlightColorSelector from "../components/HighlightColorSelector";
import NullFieldIndicator from "../components/NullFieldIndicator";
import Image from "next/image";
import verifiedIcon from "../../../public/images/verified.svg";
import JsonPage from "../viewJson/pageComp";

import { useState, useEffect, useRef } from "react";

const File = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormsettingReady, setIsFormsettingReady] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [formSetting, setFormSetting] = useState({});
  const [verified, setVerified] = useState(false);
  const [viewJson, setViewJson] = useState(false);
  const [modified, setModified] = useState(false);
  const [error, setError] = useState(false);
  const [isFormSetting, setIsFormSetting] = useState();
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [clickedPolygon, setClickedPolygon] = useState(null);
  const [polygonOverlayDimensions, setPolygonOverlayDimensions] = useState([0,0]);
  const polygonOverlayRef = useRef(null);
  
  const [polygonKeys, setPolygonKeys] = useState(new Set());
  const [hasNullField, setHasNullField] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#FFDE21");

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
    const Response = await fetch("/api/jsonData", {
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
    setClickedPolygon(key);
    setSelectedPolygon(key);
  }

  const handlePolygonSelect = (key) => {  
    setSelectedPolygon(key);
  };  
  
  const handlePolygonDeselect = () => {  
    setSelectedPolygon(null);
    setClickedPolygon(null);
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
    <>
      <div className={styles.allPage} onClick={()=>{if (viewJson) setViewJson(false);}}>
        <title>{fileName.replace(".json", "").replace(/_/g, " ")}</title>
        <LogoHeader />

        {/* <Link className={styles.backButton} href="/">
            Back
          </Link> */}
        <div className={styles.fileName}>
          File Name: {fileName.replace(/_/g, " ").replace(".json", "")}
          {verified && (
            <Image src={verifiedIcon} alt="verified" width={20} height={20} />
          )}
            <span className={styles.version}>(Original Version)</span>
        </div>

        {isLoading || isFormsettingReady ? (
          <div>Loading...</div>
        ) : isFormSetting === false ? (
          <div className={styles.error}>
            FormSetting.json file does not exist. Please return to the home page
            and click on 'Update Settings'.
          </div>
        ) : (
          <>
            <div className={styles.toolsContainer}>
              <HighlightColorSelector 
                highlightColor={highlightColor}
                setHighlightColor={setHighlightColor}
              />

              <NullFieldIndicator
                hasNullField={hasNullField}
              />
            </div>

            <div className={styles.container} ref={myContainer}>
              <button className={styles.linkStyle} onClick={()=>{setViewJson(true);}}>
                View Json
              </button>
              
              <div className={styles.layoutContainer} style={{ maxHeight: polygonOverlayDimensions[1] }}>

                <div className={styles.polygonsContainer}>
                  <h4>Polygon List</h4>
                  <PolygonList
                    fileName={fileName}
                    folderName={folderName}
                    json={jsonData}
                    setJsonData={setJsonData}
                    setPolygonKeys={setPolygonKeys}
                    highlightColor={highlightColor}
                    clickedPolygon={clickedPolygon}
                    reFetch={asyncFetchStatus}
                    reFetchJson={asyncFetch}
                    selectedPolygon={selectedPolygon}
                    handlePolygonSelect={handlePolygonSelect}  
                    handlePolygonDeselect={handlePolygonDeselect} 
                    isReadOnly={true}
                  />
                  
                  <h4>Null Field List</h4>
                  <NullFieldList 
                    json={jsonData} 
                    setHasNullField={setHasNullField}
                  />
                </div>

                <div ref={polygonOverlayRef} className={styles.polygonOverlay}>
                  <Iframe
                    folderName={folderName}
                    fileName={fileName}
                    pageWidth={polygonOverlayDimensions[0]}
                    json={jsonData}
                    polygonKeys={polygonKeys}
                    highlightColour={highlightColor}
                    selectedPolygon={selectedPolygon}
                    onBoxClick={onBoxClick}
                  />
                </div>
              </div>

            </div>
          </>
        )}
      </div>
      <div className={`${styles.jsonDrawer} ${viewJson? styles.openDrawer : ''}`}>
        <JsonPage
          folderName={folderName}
          fileName={fileName}
          onClose={()=>{setViewJson(false);}}
        />
      </div>
    </>
  );
};

export default File;

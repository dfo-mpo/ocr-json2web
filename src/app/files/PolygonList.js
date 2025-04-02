"use client";
import styles from "./PolygonList.module.css";
import Polygon from "../components/Polygon";
import NullField from "../components/NullField";
import { useState, useEffect, useRef } from "react";

const PolygonList = ({
  fileName,
  folderName,
  json,
  setJsonData,
  setPolygonKeys,
  highlightColor,
  clickedPolygon,
  reFetch,
  reFetchJson,
  selectedPolygon,
  handlePolygonSelect,
  handlePolygonDeselect,
  setHasNullField,
  isReadOnly = false
}) => {  
  const collectedPolygonKeys = new Set();

  const collectPolygonKeys = (polygonKey) => {
    collectedPolygonKeys.add(polygonKey);
  };

  useEffect(() => {
    setPolygonKeys(collectedPolygonKeys);
  }, [json]);

  const saveChange = () => {
    reFetch();
  };

  // const cancelChange = () => {
  //   reFetchJson();
  // };

  // Used to track items has been edited
  const [updateJson, setUpdateJson] = useState(json);
  const [isEditing, setIsEditing] = useState(false);

  // Used to keep tracking the edited polygons
  const [editedPolygons, setEditedPolygons] = useState(new Set());

  const changeHandler = (value) => {
    setIsEditing(true);
    setJsonData(value);
    setUpdateJson(value);
  };

  const onClickHandler = async (updateJson) => {
    const Response = await fetch("/api/saveModified", {
      method: "POST",
      body: JSON.stringify({
        folderName: folderName,
        fileName: fileName,
        data: updateJson,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Response.ok) {
      setIsEditing(false);
      alert("Error");
    } else {
      setIsEditing(false);
      alert("Success");
      saveChange();
    }
  };
  
  // Use Refs to adjust textarea height when loading and to allow scrolling to polygon object
  const textAreaRefs = useRef({});
  const polygonRefs = useRef({});
  const polygonListRef = useRef(null);    

  useEffect(() => {
    Object.keys(json).forEach((item) => {
      const textArea = textAreaRefs.current[item];
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    });
  }, [json]);

  const handleUpdatePolygon = (polygonKey, newValue) => {
    console.log("PolygonKey: "+polygonKey)
    console.log("New Value: "+newValue)
    setEditedPolygons((prev) => new Set(prev).add(polygonKey));

    const updatePolygon = (data, targetKeys) => {
      if (!data || targetKeys.length === 0) return data;

      // Clone the current object
      const updatedData = { ...data };
      
      // Extract key and clean up "Row #" pattern
      const [currentKey, ...remainingKeys] = targetKeys;

      // Update the polygon data if reach the final key
      if (remainingKeys.length === 0) {
        if (Array.isArray(updatedData[currentKey])) {
          updatedData[currentKey] = [
            newValue,
            ...updatedData[currentKey].slice(1,4),  // Keep the remaining of the json data object
            2                                     // Set flag to 2 (edited)
          ];
        }
      } else {
        // Recursion to make function call to handle nested object
        if (
          updatedData[currentKey] !== null && 
          !Array.isArray(updatedData[currentKey]) &&
          typeof updatedData[currentKey] === "object"
        ) {
          updatedData[currentKey] = updatePolygon(
            updatedData[currentKey],
            remainingKeys
          );
        }

      }
      
      return updatedData;
    };

    const keyList = polygonKey.split(" -- ");
    console.log(keyList);
    const updatedData = updatePolygon(json, keyList);
    console.log(updatedData);
    
    changeHandler(updatedData);
  };

  const handleSave = async () => {
    setEditedPolygons(new Set());
    setIsEditing(false);

    await onClickHandler(updateJson);
    window.location.reload();
  };
  
  const handleCancel = () => {
    // setEditedPolygons(new Set());
    // setIsEditing(false);

    // cancelChange();
    window.location.reload();
  };

  useEffect(() => {
    if (clickedPolygon && polygonRefs.current[clickedPolygon] && textAreaRefs.current[clickedPolygon]) {  
      polygonRefs.current[clickedPolygon].scrollIntoView({  
        behavior: "smooth",  
        block: "center",  
        inline: "nearest",  
      });  
  
      // if (polygonListRef.current) {  
      //   polygonListRef.current.scrollTop = polygonRefs.current[clickedPolygon].offsetTop - polygonListRef.current.offsetTop;  
      // }  

      textAreaRefs.current[clickedPolygon].focus();
    } 
  }, [clickedPolygon])
  
  return (
    <>
    {isEditing ? (
      <>
      <button onClick={handleSave} className={styles.saveChange}>Save</button>
      <button onClick={handleCancel} className={styles.cancelChange}>Cancel</button>
      </>
    ) : null}
    
    <h4>Polygon List</h4>
    <div ref={polygonListRef} className={styles.polygonList}>
      {Object.entries(json).map(([key, value]) => {
        return (
          <Polygon
            key={key}
            polygonKey={key}
            polygon={value}
            highlightColor={highlightColor}
            textAreaRefs={textAreaRefs}
            polygonRef={polygonRefs}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
            collectPolygonKey={(polygonKey) => collectPolygonKeys(polygonKey)}
            selectedPolygon={selectedPolygon}
            handlePolygonSelect={handlePolygonSelect}  
            handlePolygonDeselect={handlePolygonDeselect} 
            isReadOnly={isReadOnly}
          />
        )
      })}
    </div>

    <h4>Null Field List</h4>
    <div className={styles.nullFieldList}>
      {Object.entries(json).map(([key, value]) => {
        return (
          <NullField
            key={key}
            polygonKey={key}
            polygon={value}
            textAreaRefs={textAreaRefs}
            polygonRef={polygonRefs}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
            setHasNullField={setHasNullField}
            isReadOnly={isReadOnly}
          />
        )
      })}
    </div>
    </>
  );
};

export default PolygonList;

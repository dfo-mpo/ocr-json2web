"use client";
import styles from "./PolygonList.module.css";
import Polygon from "../components/Polygon";
import { useState, useEffect, useRef } from "react";

const PolygonList = ({
  pageHeight,
  json,
  setJsonData,
  folderName,
  fileName,
  polygonColors,
  reFetch,
  reFetchJson,
}) => {
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  // console.log("pageHeight", pageHeight);

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    } else {
      setNewPageHeight(pageHeight);
    }
  }, [pageHeight]);

  const saveChange = () => {
    reFetch();
  };

  const cancelChange = () => {
    reFetchJson();
  };

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
  
  // Use Ref to adjust textarea height when loading
  const textAreaRefs = useRef({});

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
    setEditedPolygons((prev) => new Set(prev).add(polygonKey));

    const updatePolygon = (data, targetKeys) => {
      const updatedData = { ...data };
      // Handle nested keys
      const [currKey, ...remainingKeys] = targetKeys;
  
      if (!currKey) return updatedData;
  
      if (remainingKeys.length === 0) {
        // For nested keys. Check if key is final.
        if (updatedData[currKey]) {
          updatedData[currKey] = [
            // Update label text to new value 
            newValue,
            // Keep the remaining of the json data object
            ...updatedData[currKey].slice(1),
          ];
        }
      } else {
        // Recursion to handle nested objects
        if (typeof updatedData[currKey][0] === "object" && updatedData[currKey][0] != null) {
          updatedData[currKey][0] = updatePolygon(
            updatedData[currKey][0],
            remainingKeys
          );
        }
      }
      
      return updatedData;
    };

    // Split the nested keys as an array
    const keyList = polygonKey.split(" - ");
    const updatedData = updatePolygon(json, keyList);

    console.log(updatedData);
    
    changeHandler(updatedData);
  };

  const handleSave = () => {
    setEditedPolygons(new Set());
    setIsEditing(false);

    onClickHandler(updateJson);
  };
  
  const handleCancel = () => {
    setEditedPolygons(new Set());
    setIsEditing(false);

    cancelChange();
  };
  
  return (
    <div className={styles.polygonList}>
      {isEditing ? (
        <>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
        </>
      ) : null}

      <h4>Polygon List</h4>
      
      {Object.keys(json).map((key) => {
        const obj = json[key];
        const content = obj[0];
        const coordinates = obj[1];
        const flag = obj[4];
        const color = polygonColors[key];

        return (
          <Polygon
            key={key}
            polygonKey={key}
            content={content}
            coordinates={coordinates}
            flag={flag}
            color={color}
            textAreaRef={(ref) => (textAreaRefs.current[key] = ref)}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
          />
        )
      })}
      
    </div>
  );
};

export default PolygonList;

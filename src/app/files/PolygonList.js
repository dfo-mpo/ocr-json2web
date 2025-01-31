"use client";
import styles from "./PolygonList.module.css";
import Polygon from "../components/Polygon";
import { useState, useEffect, useRef } from "react";

const PolygonList = ({
  fileName,
  folderName,
  json,
  setJsonData,
  polygonKeys,
  setPolygonKeys,
  polygonColors,
  reFetch,
  reFetchJson,
  handlePolygonSelect,
  handlePolygonDeselect
}) => {
  const collectedPolygonKeys = new Set();

  const collectPolygonKeys = (polygonKey) => {
    collectedPolygonKeys.add(polygonKey);
  };

  useEffect(() => {
    setPolygonKeys(collectedPolygonKeys);
  }, [json]);

  useEffect(() => {
    console.log(polygonKeys);
  }, [polygonKeys]);

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
      if (!data || targetKeys.length === 0) return data;

      // Clone the current object
      const updatedData = { ...data };
      
      // Extract key and clean up "Row #" pattern
      const [currentKey, ...remainingKeys] = targetKeys;
      const cleanKey = currentKey.replace(/(Row.*)/, '').trim();

      // Match "Row #" pattern
      const rowMatch = currentKey.match(/Row (\d+)/);
      // Return the index of the row
      const rowIndex = rowMatch ? parseInt(rowMatch[1], 10) - 1 : null;
  
      if (!cleanKey) return updatedData;

      // Update the polygon data if reach the final key
      if (remainingKeys.length === 0) {
        if (updatedData[cleanKey]) {
          updatedData[cleanKey] = [
            newValue,
            ...updatedData[cleanKey].slice(1,4),  // Keep the remaining of the json data object
            2                                     // Set flag to 2 (edited)
          ];
        }
      } else {
        // Recursion to make function call to handle nested object
        if (
          updatedData[cleanKey] &&
          Array.isArray(updatedData[cleanKey]) &&
          rowIndex !== null &&
          typeof updatedData[cleanKey][rowIndex] === "object"
        ) {
          updatedData[cleanKey][rowIndex] = updatePolygon(
            updatedData[cleanKey][rowIndex],
            remainingKeys
          );
        }

      }
      
      return updatedData;
    };

    const keyList = polygonKey.split(" - ");
    const updatedData = updatePolygon(json, keyList);
    
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

      {Object.entries(json).map(([key, value]) => {
        const color = polygonColors[key];

        return (
          <Polygon
            key={key}
            polygonKey={key}
            polygon={value}
            color={color}
            textAreaRef={(ref) => (textAreaRefs.current[key] = ref)}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
            collectPolygonKey={(polygonKey) => collectPolygonKeys(polygonKey)}
            handlePolygonSelect={handlePolygonSelect}  
            handlePolygonDeselect={handlePolygonDeselect} 
          />
        )
      })}
      
    </div>
  );
};

export default PolygonList;

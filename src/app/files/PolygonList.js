"use client";
import styles from "./PolygonList.module.css";
import Polygon from "../components/Polygon";
import { useState, useEffect, useRef } from "react";

/**
 * PolygonList Component
 * 
 * Renders a list of editable polygon fields from parsed OCR JSON data.
 * Also renders a separate list of null polygons.
 * Manages editing, saving, and highlighting of polygons.
 * 
 * @param {string} fileName - Name of the current file being reviewed.
 * @param {string} folderName - Name of the parent folder for the file.
 * @param {object} json - The full parsed data representing all polygons.
 * @param {function} setJsonData - Updates state after user edits a polygon field.
 * @param {function} setPolygonKeys - Callback to report all polygon keys back to parent.
 * @param {string} highlightColor - Color used to visually highlight the selected polygon.
 * @param {string|null} clickedPolygon - Polygon recently clicked in the viewer.
 * @param {function} reFetch - Callback to refresh verification/modification status.
 * @param {function} reFetchJson - Callback to reload the entire data.
 * @param {string|null} selectedPolygon - Polygon key currently selected in the UI.
 * @param {function} handlePolygonSelect - Called when a polygon receives focus.
 * @param {function} handlePolygonDeselect - Called when a polygon loses focus.
 * @param {function} setHasNullField - Callback to notify parent if any null polygons exist.
 * @param {boolean} isReadOnly - Disables editing when true.
 */
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
  // Set used to collect keys of all polygons rendered (for parent sync)
  const collectedPolygonKeys = new Set();

  const collectPolygonKeys = (polygonKey) => {
    collectedPolygonKeys.add(polygonKey);
  };

  // Push polygon keys to parent after JSON is loaded or changed
  useEffect(() => {
    setPolygonKeys(collectedPolygonKeys);
  }, [json]);

  // Calls backend refresh of file
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

  // Handle polygon content change, mark as edited and sync to updateJson
  const changeHandler = (value) => {
    setIsEditing(true);
    setJsonData(value); // Push change to parent
    setUpdateJson(value);
  };

  // Save edits to backend
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
  
  // Use Refs for dynamic height adjustment when loading and to allow scrolling to polygon object
  const textAreaRefs = useRef({});
  const polygonRefs = useRef({});
  const polygonListRef = useRef(null);    

  // Dynamically adjust text area height based on content
  useEffect(() => {
    Object.keys(json).forEach((item) => {
      const textArea = textAreaRefs.current[item];
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    });
  }, [json]);

  // Updates a deeply nested polygon value within a JSON structure using a recursive traversal
  const handleUpdatePolygon = (polygonKey, newValue) => {
    console.log("PolygonKey: "+polygonKey)
    console.log("New Value: "+newValue)

    // Track this polygon key as edited
    setEditedPolygons((prev) => new Set(prev).add(polygonKey));

    /**
     * Recursively traverse nested JSON to reach the target polygon and apply the update.
     *
     * @param {object} data - Current level of the JSON object
     * @param {string[]} targetKeys - Remaining keys to traverse, split from polygonKey
     * @returns {object} A new updated copy of the JSON object
     */
    const updatePolygon = (data, targetKeys) => {
      if (!data || targetKeys.length === 0) return data;

      // Clone the current object
      const updatedData = { ...data };
      
      // Extract keys
      const [currentKey, ...remainingKeys] = targetKeys;

      // Update the polygon data if reach the final key
      if (remainingKeys.length === 0) {
        // Final key reached, apply the value update here
        if (Array.isArray(updatedData[currentKey])) {
          // Replace first element, update flag as edited, and keep rest of metadata
          updatedData[currentKey] = [
            newValue,
            ...updatedData[currentKey].slice(1,4),  // Keep the remaining of the json data object
            2                                       // Set flag to 2 (2 = edited)
          ];
        }
      } else {
        // Still keys remaining, descend deeper if this level is a valid object
        const nextLevel = updatedData[currentKey];
        if (
          nextLevel !== null && 
          !Array.isArray(nextLevel) &&
          typeof nextLevel === "object"
        ) {
          updatedData[currentKey] = updatePolygon(
            nextLevel,
            remainingKeys
          );
        }

      }
      
      return updatedData;
    };

    // Parse the full polygon path into key segments
    const keyList = polygonKey.split(" -- ");
    console.log(keyList);

    // Call recursive update function
    const updatedData = updatePolygon(json, keyList);
    console.log(updatedData);
    
    changeHandler(updatedData);
  };

  // Save button logic
  const handleSave = async () => {
    setEditedPolygons(new Set());
    setIsEditing(false);

    await onClickHandler(updateJson);
    window.location.reload();
  };

  // Cancel button logic
  const handleCancel = () => {
    // setEditedPolygons(new Set());
    // setIsEditing(false);

    // cancelChange();
    window.location.reload();
  };

  // Scroll to polygon and focus on textarea when polygon is clicked
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
          <Polygon
            key={key}
            polygonKey={key}
            polygon={value}
            textAreaRefs={textAreaRefs}
            polygonRef={polygonRefs}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
            setHasNullField={setHasNullField}
            isReadOnly={isReadOnly}
            shouldRenderNull={true}
          />
        )
      })}
    </div>
    </>
  );
};

export default PolygonList;

"use client";
import styles from "./Polygon.module.css";
import EditableField from "./EditableField";
import { useState, useEffect, useRef } from "react";

/**
 * Polygon Component
 * 
 * Recursively renders a single polygon field or nested group of polygons.
 * Handles display, selection, and editing of both valid and null fields.
 * Called by PolygonList for both regular and null-only views.
 *
 * @param {string} polygonKey - Unique key of the polygon.
 * @param {object|array} polygon - The polygon data is either a nested object or a data array with content and coordinates.
 * @param {string} highlightColor - Color used to highlight the selected polygon.
 * @param {object} textAreaRefs - Ref object to manage textarea/select inputs.
 * @param {object} polygonRef - Ref object to scroll to and focus selected polygon. 
 * @param {function} handleUpdatePolygon - Callback to update polygon content in the object.
 * @param {Set<string>} editedPolygons - Set of polygon keys that have been edited by the user.
 * @param {function} collectPolygonKey - Reports valid polygon keys back to the parent.
 * @param {string|null} selectedPolygon - Currently selected polygon key.
 * @param {function} handlePolygonSelect - Called when a polygon field is focused.
 * @param {function} handlePolygonDeselect - Called when a polygon field loses focus.
 * @param {function} setHasNullField - Callback to notify parent if a null polygon is found.
 * @param {boolean} isReadOnly - Disables editing of the field when true.
 * @param {boolean} shouldRenderNull - If true, only renders null polygons for validation purposes.
 */
const Polygon = ({
  polygonKey,
  polygon,
  highlightColor = "",
  textAreaRefs,
  polygonRef,
  handleUpdatePolygon = () => {},
  editedPolygons = new Set(),
  collectPolygonKey = () => {},
  selectedPolygon,
  handlePolygonSelect = () => {},
  handlePolygonDeselect = () => {},
  setHasNullField = () => {},
  isReadOnly = false,
  shouldRenderNull = false 
}) => {  
  const hasSetNull = useRef(false);

  /**
   * Helper function for coordinates validation logic
   * 
   * Checks if the given coordinates object is valid
   * Valid: has all 8 required keys / 4 pairs (x,y)
   * This is used to validate polygon completeness.
   */
  const areCoordinatesValid = (coordinates) => {
    return (
      Array.isArray(coordinates) &&
      typeof coordinates === "object" &&
      ["x1", "y1", "x2", "y2", "x3", "y3", "x4", "y4"].every((requiredKey) =>
        coordinates.some((coord) => coord[requiredKey] != null)
      )
    );
  }; 
  
  /**
   * Recursively renders a polygon field.
   * Handles both nested objects and leaf polygon array nodes.
   * 
   * @param {string} polygonKey - Current key representing the polygon.
   * @param {object|array} polygon - The polygon data can be a nested object or an array containing polygon content.
   * @returns {JSX.Element|null} The rendered polygon element, or null if filtered out.
   */
  const renderPolygon = (polygonKey, polygon) => {
    // Skip special meta fields
    if (polygonKey.toLowerCase() === "verified" || polygonKey.toLowerCase() === "model id") return null;

    // If polygon is a nested object, recurse into its children
    if (typeof polygon === "object" && !Array.isArray(polygon)) {
      return Object.entries(polygon).map(([childKey, childValue]) =>
        renderPolygon(
          `${polygonKey} -- ${childKey}`,
          childValue
        )
      )
    }

    // If polygon is a valid array, render it
    if(Array.isArray(polygon)) {
      const content = polygon[0]; // Primary editable text content
      const coordinates = polygon[1];
      const flag = polygon[4];

      const isCoordValid = areCoordinatesValid(coordinates); // TRUE if coordinates exist and include 4 valid pairs coordinates
      const hasContent = typeof content === "string";  // TRUE if the content field contains a string

      // A polygon is considered "null" if:
      // - it has missing or invalid coordinates (isCoordValid === false), OR
      // - it has no textual content (hasContent === false)
      const isNullField = !isCoordValid || !hasContent;

      /**
       * Determine whether this polygon should be rendered based on null filter
       * shouldRenderNull | isNullField | render?
       * false            | false       | yes, valid polygon rendered in regular list
       * true             | true        | yes, null polygon rendered in null list
       * false            | true        | no, null polygon skipped in regular list
       * true             | false       | no, valid polygon skipped in null list
       */
      if (shouldRenderNull !== isNullField) {
        return null; // Skip rendering
      }
      
      // If rendering null fields and this is null, flag the list contains null
      if (shouldRenderNull) {
        if (!hasSetNull.current) {
          hasSetNull.current = true;
        }
      } else {
        // If rendering regular fields, register this polygon for Iframe overlays
        collectPolygonKey(polygonKey);
      }

      // Render the editable polygon entry
      return (
        <div
          key={polygonKey}
          ref={(ref) => (polygonRef.current[polygonKey] = ref)} 
          className={styles.polygonItem}
          style={{
            borderColor: (selectedPolygon === polygonKey ? highlightColor : ''),
            boxShadow: (selectedPolygon === polygonKey ? `inset 0 0 2px 2px ${highlightColor}` : ''),
          }}
          >
          <div className={styles.labelName}>
            {polygonKey}
          </div>
          <EditableField
            polygonKey={polygonKey}
            content={content ? content : ""}
            flag={flag}
            textAreaRefs={textAreaRefs}
            handleUpdatePolygon={handleUpdatePolygon}
            editedPolygons={editedPolygons}
            highlightColor={highlightColor}
            handleFocus={handlePolygonSelect}  
            handleBlur={handlePolygonDeselect} 
            isReadOnly={isReadOnly}
          />
        </div>
      )
    }

    return null;
  };

  // When null fields are detected in null render mode, notify parent component
  useEffect(() => {
    if (hasSetNull.current) {
      setHasNullField(true);
    }
  }, [setHasNullField]);

  return renderPolygon(polygonKey, polygon);
};

export default Polygon;

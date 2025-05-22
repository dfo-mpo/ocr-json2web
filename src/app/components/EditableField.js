"use client";
import styles from "./EditableField.module.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect, useRef } from "react";

/**
 * EditableField Component
 *
 * Renders either a <textarea> or a <Select> dropdown depending on the content type.
 * Supports editable fields for polygon labels with visual flags, highlighting, and focus management.
 *
 * @param {string} polygonKey - Unique identifier for the polygon field.
 * @param {string} content - Current value of the field.
 * @param {number} flag - Optional visual state (1 = flagged, 2 = edited).
 * @param {object} textAreaRefs - Ref object storing textarea or select DOM nodes by polygon key.
 * @param {function} handleUpdatePolygon - Callback to update polygon value in the parent JSON.
 * @param {Set<string>} editedPolygons - Tracks which polygons have been modified locally.
 * @param {string} highlightColor - Color used for highlighting active fields.
 * @param {function} handleFocus - Function to call on focus (selects polygon).
 * @param {function} handleBlur - Function to call on blur (deselects polygon).
 * @param {boolean} isReadOnly - Disables editing when true.
 */
const EditableField = ({
  polygonKey,
  content,
  flag,
  textAreaRefs,
  handleUpdatePolygon,
  editedPolygons,
  highlightColor,
  handleFocus = () => {},
  handleBlur = () => {},
  isReadOnly
}) => {

  const [contentOld, setContentOld] = useState(content);

  // Determine CSS class based on flag and edit state
  let flagStyle = '';
  switch (flag) {
    case 1:
      flagStyle = editedPolygons.has(polygonKey) ? styles.edited : styles.flagged;
      break;
    case 2:
      flagStyle = styles.edited;
      break;
    default:
      flagStyle = editedPolygons.has(polygonKey) ? styles.edited : '';
      break;
  }
  
  return (
    // If content is a dropdown-like value, render a <Select>
    (content === 'selected' || content === 'unselected')? 
    <Select
      sx={{
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: highlightColor,
          borderWidth: '1px',
        }
        }}
      className={`${styles.dropdown} ${flagStyle}`}
      ref={(ref) => (textAreaRefs.current[polygonKey] = ref)}
      onFocus={()=>{handleFocus(polygonKey);}}  
      onBlur={handleBlur} 
      value={content}
      onChange={(e) => handleUpdatePolygon(polygonKey, e.target.value)}
    >
      <MenuItem value={'unselected'}>unselected</MenuItem>
      <MenuItem value={'selected'}>selected</MenuItem>
    </Select>
    
    :<textarea
      onFocus={()=>{handleFocus(polygonKey);}}  
      onBlur={handleBlur} 
      ref={(ref) => (textAreaRefs.current[polygonKey] = ref)}
      className={`${styles.labelText} ${flagStyle} ${!content ? styles.nullLabelText : ''}`}
      value={content}
      onChange={(e) => handleUpdatePolygon(polygonKey, e.target.value)}
      rows={1}
      readOnly={isReadOnly}
    />
  )
};

export default EditableField;
"use client";
import styles from "./EditableField.module.css";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect, useRef } from "react";

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
    (content === 'selected' || content === 'unselected')? 
    <Select
      sx={{
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: highlightColor,
          borderWidth: '1px',
        },
        '& .MuiNativeSelect-select': {
          height: '28px !important', // ensure the internal select has the correct height
          lineHeight: '28px', // vertically center text if needed
          display: 'flex', // align items centrally
          alignItems: 'center',
        }
        }}
      native  
      tabIndex={0}   // ensure focusability 
      className={`${styles.dropdown} ${flagStyle}`}
      inputRef={(node) => (textAreaRefs.current[polygonKey] = node)}
      onFocus={()=>{handleFocus(polygonKey);}}  
      onBlur={handleBlur} 
      value={content}
      onChange={(e) => handleUpdatePolygon(polygonKey, e.target.value)}
    >
      <option value="unselected">unselected</option>  
      <option value="selected">selected</option>
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

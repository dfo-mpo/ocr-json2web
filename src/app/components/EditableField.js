"use client";
import styles from "./EditableField.module.css";

const EditableField = ({
  polygonKey,
  content,
  flag,
  textAreaRefs,
  handleUpdatePolygon,
  editedPolygons,
  handleFocus = () => {},
  handleBlur = () => {},
  isReadOnly
}) => {

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
    <textarea
      onFocus={()=>{handleFocus(polygonKey);}}  
      onBlur={handleBlur} 
      ref={(ref) => (textAreaRefs.current[polygonKey] = ref)}
      className={`${styles.labelText} ${flagStyle}`}
      value={content}
      onChange={(e) => handleUpdatePolygon(polygonKey, e.target.value)}
      rows={1}
      readOnly={isReadOnly}
    />
  )
};

export default EditableField;

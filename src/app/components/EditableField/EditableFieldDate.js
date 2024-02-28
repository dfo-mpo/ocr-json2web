import React, { useState, useRef, useEffect } from "react";
import styles from "./EditableFieldDate.module.css";

const EditableFieldDate = ({
  index,
  initialMonth = '',
  initialDay = '',
  onMonthChange,
  onDayChange,
  isFlagM,
  isFlagD,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);

  const handleMonthChange = (e) => {
    onMonthChange(index, e.target.value);
  };

  const handleDayChange = (e) => {
    onDayChange(index, e.target.value);
  };

  const monthClass = isFlagM === 1 ? styles.isRed : isFlagM === 2 ? styles.isGreen : '';
  const dayClass = isFlagD === 1 ? styles.isRed : isFlagD === 2 ? styles.isGreen : '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} onDoubleClick={() => setIsEditing(true)} className={styles.fieldContainer}>
      {isEditing ? (
        <>
          <input
            type="text"
            name={`Month-${index}`}
            defaultValue={initialMonth}
            onChange={handleMonthChange}
            className={`${styles.input} ${monthClass}`}
            autoFocus
          />
          <span>/</span>
          <input
            type="text"
            name={`Day-${index}`}
            defaultValue={initialDay}
            onChange={handleDayChange}
            className={`${styles.input} ${dayClass}`}
          />
        </>
      ) : (
        <span>
          <span className={monthClass}>{initialMonth}</span>/
          <span className={dayClass}>{initialDay}</span>
        </span>
      )}
    </div>
  );
};

export default EditableFieldDate;

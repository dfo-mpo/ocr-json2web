import { useEffect, useState, useRef } from "react";
import styles from "./HighlightColorSelector.module.css";

const colors = [
  "#FFDE21", "#FF5733", "#00ff04", "#3357FF",
  "#f61ca6", "#A133FF", "#67dfff", "#F5A623",
];

const HighlightColorSelector = ({ highlightColor, setHighlightColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  return (
    <div className={styles.selectorWrapper} ref={selectorRef}>
      <button
        className={`${styles.selectorButton} ${ isOpen ? styles.open : '' }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Highlight Colour</span>
        <div className={styles.colorBox} style={{ backgroundColor: highlightColor }}/>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {colors.map((color) => (
            <div
              key={color}
              className={styles.dropdownItem}
              style={{ backgroundColor: color }}
              onClick={(e) => {
                setHighlightColor(color);
                setIsOpen(!isOpen);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HighlightColorSelector;

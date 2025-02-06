import { useEffect } from "react";
import styles from "./NullFieldIndicator.module.css";


const NullFieldIndicator = ({ hasNullField }) => {
  if (!hasNullField) return null;

  return (
    <div className={styles.nullFieldIndicator}>
      <span className={styles.indicatorIcon}>⚠️</span>
      <span className={styles.indicatorLabel}>Null Field</span>
    </div>
  );
};

export default NullFieldIndicator;

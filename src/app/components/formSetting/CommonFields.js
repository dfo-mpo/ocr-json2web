import { useState, useRef } from "react";
import styles from "./CommonFields.module.css";

const CommonFields = ({ folderName, onCommonFiled }) => {
  const tableNameRef = useRef();
  const insideTableNameRef = useRef();
  const gridColumnStartRef = useRef();
  const gridColumnEndRef = useRef();
  const gridRowStartRef = useRef();
  const gridRowEndRef = useRef();
  const alignSelfRef = useRef();
  const justifySelfRef = useRef();
  const borderTopRef = useRef();
  const borderBottomRef = useRef();
  const borderLeftRef = useRef();
  const borderRightRef = useRef();
  const [alignSelf, setAlignSelf] = useState("");
  const [justifySelf, setJustifySelf] = useState("");

  const onChange = () => {
    setAlignSelf(alignSelfRef.current.value);
    setJustifySelf(justifySelfRef.current.value);

    onCommonFiled({
      folderName: folderName,
      tableType: "TableTypeComb",
      tableName: tableNameRef.current.value,
      insideTableName: insideTableNameRef.current.value,
      style: {
        display: "grid",
        gridColumnStart: gridColumnStartRef.current.value,
        gridColumnEnd: gridColumnEndRef.current.value,
        gridRowStart: gridRowStartRef.current.value,
        gridRowEnd: gridRowEndRef.current.value,
        alignSelf: alignSelfRef.current.value,
        justifySelf: justifySelfRef.current.value,
      },
      insideStyle: {
        borderTop: borderTopRef.current.value,
        borderBottom: borderBottomRef.current.value,
        borderLeft: borderLeftRef.current.value,
        borderRight: borderRightRef.current.value,
      },
    });
  };

  return (
    <>
      <div className={styles.inputGroup}>
        <label htmlFor="tableName">Table Name</label>
        <input
          id="tableName"
          name="tableName"
          type="text"
          onChange={onChange}
          ref={tableNameRef}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="insideTableName">Inside Table Name</label>
        <input
          id="insideTableName"
          name="insideTableName"
          type="text"
          onChange={onChange}
          ref={insideTableNameRef}
        />
      </div>

      <div className={styles.styleSection}>
        <div className={styles.styleName}>Style</div>
        <div className={styles.inputGroupAll}>
          <div className={styles.inputGroup}>
            <label htmlFor="gridColumnStart">gridColumnStart</label>
            <input
              id="gridColumnStart"
              name="gridColumnStart"
              type="text"
              placeholder="1"
              onChange={onChange}
              ref={gridColumnStartRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridColumnEnd">gridColumnEnd</label>
            <input
              id="gridColumnEnd"
              name="gridColumnEnd"
              type="text"
              placeholder="1"
              onChange={onChange}
              ref={gridColumnEndRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridRowStart">gridRowStart</label>
            <input
              id="gridRowStart"
              name="gridRowStart"
              type="text"
              placeholder="1"
              onChange={onChange}
              ref={gridRowStartRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridRowEnd">gridRowEnd</label>
            <input
              id="gridRowEnd"
              name="gridRowEnd"
              type="text"
              placeholder="1"
              onChange={onChange}
              ref={gridRowEndRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="alignSelf">alignSelf</label>

            <select
              id="alignSelf"
              name="alignSelf"
              value={alignSelf}
              onChange={onChange}
              ref={alignSelfRef}
            >
              <option value=""></option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
              <option value="stretch">stretch</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="justifySelf">justifySelf</label>
            <select
              id="justifySelf"
              name="justifySelf"
              value={justifySelf}
              onChange={onChange}
              ref={justifySelfRef}
            >
              <option value=""></option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
            </select>
          </div>
        </div>
        <div className={styles.styleName}>Inside Style</div>
        <div className={styles.inputGroupAll}>
          <div className={styles.inputGroup}>
            <label htmlFor="borderTop">borderTop</label>
            <input
              id="borderTop"
              name="borderTop"
              type="text"
              placeholder="1px solid black or 0"
              onChange={onChange}
              ref={borderTopRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderBottom">borderBottom</label>
            <input
              id="borderBottom"
              name="borderBottom"
              type="text"
              placeholder="1px solid black or 0"
              onChange={onChange}
              ref={borderBottomRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderLeft">borderLeft</label>
            <input
              id="borderLeft"
              name="borderLeft"
              type="text"
              placeholder="1px solid black or 0"
              onChange={onChange}
              ref={borderLeftRef}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderRight">borderRight</label>
            <input
              id="borderRight"
              name="borderRight"
              type="text"
              placeholder="1px solid black or 0"
              onChange={onChange}
              ref={borderRightRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonFields;

import { useState } from "react";
import styles from "./Table1Form.module.css";

const Table1Form = ({ folderName }) => {
  const [count, setCount] = useState(1);
  const handleRemoveInputGroup = () => {
    // Ensure count doesn't go below 1
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const submitHandler = async (e) => {
    const tableType = e.target.tableType.value;
    const tableName = e.target.tableName.value;
    const gridColumnStart = e.target.gridColumnStart.value;
    const gridColumnEnd = e.target.gridColumnEnd.value;
    const gridRowStart = e.target.gridRowStart.value;
    const gridRowEnd = e.target.gridRowEnd.value;
    const alignSelf = e.target.alignSelf.value;
    const justifySelf = e.target.justifySelf.value;

    const style = {
      gridColumnStart: gridColumnStart,
      gridColumnEnd: gridColumnEnd,
      gridRowStart: gridRowStart,
      gridRowEnd: gridRowEnd,
      alignSelf: alignSelf,
      justifySelf: justifySelf,
    };
    const tableData = [];
    for (let i = 0; i < count; i++) {
      tableData.push({
        fieldName: e.target["fieldName" + i].value,
        key: e.target["key" + i].value,
      });
    }

    const Response = await fetch("/api/saveFormSettingTable", {
      method: "POST",
      body: JSON.stringify({
        folderName: folderName,
        tableType: tableType,
        tableName: tableName,
        style: style,
        tableData: tableData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Response.ok) {
      alert("Error");
    } else {
      alert("Success");
      window.close();
    }
  };

  const handleAddInputGroup = () => {
    setCount(count + 1);
  };

  const tableDataComponen = (i) => {
    return (
      <div className={styles.inputGroupAll}>
        <div className={styles.inputGroup}>
          <label htmlFor={`fieldName${i}`}>fieldName</label>
          <input
            id={`fieldName${i}`}
            name={`fieldName${i}`}
            type="text"
            placeholder=""
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={`key${i}`}>key</label>
          <input id={`key${i}`} name={`key${i}`} type="text" />
        </div>
      </div>
    );
  };
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(e);
      }}
    >
      <div className={styles.title}>Table Type 1 Form</div>
      <input type="hidden" name="tableType" value="TableType1" />
      <div className={styles.inputGroup}>
        <label htmlFor="tableName">Table Name</label>
        <input
          id="tableName"
          name="tableName"
          type="text"
          placeholder="tableName"
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
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridColumnEnd">gridColumnEnd</label>
            <input
              id="gridColumnEnd"
              name="gridColumnEnd"
              type="text"
              placeholder="1"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridRowStart">gridRowStart</label>
            <input
              id="gridRowStart"
              name="gridRowStart"
              type="text"
              placeholder="1"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridRowEnd">gridRowEnd</label>
            <input
              id="gridRowEnd"
              name="gridRowEnd"
              type="text"
              placeholder="1"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="alignSelf">alignSelf</label>

            <select id="alignSelf" name="alignSelf">
              <option value=""></option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
              <option value="stretch">stretch</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="justifySelf">justifySelf</label>
            <select id="justifySelf" name="alignSelf">
              <option value=""></option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.styleSection}>
        <div className={styles.styleName}>Table Data</div>
        <button onClick={handleAddInputGroup} type="button">
          +
        </button>
        {count > 1 && (
          <button onClick={handleRemoveInputGroup} type="button">
            -
          </button>
        )}

        {[...Array(count)].map((_, index) => (
          <div key={index}>{tableDataComponen(index)}</div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.submit}>Submit</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
    </form>
  );
};

export default Table1Form;

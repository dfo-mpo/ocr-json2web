import { useState } from "react";
import styles from "./Table2Form.module.css";

const Table2Form = ({ folderName }) => {
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
    const borderTop = e.target.borderTop.value;
    const borderBottom = e.target.borderBottom.value;
    const borderLeft = e.target.borderLeft.value;
    const borderRight = e.target.borderRight.value;
    const justifySelf = e.target.justifySelf.value;
    const insideTableName = e.target.insideTableName.value;
    const itemName = e.target.itemName.value;

    const style = {
      gridColumnStart: gridColumnStart,
      gridColumnEnd: gridColumnEnd,
      gridRowStart: gridRowStart,
      gridRowEnd: gridRowEnd,
      alignSelf: alignSelf,
      justifySelf: justifySelf,
    };

    const insideStyle = {
      borderTop: borderTop,
      borderBottom: borderBottom,
      borderLeft: borderLeft,
      borderRight: borderRight,
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
        insideTableName: insideTableName,
        itemName: itemName,
        style: style,
        insideStyle: insideStyle,
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

  const tableDataComponent = (i) => {
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
      <div className={styles.title}>Table Type 2 Form</div>
      <input type="hidden" name="tableType" value="TableType2" />
      <div className={styles.inputGroup}>
        <label htmlFor="tableName">Table Name</label>
        <input id="tableName" name="tableName" type="text" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="insideTableName">Inside Table Name</label>
        <input id="insideTableName" name="insideTableName" type="text" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="itemName">Item Name</label>
        <input id="itemName" name="itemName" type="text" />
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
            <select id="justifySelf" name="justifySelf">
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
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderBottom">borderBottom</label>
            <input
              id="borderBottom"
              name="borderBottom"
              type="text"
              placeholder="1px solid black or 0"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderLeft">borderLeft</label>
            <input
              id="borderLeft"
              name="borderLeft"
              type="text"
              placeholder="1px solid black or 0"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderRight">borderRight</label>
            <input
              id="borderRight"
              name="borderRight"
              type="text"
              placeholder="1px solid black or 0"
            />
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
          <div key={index}>{tableDataComponent(index)}</div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.submit}>Submit</button>
        <button
          type="button"
          onClick={() => window.close()}
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Table2Form;

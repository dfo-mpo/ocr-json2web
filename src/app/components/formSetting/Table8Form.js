import { useState } from "react";
import styles from "./Table8Form.module.css";

const Table8Form = ({ folderName }) => {
  const [headerKeyCount, setHeaderKeyCount] = useState(1);

  const [headRowCount, setHeadRowCount] = useState(1);
  const [headerFieldCount, setHeaderFieldCount] = useState([1]);

  const handleAddInputGroup = (rowIndex) => {
    const updatedCounts = [...headerFieldCount];
    updatedCounts[rowIndex] += 1;
    setHeaderFieldCount(updatedCounts);
  };

  const handleRemoveInputGroup = (rowIndex) => {
    const updatedCounts = [...headerFieldCount];
    if (updatedCounts[rowIndex] > 1) {
      updatedCounts[rowIndex] -= 1;
      setHeaderFieldCount(updatedCounts);
    }
  };
  const removeHeaderRow = () => {
    if (headRowCount > 1) {
      setHeadRowCount(headRowCount - 1);
      setHeaderFieldCount(headerFieldCount.slice(0, -1));
    }
  };
  const handlerHeaderRow = () => {
    setHeadRowCount(headRowCount + 1);
    setHeaderFieldCount([...headerFieldCount, 1]);
  };

  const handleAddHeaderKey = () => {
    setHeaderKeyCount(headerKeyCount + 1);
  };
  const handleRemoveHeaderKey = () => {
    if (headerKeyCount > 1) {
      setHeaderKeyCount(headerKeyCount - 1);
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
    const tableHeader = [];
    for (let i = 0; i < headRowCount; i++) {
      const header = [];
      for (let j = 0; j < headerFieldCount[i]; j++) {
        header.push({
          fieldName: e.target[`fieldName${i}-${j}`].value,
          span: {
            colSpan: e.target[`colSpan${i}-${j}`].value,
            rowSpan: e.target[`rowSpan${i}-${j}`].value,
          },
        });
      }
      tableHeader.push(header);
    }
    const headerKey = [];
    for (let i = 0; i < headerKeyCount; i++) {
      headerKey.push({
        key: e.target[`headerKey${i}`].value,
      });
    }

    const submitData = {
      folderName: folderName,
      tableType: tableType,
      tableName: tableName,
      itemName: itemName,
      style: style,
      insideStyle: insideStyle,
      tableHeader: tableHeader,
      tableData: {
        key: headerKey,
      },
    };

    const Response = await fetch("/api/saveFormSettingTable", {
      method: "POST",
      body: JSON.stringify(submitData),
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

  const tableHeaderComponent = (rowIndex) => {
    return [...Array(headerFieldCount[rowIndex])].map((_, index) => (
      <div className={styles.inputGroupAll} key={index}>
        <div className={styles.inputGroup}>
          <label htmlFor={`fieldName${rowIndex}-${index}`}>
            fieldName (Display Name)
          </label>
          <input
            id={`fieldName${rowIndex}-${index}`}
            name={`fieldName${rowIndex}-${index}`}
            type="text"
            placeholder=""
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={`colSpan${rowIndex}-${index}`}>colSpan</label>
          <input
            id={`colSpan${rowIndex}-${index}`}
            name={`colSpan${rowIndex}-${index}`}
            defaultValue={1}
            type="number"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={`rowSpan${rowIndex}-${index}`}>rowSpan</label>
          <input
            id={`rowSpan${rowIndex}-${index}`}
            name={`rowSpan${rowIndex}-${index}`}
            type="number"
            defaultValue={1}
          />
        </div>
      </div>
    ));
  };

  const headerRow = (rowIndex) => {
    return (
      <div className={styles.headerRow}>
        <div className={styles.rowNumber}>Row {rowIndex + 1}</div>
        <button onClick={() => handleAddInputGroup(rowIndex)} type="button">
          +
        </button>
        <button onClick={() => handleRemoveInputGroup(rowIndex)} type="button">
          -
        </button>
        {tableHeaderComponent(rowIndex)}
      </div>
    );
  };

  const tableDataKey = (i) => {
    return (
      <div className={styles.inputGroup}>
        <label htmlFor={`headerKey${i}`}>key (from Json)</label>
        <input id={`headerKey${i}`} name={`headerKey${i}`} type="text" />
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
      <div className={styles.title}>Table Type 8 Form</div>
      <input type="hidden" name="tableType" value="TableType8" />
      <div className={styles.inputGroup}>
        <label htmlFor="tableName">Table Name</label>
        <input id="tableName" name="tableName" type="text" />
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
            <input id="gridColumnStart" name="gridColumnStart" type="number" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridColumnEnd">gridColumnEnd</label>
            <input id="gridColumnEnd" name="gridColumnEnd" type="number" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridRowStart">gridRowStart</label>
            <input id="gridRowStart" name="gridRowStart" type="number" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="gridRowEnd">gridRowEnd</label>
            <input id="gridRowEnd" name="gridRowEnd" type="number" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="alignSelf">alignSelf</label>

            <select id="alignSelf" name="alignSelf">
              <option value="">Default</option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
              <option value="stretch">stretch</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="justifySelf">justifySelf</label>
            <select id="justifySelf" name="justifySelf">
              <option value="">Default</option>
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
            <input id="borderTop" name="borderTop" type="text" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderBottom">borderBottom</label>
            <input id="borderBottom" name="borderBottom" type="text" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderLeft">borderLeft</label>
            <input id="borderLeft" name="borderLeft" type="text" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="borderRight">borderRight</label>
            <input id="borderRight" name="borderRight" type="text" />
          </div>
        </div>
        <div className={styles.insideStyleNote}>
          Note: The default value for inside style is '1px solid black'. Leave
          the fields empty to retain the default value. Enter '0' to remove the
          outer border.{" "}
        </div>
      </div>
      <div className={styles.styleSection}>
        <div className={styles.styleName}>
          Table Header
          <button onClick={handlerHeaderRow} type="button">
            Add Row
          </button>
          <button onClick={removeHeaderRow} type="button">
            Delete Row
          </button>
        </div>
        {[...Array(headRowCount)].map((_, index) => (
          <div key={index}>{headerRow(index)}</div>
        ))}
      </div>

      <div className={styles.tableDataTitle}>Table Data</div>

      <div className={styles.tableDataWrapper}>
        <div className={styles.tableDataSubtitle}>Header Key</div>
        <button onClick={handleAddHeaderKey} type="button">
          +
        </button>

        <button onClick={handleRemoveHeaderKey} type="button">
          -
        </button>

        {[...Array(headerKeyCount)].map((_, index) => (
          <div key={index}>{tableDataKey(index)}</div>
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

export default Table8Form;

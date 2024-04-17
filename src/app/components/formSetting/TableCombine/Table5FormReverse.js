import { useState } from "react";
import styles from "./Table5FormReverse.module.css";
import SaveButton from "./SaveButton";

const Table5FormReverse = ({ onRemove, onSave }) => {
  const [headerKeyCount, setHeaderKeyCount] = useState(1);
  const [columnItemCount, setColumnItemCount] = useState(1);
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

  const handleAddItem = () => {
    setColumnItemCount(columnItemCount + 1);
  };
  const handleRemoveItem = () => {
    if (columnItemCount > 1) {
      setColumnItemCount(columnItemCount - 1);
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

    for (let i = 0; i < headerKeyCount; i++) {
      tableHeader.push({
        fieldName: e.target[`header-fieldName${i}`].value,
        itemName: e.target[`header-itemName${i}`].value,
      });
    }

    const tableData = [];
    for (let i = 0; i < columnItemCount; i++) {
      tableData.push({
        fieldName: e.target[`itemFieldName${i}`].value,
        key: e.target[`key${i}`].value,
      });
    }


    const submitData = {
      tableType: tableType,
      tableName: tableName,
      itemName: itemName,
      style: style,
      insideStyle: insideStyle,
      tableHeader: tableHeader,
      tableData: tableData,
      isSaved: true,
    };
    onSave(submitData);


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

  // const headerRow = (rowIndex) => {
  //   return (
  //     <div className={styles.headerRow}>
  //       <div className={styles.rowNumber}>Row {rowIndex + 1}</div>
  //       <button onClick={() => handleAddInputGroup(rowIndex)} type="button">
  //         +
  //       </button>
  //       <button onClick={() => handleRemoveInputGroup(rowIndex)} type="button">
  //         -
  //       </button>
  //       {tableHeaderComponent(rowIndex)}
  //     </div>
  //   );
  // };
  const tableDataItem = (i) => {
    return (
      <div className={styles.inputGroupAll2}>
        <div className={styles.inputGroup}>
          <label htmlFor={`itemFieldName${i}`}>fieldName (Display Name)</label>
          <input
            id={`itemFieldName${i}`}
            name={`itemFieldName${i}`}
            type="text"
            placeholder=""
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={`key${i}`}>Key (from Json)</label>
          <input id={`key${i}`} name={`key${i}`} type="text" />
        </div>
      </div>
    );
  };

  const tableHeader = (i) => {
    return (
      <div className={styles.inputGroup2}>
        <div>
          <label htmlFor={`header-fieldName${i}`}>Header Name</label>
          <input
            id={`header-fieldName${i}`}
            name={`header-fieldName${i}`}
            type="text"
          />
        </div>
        <div>
          <label htmlFor={`header-itemName${i}`}>Item Name (from Json)</label>
          <input
            id={`header-itemName${i}`}
            name={`header-itemName${i}`}
            type="text"
          />
        </div>
      </div>
    );
  };
  const removeTable = () => {
    onRemove();
  };
  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(e);
      }}
    >
            {onRemove && (
        <button onClick={removeTable} type="button">
          Remove
        </button>
      )}
      <div className={styles.title}>Table Type 5 Reverse Form</div>
      <input type="hidden" name="tableType" value="TableType5_reverse" />
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
      {/* <div className={styles.styleSection}>
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
      </div> */}

      <div className={styles.tableDataTitle}>Table Data</div>

      <div className={styles.tableDataWrapper}>
        <div className={styles.tableDataSubtitle}>Header</div>
        <button onClick={handleAddHeaderKey} type="button">
          +
        </button>

        <button onClick={handleRemoveHeaderKey} type="button">
          -
        </button>

        {[...Array(headerKeyCount)].map((_, index) => (
          <div key={index}>{tableHeader(index)}</div>
        ))}
      </div>
      <div className={styles.tableDataWrapper}>
        <div className={styles.tableDataSubtitle}>Column Item</div>
        <button onClick={handleAddItem} type="button">
          +
        </button>

        <button onClick={handleRemoveItem} type="button">
          -
        </button>

        {/* working here */}
        {[...Array(columnItemCount)].map((_, index) => (
          <div key={index}>{tableDataItem(index)}</div>
        ))}
      </div>
        <SaveButton />
    </form>
  );
};

export default Table5FormReverse;

//hard corded table for month and day, not using for now
import React from "react";
import styles from "./TableType2_1.module.css";
import EditableFieldDate from "../EditableField/EditableFieldDate";

const TableType2_1 = ({ items, formSetting, myStyle, onEdit }) => {
  const { tableName, itemName } = formSetting;


  const handleMonthChange = (index, newMonth) => {
    let updatedItems = [...items[itemName]];
    if (!updatedItems[index]) {
      updatedItems[index] = { Month: "", Day: "" };
    }
  
    updatedItems[index].Month = newMonth;
    onEdit({ ...items, [itemName]: updatedItems });
  };

  const handleDayChange = (index, newDay) => {
    let updatedItems = [...items[itemName]];
    if (!updatedItems[index]) {
      updatedItems[index] = { Month: "", Day: "" };
    }
    updatedItems[index].Day = newDay;
    onEdit({ ...items, [itemName]: updatedItems });
  };

  const itemData = items[itemName] || [];

  return (
    <div style={myStyle}>
      {tableName && <div className={styles.title}>{tableName}</div>}
      <table className={styles.myTable}>
        <tbody>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 3 }).map((_, colIndex) => {
                const cellIndex = rowIndex * 3 + colIndex;
                const dateObject = itemData[cellIndex] || {};
                
                return (
                  <td key={colIndex} className={styles.tableCell}>
                    <EditableFieldDate
                      index={cellIndex}
                      isFlagM=""
                      isFlagD=""
                      initialMonth={dateObject.Month || ""}
                      initialDay={dateObject.Day || ""}
                      onMonthChange={handleMonthChange}
                      onDayChange={handleDayChange}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableType2_1;

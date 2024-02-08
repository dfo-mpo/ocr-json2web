import React from "react";
import styles from "./SpawningTable.module.css";
import TableType1 from "./SpawningTable/TableType1";
import TableType2 from "./SpawningTable/TableType2";
import TableType3 from "./SpawningTable/TableType3";
import TableType4 from "./SpawningTable/TableType4";
const SpawningTable = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";
  const format7e = folderName == "7eresultocr";

  // fomrat 6e and 4c: TableType1
  // format 4h: TableType2
  // format 5a: TableType3

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        SPAWNING RUN TIMING and ESTIMATED NUMBER
      </div>
      {(format6e || format4c) && (
        <TableType1 items={items} folderName={folderName} />
      )}
      {format4h && <TableType2 items={items} folderName={folderName} />}
      {
        format5a && <TableType3 items={items} folderName={folderName} />
      }
      {
        format7e && <TableType4 items={items} folderName={folderName} />

      }
    </div>
  );
};

export default SpawningTable;

import { useState } from "react";
import styles from "./LogPage.module.css";

const LogPage = ({ fileStatus, folderNames }) => {
  const [filterData, setFilterData] = useState(fileStatus);
  const handleChange = (event) => {
    if (event.target.value === "all") {
      setFilterData(fileStatus);
    } else {
      const filteredData = fileStatus.filter((item) => {
        return item.folderName === event.target.value;
      });
      setFilterData(filteredData);
    }
  };

  return (
    <div>
      <div>
        <h3>File Status Log</h3>
      </div>
      <div className={styles.selectContainer}>
        <select className={styles.select} onChange={handleChange}>
          <option value="all">All</option>
          {folderNames.map((folderName) => {
            return (
              <option key={folderName} value={folderName}>
                {folderName}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.container}>
        {filterData.map((item, index) => {
          return (
            <div key={index} className={styles.logContainer}>
              <div>
                {item.verified && <div>Verified</div>}
                {item.error && <div>Error</div>}
                {item.modified && <div>Modified</div>}
              </div>
              <div>{item.folderName}</div>
              <div>{item.fileName}</div>
              <div>
                {item.errorInfo.map((errorInfo, index) => {
                  return (
                    <div key={index} className={styles.errorInfo}>
                      <div>Error Description: {errorInfo.errorDescription}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogPage;

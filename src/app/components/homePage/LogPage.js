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

  const handleChange2 = (event) => {
    if (event.target.value === "all") {
      setFilterData(fileStatus);
    } else {
      const filteredData = filterData.filter((item) => {
       const value = event.target.value 
        console.log(item[value]);
        return item.value
      });
      setFilterData(filteredData);
    }
  }
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
        <div className={styles.selectContainer}>
          <select className={styles.select} onChange={handleChange2}>
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="error">Error</option>
          </select>
        </div>
        {filterData.map((item, index) => {
          return (
            <div key={index} className={styles.logContainer}>
              {item.verified ? (
                <div className={styles.verified}>Verified</div>
              ) : (
                <div className={styles.notVerified}>Error</div>
              )}
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

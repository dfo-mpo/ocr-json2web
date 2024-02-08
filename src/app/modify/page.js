import React from "react";
import fs from "fs/promises";
import styles from "./page.module.css";
import ModifyForm from "./ModifyForm";

const page = async ({ searchParams }) => {
  const { folderName, fileName } = searchParams;
  try {
    const filePath =
      process.cwd() + `/src/app/bc16Data/${folderName}/${fileName}`;
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    return (
      <div className={styles.container}>
        <div className={styles.fileName}>File Name: {fileName}</div>
        <ModifyForm jsonData={jsonData} folderName ={folderName} fileName={fileName} />
        <div className={styles.note}>Note: Any changes made here are saved to the storage blob and will not reflect in the web application.</div>
        
      </div>
    );
  } catch (error) {
    return <div>error</div>;
  }
};
export default page;

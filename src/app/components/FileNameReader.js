import { promises as fs } from "fs";
import path from "path";
import FileNameList from "./FileNameList";
import Link from "next/link";
import styles from "./FileNameReader.module.css";
const FileNameReader = async () => {
  try {
    // Define the path to the target folder
    const folderPath = process.cwd() + "/src/app/bc16Data/";
    // Read all folder names within the target directory
    const folderNames = await fs.readdir(folderPath);
    // Array to hold file details grouped by folder
    const filesByFolder = [];
    // Iterate through each folder to gather file details
    for (const folderName of folderNames) {
      // Construct the full path to the current folder
      const directoryPath = path.join(folderPath, folderName);
      // Read all file names within the current folder
      const files = await fs.readdir(directoryPath);
      // Add file details to the array
      filesByFolder.push(
        ...files.map((fileName) => ({
          folderName: folderName,
          fileName: fileName,
        }))
      );
    }

    // Sort the array of file details by file name
    filesByFolder.sort((a, b) => a.fileName.localeCompare(b.fileName));
    // Return the component with the list of file details
    return (
      <>
        <FileNameList filesByFolder={filesByFolder} />
        <div className={styles.errorLink}>
          <Link
            href={{
              pathname: "/errorlog/",
              query: { folderNames: JSON.stringify(folderNames) },
            }}
          >
            Error Log
          </Link>
        </div>
      </>
    );
  } catch (error) {
    // Log and throw any errors encountered
    console.error("Error reading file names:", error);
    throw error;
  }
};

export default FileNameReader;

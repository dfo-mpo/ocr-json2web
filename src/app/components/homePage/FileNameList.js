"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import verified from "../../../../public/images/verified.svg";
import error from "../../../../public/images/error.svg";
import modifiedIcon from "../../../../public/images/modified.svg";
import Link from "next/link";
import FileSearch from "./FileSearch";
import styles from "./FileNameList.module.css";

const FileNameList = ({ filesByFolder, fileStatus }) => {
  const [fileSearch, setFileSearch] = useState(filesByFolder);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileStatusJson, setFileStatusJson] = useState([]);
  const pageSize = 25;
  const totalPages = Math.ceil(fileSearch.length / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const [newfilesByFolder, setNewfilesByFolder] = useState(filesByFolder);
  const [isReload, setIsReload] = useState(false);
  const [searchParams, setSearchParams] = useState({
    keyword: "",

    folder: "",
  });

  // Extract unique folder names
  const uniqueFolderNames = [
    ...new Set(filesByFolder.map((item) => item.folderName)),
  ];

  //fetching the firle status
  const asyncFetch = async () => {
    setIsReload(true);
    const Response = await fetch("/api/fileStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uniqueFolderNames),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
      setIsReload(false);
    } else {
      const reader = Response.body.getReader();
      const readData = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            // `value` contains the chunk of data as a Uint8Array
            const jsonString = new TextDecoder().decode(value);
            // Parse the JSON string into an object
            const dataObject = JSON.parse(jsonString);
            fileStatus(dataObject);
            setFileStatusJson(dataObject);
            setIsReload(false);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when done
        }
      };

      readData();
    }
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    // Create a map from fileStatusJson for efficient lookup based on fileName
    const verifiedMap = new Map(
      fileStatusJson.map(({ fileName, verified, error, modified }) => [
        fileName,
        { verified, error, modified },
      ])
    );

    // Iterate over filesByFolder and inject 'verified' and 'error' properties if matching fileName is found
    const updatedFilesByFolder = filesByFolder.map((file) => {
      const values = verifiedMap.get(file.fileName);
      return values ? { ...file, ...values } : file;
    });
    setNewfilesByFolder(updatedFilesByFolder);
    setFileSearch(updatedFilesByFolder);
    onSearchHandler2(searchParams, updatedFilesByFolder);
  }, [fileStatusJson]);

  const currentPageFiles = fileSearch.slice(startIndex, endIndex);

  const onSearchHandler = (searchResults) => {
    const { keyword, folder } = searchResults;
    setSearchParams(searchResults);

    let filteredFiles = newfilesByFolder;

    if (keyword !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileName
          .replace(/_/g, " ")
          .toLowerCase()
          .includes(keyword.toLowerCase())
      );
    }

    if (folder !== "") {
      filteredFiles = filteredFiles.filter(
        (file) => file.folderName === folder
      );
    }

    setFileSearch(filteredFiles);
    setPageNumber(1);
  };
//onSearchHandler2 is when the click reload button, the search result will be still the same
  const onSearchHandler2 = (searchResults, newdata) => {
    const { keyword, folder } = searchResults;
    setSearchParams(searchResults);

    let filteredFiles = newdata;

    if (keyword !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileName
          .replace(/_/g, " ")
          .toLowerCase()
          .includes(keyword.toLowerCase())
      );
    }

    if (folder !== "") {
      filteredFiles = filteredFiles.filter(
        (file) => file.folderName === folder
      );
    }

    setFileSearch(filteredFiles);
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleGoToPage = () => {
    const inputPageNumber = parseInt(
      document.getElementById("pageNumberInput").value
    );
    if (inputPageNumber >= 1 && inputPageNumber <= totalPages) {
      setPageNumber(inputPageNumber);
    }
  };
  return (
    <div className={styles.container}>
      <FileSearch folderName={uniqueFolderNames} onSearch={onSearchHandler} />

      <div className={styles.listWrapper}>
        <div className={styles.reloadBtnWrapper}>
          <button className={styles.reloadBtn} onClick={asyncFetch}>
            {isReload ? "Loading" : "Reload"}
          </button>
        </div>
        {currentPageFiles?.length === 0 && (
          <div className={styles.noFiles}>No files found!</div>
        )}

        {currentPageFiles.map((file, index) => (
          <div key={index}>
            <Link
              className={styles.linkStyle}
              rel="noopener noreferrer"
              target="_blank"
              href={{
                pathname: "/files/",
                query: {
                  folderName: file.folderName,
                  fileName: file.fileName,
                },
              }}
            >
              {file.fileName.replace(/_/g, " ").replace(".json", "")}
              {file.verified && (
                <Image src={verified} alt="verified" height={25} width={25} />
              )}
              {file.error && (
                <Image src={error} alt="error" height={17} width={17} />
              )}
              {file.modified && (
                <Image
                  src={modifiedIcon}
                  alt="modified"
                  height={23}
                  width={23}
                />
              )}
            </Link>
          </div>
        ))}
        <div className={styles.pagination}>
          <div className={styles.prevNext}>
            <button onClick={handlePrevPage} disabled={pageNumber === 1}>
              Prev
            </button>
            <span>{`${pageNumber} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={pageNumber === totalPages}
            >
              Next
            </button>
          </div>
          <div>
            <input
              type="number"
              id="pageNumberInput"
              min="1"
              max={totalPages}
              placeholder="Page"
            />
            <button className={styles["go-btn"]} onClick={handleGoToPage}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileNameList;

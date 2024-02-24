"use client";
import React, { useState, useRef } from "react";
import styles from "./FileSearch.module.css";

function FileSearch(props) {
  const [searchResults, setSearchResults] = useState({
    keyword: "",
    folder: "",
  });

  const folderName = props.folderName.sort();

  const keywordRef = useRef(null);

  const folderRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setSearchResults({
      ...searchResults,
      [name]: trimmedValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(searchResults);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setSearchResults({
      keyword: "",
      folder: "",
    });

    // Clear input values or select options

    keywordRef.current.value = "";

    folderRef.current.value = "";

    props.onSearch({
      keyword: "",

      folder: "",
    });
  };

  return (
    <div className={styles.allWrapper}>
      <div className={styles.wrapper}>
        <label htmlFor="keyword">Keyword</label>
        <input
          name="keyword"
          onChange={handleChange}
          id="keyword"
          type="text"
          placeholder="Search by keyword"
          ref={keywordRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // Check if Enter key is pressed
              event.preventDefault(); // Prevent default form submission
              handleSubmit(event); // Call the search function
            }
          }}
        />
        <label htmlFor="folder">Folder</label>
        <select
          id="folder"
          name="folder"
          onChange={handleChange}
          ref={folderRef}
        >
          <option defaultValue value="">
            All
          </option>
          {folderName.map((folderName, index) => {
            return (
              <option key={index} value={folderName}>
                {folderName}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.search} onClick={handleSubmit}>
          Search
        </button>
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default FileSearch;

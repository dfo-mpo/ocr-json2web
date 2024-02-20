"use client";
import React, { useState, useRef } from "react";
import styles from "./FileSearch.module.css";

function FileSearch(props) {
  const [searchResults, setSearchResults] = useState({
    area: "",
    waterbody: "",
    year: "",
    format: "",
  });

  const folderName = props.folderName.sort();

  const areas = props.areas;
  areas.sort((a, b) => {
    const numA = parseInt(a.split("_")[1]);
    const numB = parseInt(b.split("_")[1]);
    return numA - numB;
  });

  const areaRef = useRef(null);
  const waterbodyRef = useRef(null);
  const yearRef = useRef(null);
  const formatRef = useRef(null);

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
      area: "",
      waterbody: "",
      year: "",
      format: "",
    });

    // Clear input values or select options
    areaRef.current.value = "";
    waterbodyRef.current.value = "";
    yearRef.current.value = "";
    formatRef.current.value = "";

    props.onSearch({
      area: "",
      waterbody: "",
      year: "",
      format: "",
    });
  };

  return (
    <div className={styles.allWrapper}>
      <div className={styles.wrapper}>
        <label htmlFor="area">Area</label>
        <select id="area" name="area" onChange={handleChange} ref={areaRef}>
          <option defaultValue value="">
            All
          </option>
          {areas.map((area, index) => {
            return (
              <option key={index} value={area.toLowerCase()}>
                {area.replace(/_/g, " ")}
              </option>
            );
          })}
        </select>
        <label htmlFor="waterbody">Waterbody</label>
        <input
          name="waterbody"
          onChange={handleChange}
          id="waterbody"
          type="text"
          placeholder="Search Name"
          ref={waterbodyRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // Check if Enter key is pressed
              event.preventDefault(); // Prevent default form submission
              handleSubmit(event); // Call the search function
            }
          }}
        />
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          onChange={handleChange}
          type="number"
          placeholder="1990"
          ref={yearRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // Check if Enter key is pressed
              event.preventDefault(); // Prevent default form submission
              handleSubmit(event); // Call the search function
            }
          }}
        />
        <label htmlFor="format">Format</label>
        <select
          id="format"
          name="format"
          onChange={handleChange}
          ref={formatRef}
        >
          <option defaultValue value="">
            All
          </option>
          {/* <option value="Format_4C">4C</option>
          <option value="Format_4H">4H</option>
          <option value="Format_5A">5A</option>
          <option value="Format_6E">6E</option>
          <option value="Format_7E">7E</option> */}

          {folderName.map((folderName, index) => {
            return (
              <option
                key={index}
                value={`Format_${folderName.substring(0, 2).toUpperCase()}`}
              >
                {folderName.substring(0, 2).toUpperCase()}
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

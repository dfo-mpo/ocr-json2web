import React from "react";
import styles from "./TableType1.module.css";
import EditableField from "../EditableField/EditableField";
import { useContext, useState, useEffect, useRef } from "react";
import modifyContext from "../../../../state/modify-context";

//for 6E and 4C
const TableType1 = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";

  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;

  // copy the itemCtx to myItem
  let myItem = { ...itemCtx };

  const handleChange = (event) => {
    const speciesName = event.target.getAttribute("speciesname");

    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const speciesObj = {
      [speciesName]: {},
    };
    // if the species does not exist in the item, add it
    if (!myItem["Spawning run timing and estimated number"][speciesName]) {
      myItem["Spawning run timing and estimated number"] = {
        ...myItem["Spawning run timing and estimated number"],
        ...speciesObj,
      };
    }
    // add the field and value to the species
    myItem["Spawning run timing and estimated number"][speciesName][fieldName] =
      [fieldValue, 2];
    // update the global item
    updateItem(myItem);
  };
  const renderTable = (item) => {
    const species = itemCtx["Spawning run timing and estimated number"]?.[item];
    if (species) {
      return (
        <>
          <>
            <td
              className={`${
                species["Arrival month"] && species["Arrival month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Arrival month"
                fieldValue={
                  species["Arrival month"] ? species["Arrival month"][0] : ""
                }
                isRed={species["Arrival month"] && species["Arrival month"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Arrival day"] && species["Arrival day"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Arrival day"
                fieldValue={
                  species["Arrival day"] ? species["Arrival day"][0] : ""
                }
                isRed={species["Arrival day"] && species["Arrival day"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Start month"] && species["Start month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Start month"
                fieldValue={
                  species["Start month"] ? species["Start month"][0] : ""
                }
                isRed={species["Start month"] && species["Start month"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Start day"] && species["Start day"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Start day"
                fieldValue={
                  species["Start day"] ? species["Start day"][0] : ""
                }
                isRed={species["Start day"] && species["Start day"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Peak month"] && species["Peak month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Peak month"
                fieldValue={
                  species["Peak month"] ? species["Peak month"][0] : ""
                }
                isRed={species["Peak month"] && species["Peak month"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Peak day"] && species["Peak day"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Peak day"
                fieldValue={species["Peak day"] ? species["Peak day"][0] : ""}
                isRed={species["Peak day"] && species["Peak day"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["End month"] && species["End month"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="End month"
                fieldValue={species["End month"] ? species["End month"][0] : ""}
                isRed={species["End month"] && species["End month"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["End day"] && species["End day"][1] ? "" : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="End day"
                fieldValue={species["End day"] ? species["End day"][0] : ""}
                isRed={species["End day"] && species["End day"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["No. of observer"] && species["No. of observer"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="No. of observer"
                fieldValue={
                  species["No. of observer"]
                    ? species["No. of observer"][0]
                    : ""
                }
                isRed={
                  species["No. of observer"] && species["No. of observer"][1]
                }
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Method"] && species["Method"][1] ? "" : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Method"
                fieldValue={species["Method"] ? species["Method"][0] : ""}
                isRed={species["Method"] && species["Method"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Reliability"] && species["Reliability"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Reliability"
                fieldValue={
                  species["Reliability"] ? species["Reliability"][0] : ""
                }
                isRed={species["Reliability"] && species["Reliability"][1]}
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Estimated total No. on grounds"] &&
                species["Estimated total No. on grounds"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Estimated total No. on grounds"
                fieldValue={
                  species["Estimated total No. on grounds"]
                    ? species["Estimated total No. on grounds"][0]
                    : ""
                }
                isRed={
                  species["Estimated total No. on grounds"] &&
                  species["Estimated total No. on grounds"][1]
                }
                handleChange={handleChange}
              />
            </td>
            <td
              className={`${
                species["Optimum escapement"] &&
                species["Optimum escapement"][1]
                  ? ""
                  : styles.isRed
              }`}
            >
              <EditableField
                speciesName={item}
                fieldName="Optimum escapement"
                fieldValue={
                  species["Optimum escapement"]
                    ? species["Optimum escapement"][0]
                    : ""
                }
                isRed={
                  species["Optimum escapement"] &&
                  species["Optimum escapement"][1]
                }
                handleChange={handleChange}
              />
            </td>
          </>
        </>
      );
    } else {
      return (
        <>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Arrival month"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Arrival day"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Start month"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Start day"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Peak month"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Peak day"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="End month"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="End day"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="No. of observer"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Method"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Reliability"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Estimated total No. on grounds"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
          <td>
            <EditableField
              speciesName={item}
              fieldName="Optimum escapement"
              fieldValue={""}
              isRed={2}
              handleChange={handleChange}
            />
          </td>
        </>
      );
    }
  };

  return (
    <table className={styles.myTable}>
      <tbody>
        <tr className={styles.tableHeader}>
          <td rowSpan={2}>
            (1) <br />
            SPECIES
          </td>
          <td colSpan="2">
            (2) <br />
            ARRIVAL IN STREAM
          </td>
          <td colSpan="6">
            <div>
              (3) <br />
              DATES of SPAWNING{" "}
            </div>
            <div className={styles.columThree}>
              <span>START</span>
              <span>PEAK</span>
              <span>END</span>
            </div>
          </td>
          <td rowSpan={2}>
            (4) <br /> # of OBS.
          </td>
          <td rowSpan={2}>
            (5) <br /> MTH
          </td>
          <td rowSpan={2}>
            (6) <br /> REL.
          </td>
          <td rowSpan={2}>
            (7) <br />
            TOT. ON GROUNDS
          </td>
          <td rowSpan={2}>
            (8) <br />
            TARGET ESCAPE.
          </td>
        </tr>
        <tr className={styles.secondRow}>
          <td>mth.</td>
          <td>day</td>
          <td>mth.</td>
          <td>day</td>
          <td>mth.</td>
          <td>day</td>
          <td>mth.</td>
          <td>day</td>
        </tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            SOCKEYE 1
            <br />2
          </td>
          {renderTable("Sockeye 1")}
        </tr>
        <tr>{renderTable("Sockeye 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            COHO 1 <br />2
          </td>
          {renderTable("Coho 1")}
        </tr>
        <tr>{renderTable("Coho 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            PINK 1
            <br />2
          </td>
          {renderTable("Pink 1")}
        </tr>
        <tr>{renderTable("Pink 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            CHUM 1
            <br />2
          </td>
          {renderTable("Chum 1")}
        </tr>
        <tr>{renderTable("Chum 2")}</tr>
        <tr>
          <td rowSpan={2} className={styles.colOne}>
            CHINOOK 1
            <br />2
          </td>
          {renderTable("Chinook 1")}
        </tr>
        <tr>{renderTable("Chinook 2")}</tr>
      </tbody>
    </table>
  );
};

export default TableType1;

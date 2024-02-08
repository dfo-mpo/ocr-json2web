import React from "react";
import styles from "./Area.module.css";
const Area = ({ items, folderName }) => {
  const format7e = folderName == "7eresultocr";
  const year = items["Year"] || items["year"];

  const districtNo =
    //4C, 4H: District No.
    //5A, 7E: District
    //6E: District number
    items["District No."] || items["District"] || items["District number"];

  const subdistrictNo =
    //4C, 4H: Subdistrict No.
    //5A : Subdistrict
    //6E: Subdistrict number
    //7E: none
    items["Subdistrict No."] ||
    items["Subdistrict"] ||
    items["Subdistrict number"];

  const subdistrictName =
    //4C, 4H: Subdistrict Name
    //5A: Subd. name
    //6E: Subdistrict name
    //7E: Sub (subdistrictNo, Name)
    items["Subdistrict Name"] ||
    items["Subd. name"] ||
    items["Subdistrict name"] ||
    items["Sub"];

  const StatisticalArea =
    //4C, 4H, 6E: Statistical Area
    //5A: Subarea
    //7E: area
    items["Statistical Area"] || items["Subarea"] || items["Area"];

  return (
    <div>
      <table className={styles.myTable}>
        <tbody>
          <tr>
            <td>Year:</td>
            <td>{year}</td>
          </tr>
          <tr>
            <td>District Number:</td>
            <td>{districtNo}</td>
          </tr>

          <tr>
            <td>Statistical Area:</td>
            <td>{StatisticalArea}</td>
          </tr>
          {format7e ? (
            <tr>
              <td> Sub:</td>
              <td>{subdistrictName}</td>
            </tr>
          ) : (
            <>
              <tr>
                <td>Subdistrict Number:</td>
                <td>{subdistrictNo}</td>
              </tr>
              <tr>
                <td>Subdistrict Name:</td>
                <td>{subdistrictName}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Area;

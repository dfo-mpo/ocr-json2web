import React from "react";
import styles from "./Area.module.css";
import { useContext } from "react";
import modifyContext from "../../../state/modify-context";
import EditableField from "./EditableField/EditableField";
const Area = ({ items, folderName }) => {
  const format7e = folderName == "7eresultocr";

  const modifyCtx = useContext(modifyContext);
  const updateItem = modifyCtx.updateItem;
  const itemCtx = modifyCtx.item;
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

  const handleChange = (event) => {
    updateItem(() => {
      return {
        ...itemCtx,
        [event.target.name]: [event.target.value, 2],
      };
    });
  };
  return (
    <div>
      <table className={styles.myTable}>
        <tbody>
          <tr>
            <td>Year:</td>
            <td>
              <EditableField
                fieldName="Year"
                fieldValue={year[0]}
                isRed={year[1]}
                handleChange={handleChange}
              />
            </td>

            {/* <td>{year}</td> */}
          </tr>
          <tr>
            <td>District Number:</td>
            <td>
              <EditableField
                fieldName="District No."
                fieldValue={districtNo[0]}
                isRed={districtNo[1]}
                handleChange={handleChange}
              />
            </td>
            {/* <td>{districtNo}</td> */}
          </tr>

          <tr>
            <td>Statistical Area:</td>
            <td>
            <EditableField
              fieldName="Statistical Area"
              fieldValue={StatisticalArea[0]}
              isRed={StatisticalArea[1]}
              handleChange={handleChange}
            />
            </td>
            {/* <td>{StatisticalArea}</td> */}
          </tr>

          <>
            <tr>
              <td>Subdistrict Number:</td>
              <td>
              <EditableField
                fieldName="Subdistrict No."
                fieldValue={subdistrictNo[0]}
                isRed={subdistrictNo[1]}
                handleChange={handleChange}
              />
              </td>
              {/* <td>{subdistrictNo}</td> */}
            </tr>
            <tr>
              <td>Subdistrict Name:</td>
              <td>
                <EditableField
                  fieldName="Subdistrict Name"
                  fieldValue={subdistrictName[0]}
                  isRed={subdistrictName[1]}
                  handleChange={handleChange}
                />
              </td>
              {/* <td>{subdistrictName}</td> */}
            </tr>
          </>
        </tbody>
      </table>
    </div>
  );
};

export default Area;

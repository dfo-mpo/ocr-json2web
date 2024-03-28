"use client";
import React, { useState } from "react";
import TitleForm from "../components/formSetting/TitleForm";
import Table1Form from "../components/formSetting/Table1Form";
import Table2Form from "../components/formSetting/Table2Form";
import Table3Form from "../components/formSetting/Table3Form";
const formSetting = ({ searchParams }) => {
  const { folderName } = searchParams;
  const [tableType, setTableType] = useState("");
  const changeHandler = (e) => {
    setTableType(e.target.value);
    console.log(tableType);
  };

  let form = null;
  if (tableType === "Title") {
    form = <TitleForm />;
  } else if (tableType === "TableType1") {
    form = <Table1Form folderName={folderName} />;
  } else if (tableType === "TableType2") {
    form = <Table2Form folderName={folderName} />;
  } else if (tableType === "TableType3") {
    form = <Table3Form folderName={folderName} />;
  }

  return (
    <>
      <div>{folderName}</div>
      <select onChange={changeHandler}>
        <option value="">Chose One</option>
        <option value="Title">Title</option>
        <option value="TableType1">Table type1</option>
        <option value="TableType2">Table type2</option>
        <option value="TableType3">Table type3</option>
        <option value="TableType4">Table type4</option>
        <option value="TableType5">Table type5</option>
        <option value="TableType6">Table type6</option>
        <option value="TableType7">Table type7</option>
        <option value="TableType8">Table type8</option>
        <option value="TableTypeComb">Table combine</option>
      </select>
      {form}
    </>
  );
};

export default formSetting;

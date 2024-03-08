"use client";
import Form from "./Form";
import { useState, useEffect, use } from "react";
import styles from "./FormRender.module.css";
//TODO: remove import formSetting from "../formSetting.json"
// import formSetting from "../formSetting.json";
//TODO: add formSetting as a prop
const FormRender = ({ items, folderName, fileName, reFetch, reFetchJson,formSetting}) => {
  const saveChange = () => {
    reFetch();
  };

  const cancelChange = () => {
    reFetchJson();
  };

  return (
    <Form
      folderName={folderName}
      formSetting={formSetting}
      fileName={fileName}
      items={items}
      saveChange={saveChange}
      cancelChange={cancelChange}
    /> 
  );
};

export default FormRender;

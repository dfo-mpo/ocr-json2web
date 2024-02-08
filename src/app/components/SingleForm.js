"use client";

import StreamID from "./SingleFormPart/StreamID";
import styles from "./SingleForm.module.css";
import Area from "./SingleFormPart/Area";
import Dates from "./SingleFormPart/Dates";
import SpawningTable from "./SingleFormPart/SpawningTable";
import UnusualCon from "./SingleFormPart/UnusualCon";
import AdditionalCmt from "./SingleFormPart/AdditionalCmt";
import Signature from "./SingleFormPart/Signature";
import Note4h from "./SingleFormPart/Note4h";
import { useState } from "react";
import Link from "next/link";
import Recomm from "./SingleFormPart/7eFormPart/Recomm";
import BioDetails from "./SingleFormPart/7eFormPart/BioDetails";
import TeForm from "./SingleFormPart/teFormat/TeForm";
import { ModifyContextProvider } from "../state/modify-context";

const SingleForm = ({ items, folderName, fileName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";

  const format5a = folderName == "5aresultocr";
  const format7e = folderName == "7eresultocr";

  /* delete this once is Tan reviewed */
  const formatTe = folderName == "teresultocr"; //TODO: delete this once is Tan reviewed

  return (
    <div className={styles.container}>
      <Link
        className={styles.linkStyle}
        rel="noopener noreferrer"
        target="_blank"
        href={{
          pathname: "/modify/",
          query: {
            folderName: folderName,
            fileName: fileName,
          },
        }}
      >
        Modify
      </Link>
      <div className={styles.header}>
        <div className={styles.header1}>DEPARTMENT OF FISHERIES AND OCEANS</div>
        <div className={styles.header2}>
          ANNUAL REPORT OF SALMON STREAMS AND SPAWNING POPULATION
        </div>
      </div>

      {formatTe && (
        <ModifyContextProvider>
          <TeForm items={items} folderName={folderName} fileName ={fileName}/>
        </ModifyContextProvider>
      )}
      {/* //TODO: delete this once is Tan reviewed */}
      {!formatTe && ( //TODO: delete this once is Tan reviewed
        <>
          <div className={styles.headerBox}>
            <div className={styles.streamID}>
              <StreamID folderName={folderName} items={items} />
            </div>
            <div className={styles.areaDates}>
              <Area items={items} folderName={folderName} />
              <Dates items={items} folderName={folderName} />
            </div>
          </div>
          <SpawningTable items={items} folderName={folderName} />
          {(format4c || format6e || format7e) && (
            <UnusualCon items={items} folderName={folderName} />
          )}
          {format7e && <Recomm items={items} folderName={folderName} />}
          {format7e && <BioDetails items={items} folderName={folderName} />}
          {!format7e && <AdditionalCmt items={items} folderName={folderName} />}
          <Signature items={items} folderName={folderName} />
          {format4h && <Note4h />}
        </>
      )}
    </div>
  );
};

export default SingleForm;

"use client";
import { useState } from "react";
import styles from "./Iframe.module.css";
const Iframe = ({ pdfFolderName, fileName }) => {
const [showPdf, setShowPdf] = useState(true);
//TODO: This component is not used. It is replaced by Iframe.js. Remove it.

  const format7e = pdfFolderName == "7etest";
  const url = pdfFolderName
    ? `https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
        ".json",
        ".pdf"
      )}`
    : "https://bc16teststorage.blob.core.windows.net/4ctest/BC16-000300_Area_14N_Black_Creek_1991_Format_4C.pdf";  

  return (
    <>
      <button
        className={styles.showButton}
        onClick={() => setShowPdf(!showPdf)}
      >
        {showPdf ? "Hide PDF" : "Show PDF"}
      </button>
      {showPdf && (
        <iframe className={styles[iframeStyle]} src={url}>
          This browser does not support PDFs. Please download the PDF to view
          it.
        </iframe>
      )}
    </>
  );
};

export default Iframe;

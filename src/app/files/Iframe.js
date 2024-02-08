"use client";
import { useState } from "react";
import styles from "./Iframe.module.css";
const Iframe = ({ pdfFolderName, fileName }) => {
  const [showPdf, setShowPdf] = useState(true);

  const format7e = pdfFolderName == "7etest";
 //change it back to :
//  const url = `https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(".json",".pdf")}` //FIXME: change it back to this once is Tan reviewed
  const url = pdfFolderName
    ? `https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
        ".json",
        ".pdf"
      )}`
    : "https://bc16teststorage.blob.core.windows.net/4ctest/BC16-000300_Area_14N_Black_Creek_1991_Format_4C.pdf";  //TODO: delete this once is Tan reviewed
  const iframeStyle = format7e ? "iframe7e" : "iframe";

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

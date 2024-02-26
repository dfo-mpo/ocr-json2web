"use client";
import { useState } from "react";
import styles from "./Iframe.module.css";
const Iframe = ({ fileName, formSetting, folderName }) => {
  const [showPdf, setShowPdf] = useState(true);

  const showPDF = formSetting.showPDF;
  
  const pdfUrl = formSetting.PDFurl[folderName];

  const url = `${pdfUrl}${fileName.replace(".json", ".pdf")}`;

  return (
    <>
      {showPDF && (
        <>
          <button
            className={styles.showButton}
            onClick={() => setShowPdf(!showPdf)}
          >
            {showPdf ? "Hide PDF" : "Show PDF"}
          </button>
          {showPdf && (
            <iframe className={styles.iframe} src={url}>
              This browser does not support PDFs. Please download the PDF to
              view it.
            </iframe>
          )}
        </>
      )}
    </>
  );
};

export default Iframe;

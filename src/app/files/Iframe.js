"use client";
import styles from "./Iframe.module.css";
import { useState, useEffect, useRef } from "react";

const Iframe = ({ fileName, formSetting, folderName, pageHeight }) => {
  const [showPdf, setShowPdf] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState();
  const [isPdf, setIsPdf] = useState(true);

  const [newPageHeight, setNewPageHeight] = useState(pageHeight);

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    }
  }, [pageHeight]);

  // const showPDF = formSetting.showPDF;

  // const pdfUrl = formSetting.PDFurl[folderName];

  // const url = `${pdfUrl}${fileName.replace(".json", ".pdf")}`;

  let pdfName = fileName.replace(".json", ".pdf");
  const submitData = {
    fileName: pdfName,
    folderName: folderName,
  };

  //fetch pdf data from blob
  const asyncFetch = async () => {
    setIsLoading(true);
    const Response = await fetch("/api/readPDF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });
    if (!Response.ok) {
      setIsPdf(false);
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
      setIsPdf(false);
    } else {
      // Convert the response to a blob

      // const pdfBuffer = await Response.arrayBuffer();
      const pdf = await Response.blob();
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <>
      <button
        className={styles.showButton}
        onClick={() => setShowPdf(!showPdf)}
      >
        {showPdf ? "Hide PDF" : "Show PDF"}
      </button>
      {showPdf &&
        (isPdf ? (
          !isLoading ? (
            <iframe
              className={styles.iframe}
              src={pdfUrl}
              style={{ height: newPageHeight }}
            >
              This browser does not support PDFs. Please download the PDF to
              view it.
            </iframe>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <div className={styles.noData}>No PDF file found</div>
        ))}
    </>
  );
};

export default Iframe;

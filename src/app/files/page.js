import Link from "next/link";
import FormRender from "../components/FormRender";
import styles from "./page.module.css";
import ErrorReport from "./ErrorReport";
import { promises as fs } from "fs";
import LogoHeader from "../components/LogoHeader";
import Iframe from "./Iframe";
import Image from "next/image";
import errorIcon from "../../../public/images/error.svg";
import verifiedIcon from "../../../public/images/verified.svg";
import modifiedIcon from "../../../public/images/modified.svg";
import VerifiedFile from "./VerifiedFile";
const File = async ({ searchParams }) => {
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;
  const verified = searchParams.verified;
  const error = searchParams.error;
  const isModified = searchParams.isModified;

  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";
  const format7e = folderName == "7eresultocr";
  const pdfFolderName = format6e
    ? "6etest"
    : format4c
    ? "4ctest"
    : format4h
    ? "4hrun"
    : format5a
    ? "5atest"
    : format7e
    ? "7etest"
    : "";

  try {
    const filePath =
      process.cwd() + `/src/app/bc16Data/${folderName}/${fileName}`;
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    return (
      <div>
        <title>{folderName}</title>
        {/* <title>{fileName.replace(".json", "").replace(/_/g, " ").replace(/BC16-\d+ /g, '')}</title> */}
        <LogoHeader />
        {/* <Link className={styles.backButton} href="/">
          Back
        </Link> */}
        <h5 className={styles.fileName}>
          File Name: {fileName.replace(/_/g, " ").replace(".json", "")}{" "}
          {verified && (
            <Image src={verifiedIcon} alt="verified" width={20} height={20} />
          )}{" "}
          {error && (
            <Image src={errorIcon} alt="error" width={15} height={15} />
          )}
          {isModified && (
            <Image src={modifiedIcon} alt="modified" height={23} width={23} />
          )}
        </h5>

        {/* <Link
          className={styles.linkStyle}
          rel="noopener noreferrer"
          target="_blank"
          href={`https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
            ".json",
            ".pdf"
          )}`}
        >
          PDF Version
        </Link> */}
        <ErrorReport fileName={fileName} folderName={folderName} />
        <br />
        <VerifiedFile
          fileName={fileName}
          folderName={folderName}
          verified={verified}
        />
        <div className={styles.container}>
          <FormRender
            folderName={folderName}
            items={jsonData}
            fileName={fileName}
            verified={verified}
          />
          <Iframe pdfFolderName={pdfFolderName} fileName={fileName} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default File;

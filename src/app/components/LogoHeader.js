import React from "react";
import Image from "next/image";
import logo from "../../../public/images/sig-blk-en.svg";
import styles from "./LogoHeader.module.css";
import Link from "next/link";
const LogoHeader = () => {
  return (
    <div className={styles.dfoHeader}>
      <Link href="/">
        <Image height={33} src={logo} alt="Logo" />
      </Link>
    </div>
  );
};

export default LogoHeader;

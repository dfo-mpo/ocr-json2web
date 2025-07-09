"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../public/images/sig-blk-en.svg";
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from "./LogoHeader.module.css";
import Link from "next/link";
const LogoHeader = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      
      <div className={styles.dfoHeader}>
        <Link href="/">
          <Image height={33} src={logo} alt="Logo" />
        </Link>
        <div className={styles.signedInStatus}>
          <p
            className={`nojs-show ${
              !session && loading ? styles.loading : styles.loaded
            }`}
          >
            {!session && (
              <>
                <span className={styles.notSignedInText}>
                  You are not signed in
                </span>
                <a
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session?.user && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url('${session.user.image}')` }}
                    className={styles.avatar}
                  ></span>
                )}
                <span className={styles.signedInText}>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  {' '}
                  Sign Out
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </header>
  );
};

export default LogoHeader;

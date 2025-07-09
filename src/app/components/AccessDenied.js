import { signIn } from 'next-auth/react';
import styles from "./AccessDenied.module.css";

export default function AccessDenied() {
  return (
    <div className={styles.container}>
        <div className={styles.background}>
            <h1>Access Denied</h1>
            <p>
                <a
                href='/api/auth/signin'
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
                >
                You must be signed in to view this page
                </a>
            </p>
        </div>
    </div>
  );
}
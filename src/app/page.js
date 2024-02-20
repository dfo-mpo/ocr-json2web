import styles from "./page.module.css";
import FileNameReader from "./components/homePage/FileNameReader";
import LogoHeader from "./components/LogoHeader";

export default function Home() {
  return (
    <div className={styles.container}>
      <LogoHeader />
      <FileNameReader />
    </div>
  );
}

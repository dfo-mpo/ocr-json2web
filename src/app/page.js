import styles from "./page.module.css";
import FileNameReader from "./components/homePage/FileNameReader";
import LogoHeader from "./components/LogoHeader";

export default function Home() {
  //this is the home page
  return (
    <div className={styles.container}>
      <LogoHeader signInVisible={true} />
      <FileNameReader />
    </div>
  );
}

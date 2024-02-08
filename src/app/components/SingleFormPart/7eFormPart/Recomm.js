import React from "react";
import styles from "./Recomm.module.css";
export const Recomm = ({ items, folderName }) => {
  // "(16) Fish access": "unselected",
  //   "(17) Spawning site": "unselected",
  //   "(18) Augementation": "unselected",
  //   "(19) Other": "unselected",
  const No16 = items["(16) Fish access"];
  const No17 = items["(17) Spawning site"];
  const No18 = items["(18) Augementation"];
  const No19 = items["(19) Other"];

  //
  return (
    <>
      <div className={styles.title}>RECOMMENDATIONS</div>
      <div className={styles.wrapper}>
        <ul className={styles.myList}>
          <li className={styles[No16]}>(16) Fish access problems</li>
          <li className={styles[No17]}>(17) Spawning site conditions</li>
          <li className={styles[No18]}>(18) Augmentation of flows</li>
          <li className={styles[No19]}>(19) Other suggestions</li>
        </ul>
      </div>
    </>
  );
};

export default Recomm;

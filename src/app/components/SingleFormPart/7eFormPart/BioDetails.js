import React from "react";
import styles from "./BioDetails.module.css";
const BioDetails = ({ items, folderName }) => {
  const partDetails = items["Biological details particulars"];

  //   "Present SK": "unselected",
  //   "Present CO": "unselected",
  //   "Present PK": "unselected",
  //   "Present CM": "unselected",
  //   "Present CN": "unselected",
  //   "Study SK": "unselected",
  //   "Study CO": "unselected",
  //   "Study PK": "unselected",
  //   "Study CM": "unselected",
  //   "Study CN": "unselected",
  //   "Predators": "unselected",
  //   "(20) General comments": "unselected",
  //   "(21) General comments not covered": "unselected",
  // "(22) Supplementary documentation": "unselected",
  // "Comments on condition":

  const presentSK = items["Present SK"];
  const presentCO = items["Present CO"];
  const presentPK = items["Present PK"];
  const presentCM = items["Present CM"];
  const presentCN = items["Present CN"];
  const studySK = items["Study SK"];
  const studyCO = items["Study CO"];
  const studyPK = items["Study PK"];
  const studyCM = items["Study CM"];
  const studyCN = items["Study CN"];
  const predators = items["Predators"];
  const generalComments = items["(20) General comments"];
  const No21 = items["(21) General comments not covered"];
  const No22 = items["(22) Supplementary documentation"];
  const Comments = items["Comments on condition"];
  const Biosampling = items["Bio Sampling"];

  return (
    <>
      <div className={styles.title}>BIOLOGICAL DETAILS</div>
      <div className={styles.wrapper}>
        <div className={styles.part}>
          <div className={styles.partDetailsTitle}>
            Particulars of distribution of spawning salmon over the stream bed:
          </div>
          <div className={styles.partDetails}>{partDetails}</div>
        </div>
        <div className={styles.part}>
          <div className={styles.partDetailsTitle}>Juvenile observations:</div>
          <div className={styles.juvenile}>
            <div>
              <div>Type</div>
              <div>Juveniles present?</div>
              <div>Juveniles studies performed?</div>
            </div>
            <div>
              <div>SK</div>
              <div className={styles[presentSK]}></div>
              <div className={styles[studySK]}></div>
            </div>
            <div>
              <div>CO</div>
              <div className={styles[presentCO]}></div>
              <div className={styles[studyCO]}></div>
            </div>
            <div>
              <div>PK</div>
              <div className={styles[presentPK]}></div>
              <div className={styles[studyPK]}></div>
            </div>
            <div>
              <div>CM</div>
              <div className={styles[presentCM]}></div>
              <div className={styles[studyCM]}></div>
            </div>
            <div>
              <div>CN</div>
              <div className={styles[presentCN]}></div>
              <div className={styles[studyCN]}></div>
            </div>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.partDetailsTitle}>
            Evidence of digging up of redds or eggs by spawning fish:
          </div>
          <ul className={styles.myList}>
            <li>Pink:</li>
            <li>Sockeye:</li>
            <li>Chum:</li>
          </ul>
        </div>
        <div className={styles.part2}>
          <div className={styles.partDetailsTitle}>Predator observation:</div>
          <div className={styles.inlineFlex}>
            <div className={styles[predators]}></div>
            <div>
              Predator (bears, eagles or seals) counts available for one or more
            </div>
          </div>
        </div>
        <div className={styles.part2}>
          <div className={styles.inlineFlex}>
            <div className={styles[generalComments]}></div>
            <div>
              (20) GENERAL COMMENTS ABOUT ADULT & JUVENILE SALMON DISTRIBUTION
              OR PREDATOR INTERACTIONS
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrapper2}>
        <div>
          <div className={styles.bioTitle}>Biosampling procedures</div>
          <div className={styles.part3}>
            <div>Species</div>
            <div>Scales</div>
            <div>Otoliths</div>
            <div>Ovaries</div>
            <div>Length</div>
            <div>DNA</div>
            <div>Other</div>
            <div>Comment</div>
          </div>
          {Biosampling&&Biosampling.map((item, index) => {
            return (
              <div className={styles.part4} key={index}>
                <div>{item["Species"]}</div>
                <div>{item["Scales"]}</div>
                <div>{item["Otoliths"]}</div>
                <div>{item["Ovaries"]}</div>
                <div>{item["Length"]}</div>
                <div>{item["DNA"]}</div>
                <div>{item["Other"]}</div>
                <div>{item["Comments"]}</div>
              </div>
            );
          }
          )}

        </div>
        <div>
          <div className={styles.contactLoc}>
            <div>Contact:</div>
            <div>Data Location:</div>
          </div>
          <div className={styles.part2}>
            <div className={styles.inlineFlex}>
              <div className={styles[No21]}></div>
              <div>
                (21) GENERAL COMMENTS ON SAMPLING ACTIVITIES OR STUDIES NOT
                COVERED ABOVE
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.part2}>
        <div className={styles.inlineFlex}>
          <div className={styles[No22]}></div>
          <div>
            (22) SUPPLEMENTARY DOCUMENTATION NOT INCLUDED WITH THIS REPORT
          </div>
        </div>
      </div>

      <div className={styles.title}>
        COMMENTS ON CONDITIONS AFFECTING THIS STREAM AND ESCAPEMENT ESTIMATES
      </div>
      <div className={styles.wrapper2}>
        <div className={styles.comments}>{Comments}</div>
      </div>
    </>
  );
};

export default BioDetails;

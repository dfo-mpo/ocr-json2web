"use client";
import styles from "./LeftPanel.module.css";
import { useState, useEffect, useRef } from "react";

const LeftPanel = ({ pageHeight }) => {
  const [newPageHeight, setNewPageHeight] = useState(pageHeight);
  console.log("pageHeight", pageHeight);

  const [color, setColor] = useState();

  useEffect(() => {
    if (pageHeight < 1000) {
      setNewPageHeight(1000);
    } else {
      setNewPageHeight(pageHeight);
    }
  }, [pageHeight]);

  // Temporary function added to generate random color for label names
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    setColor(getRandomColor());
  }, [])
  
  return (
    <>
    <div className={styles.leftPanel}>
      <div className={styles.panelHeader}>Polygon List</div>

      {/* TODO: Create dynamic list */}
      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Harvester's Name
        </div>
        <div className={styles.labelText}>Luong's Investements Ltd. 2015-2633 Simpson Road Richmond, BC V6X 0B9 Tel: 604-254-8066</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          VRN
        </div>
        <div className={styles.labelText}>Ocean Prince III / 30881</div>
      </div>

      <div className={styles.polygonItem}>
        <div className={styles.labelName}>
          <span className={styles.colorCircle} style={{ backgroundColor: getRandomColor() }}></span>
          Fish slip #
        </div>
        <div className={styles.labelText}>2020016923</div>
      </div>
      
    </div>

    </>
  );
};

export default LeftPanel;

import { useContext, useEffect, useState } from "react";
import styles from "./TeForm.module.css";
import StreamID from "./StreamID";
import Area from "./Area";
import Dates from "./Dates";
import SpawningTable from "./SpawningTable";
import UnusualCon from "./UnusualCon";
import AdditionalCmt from "./AdditionalCmt";
import Signature from "./Signature";
import modifyContext from "../../../state/modify-context";

const TeForm = ({ items, folderName, fileName }) => {
  const modifyCtx = useContext(modifyContext);
  const update = modifyCtx.update;
  const itemCtx = modifyCtx.item;
  const folderNameCtx = modifyCtx.folderName;
  const fileNameCtx = modifyCtx.fileName;
  const isEdit = modifyCtx.isEdit;
  const [component, setComponent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    update(items, folderName, fileName);
  }, []);

  const onSubmitHandler = async () => {
   

    const dataToSubmit = {
      folderName,
      fileName,
      jsonData: itemCtx,
    };

    const Response = await fetch("/api/modify", {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      alert("Failed to save. Please try again.");
      
    } else {
   
      alert("Changes saved successfully!");
      modifyCtx.updateIsEdit(false);
    }
  };
 
  const resetEdit = () => {
    modifyCtx.updateIsEdit(false);
    window.location.reload();
  };

  const saveHandler = () => {

    onSubmitHandler();
  };

  useEffect(() => {
    if (fileNameCtx == fileName) {
      setComponent(
        <>
          {isEdit ? (
            <>
              <button onClick={saveHandler} className={styles.saveChange}>
                Save
              </button>
              <button onClick={resetEdit} className={styles.cancelChange}>
                Cancel
              </button>
            </>
          ) : null}
          <div className={styles.headerBox}>
            <div className={styles.streamID}>
              <StreamID folderName={folderNameCtx} items={itemCtx} />
            </div>
            <div className={styles.areaDates}>
              <Area items={itemCtx} folderName={folderNameCtx} />
              <Dates items={itemCtx} folderName={folderNameCtx} />
            </div>
          </div>
          <SpawningTable items={itemCtx} folderName={folderNameCtx} />

          <UnusualCon items={itemCtx} folderName={folderNameCtx} />

          <AdditionalCmt items={itemCtx} folderName={folderNameCtx} />
          <Signature items={itemCtx} folderName={folderNameCtx} />
        </>
      );
      setIsLoaded(false);
    }
  }, [itemCtx, folderNameCtx, fileNameCtx, isEdit]);

  return <>{isLoaded ? <div>loading...</div> : component}</>;
};

export default TeForm;

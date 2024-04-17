"use client";
import { useEffect, useState } from "react";
import JsonView from "@uiw/react-json-view";
import JsonViewEditor from "@uiw/react-json-view/editor";
import styles from "./page.module.css";
import { JsonEditor } from "json-edit-react";
export default function EditSingleTable({ searchParams }) {
  const { formSettingIndex, folderName } = searchParams;
  const [data, setData] = useState(null);

  const saveData = async () => {
    const dataJson = {
      folderName,
      formSettingIndex,
      data,
    };
    const Response = await fetch("/api/SaveSingleTable", {
      method: "POST",
      body: JSON.stringify(dataJson),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else {
      console.log("Data saved");
      alert("Data saved");
      window.close();
    }
  };

  const fetchData = async () => {
    //  fetch the JSON data from the blob storage based on the folder name and file name
    const data = {
      folderName,
      formSettingIndex,
    };
    const Response = await fetch("/api/SingleTable", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
    } else {
      const reader = Response.body.getReader();

      const readData = async () => {
        try {
          let jsonString = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Process the entire JSON when the stream is complete
              const dataObject = JSON.parse(jsonString);

              // Do something with the data
              setData(dataObject);
              break;
            }

            // Concatenate the chunks into a single string
            jsonString += new TextDecoder().decode(value);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when done
        }
      };
      readData();
    }
  };
  useEffect(() => {
    fetchData();
  }, [folderName, formSettingIndex]);

  return (
    <div>
      <div>Edit Single Table</div>

      <div>folderName: {folderName}</div>

      <div className={styles.jsonView}>
        {data ? (
          <JsonEditor
            data={data}
            enableClipboard={false}
            onUpdate={(e) => {
              setData(e.newData);
            }}
          />
        ) : (
          // <JsonViewEditor
          //   value={data}
          //   displayDataTypes={false}
          //   collapsed={false}
          //   shortenTextAfterLength={0}
          //   onEdit={true}
          // />
          <div> Loading...</div>
        )}
      </div>
      <div className={styles.saveButtonWrapper}>
        <div
        className={styles.note}
        >Note: Please ensure to click the green checkmark or press 'Enter' after editing each field! </div>
        <button
          className={styles.saveButton}
          onClick={() => {
            saveData();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

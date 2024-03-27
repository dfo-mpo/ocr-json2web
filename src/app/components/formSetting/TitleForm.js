import { useState, useEffect } from "react";
import styles from "./TitleForm.module.css";

const TitleForm = () => {
  const [submitData, setSubmitData] = useState();

  const submitHandler = async (e) => {
    const title = e.target.title.value;
    const subtitle = e.target.subtitle.value;
    const display = e.target.display.value;
    const gap = e.target.gap.value;

    const Response = await fetch("/api/saveFormSettingTitle", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        subtitle: subtitle,
        style: {
          display: display,
          gap: gap,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Response.ok) {
      alert("Error");
    } else {
      alert("Success");
      window.close();
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(e);
      }}
    >
      <div className={styles.title}>Title Form</div>
      <div className={styles.inputGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="Title" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="subtitle">Subtitle</label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          placeholder="Subtitle"
        />
      </div>
      <div className={styles.styleSection}>
        <div className={styles.styleName}>Style</div>
        <div className={styles.inputGroup}>
          <label htmlFor="display">display</label>
          <input
            id="display"
            name="display"
            type="text"
            placeholder="grid"
            defaultValue="grid"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="gap">gap</label>
          <input
            id="gap"
            name="gap"
            type="text"
            placeholder="10px"
            defaultValue="5px"
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.submit}>Submit</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TitleForm;

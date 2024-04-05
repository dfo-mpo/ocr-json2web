import styles from "./TitleForm.module.css";

const TitleForm = () => {
  const submitHandler = async (e) => {
    const title = e.target.title.value;
    const subtitle = e.target.subtitle.value;
    const gap = e.target.gap.value;

    const Response = await fetch("/api/saveFormSettingTitle", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        subtitle: subtitle,
        style: {
          display: "grid",
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
      <div className={styles.note}> Note: Enter the title and subtitle only once for all formats/schemas </div>
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
        <button
          type="button"
          onClick={() => window.close()}
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TitleForm;

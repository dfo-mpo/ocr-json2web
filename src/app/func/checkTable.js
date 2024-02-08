const checkTable = (items, ...words) => {
  for (let i = 0; i < items.Tables.length; i++) {
    for (let j = 0; j < items.Tables[i].Cells.length; j++) {
      let content = items.Tables[i].Cells[j].Content.toUpperCase();
      if (words.some((word) => content.includes(word.toUpperCase()))) {
        return i;
      }
    }
  }
};

export default checkTable;

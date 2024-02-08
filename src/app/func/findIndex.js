const findIndex = (items, beginWord, endWord) => {
  const lowercasedBeginWord = beginWord.toLowerCase();
  const lowercasedEndWord = endWord ? endWord.toLowerCase() : null;
  const beginIndex = items.findIndex((item) =>
    item.LineContent.toLowerCase().includes(lowercasedBeginWord)
  );

  // Check if endWord exists in the array and find its index
  const endIndex = endWord
    ? items.findIndex((item) =>
        item.LineContent.toLowerCase().includes(lowercasedEndWord)
      )
    : -1;

  // Subtract 1 from endIndex if it's not -1

  return { beginIndex, endIndex };
};

export default findIndex;

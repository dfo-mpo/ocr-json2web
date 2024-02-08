import { createContext, useState } from "react";

const modifyContext = createContext({
  item: {},
  folderName: "",
  fileName: "",
  isEdit: false,
  update: (item, folderName, fileName) => { },
  updateItem: (item) => { },
  updateFolderName: (folderName) => { },
  updateFileName: (fileName) => { },
  updateIsEdit: (isEdit) => { },
});

export function ModifyContextProvider({ children }) {
  const [item, setItem] = useState({});
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  function update(item, folderName, fileName) {
    setItem(item);
    setFolderName(folderName);
    setFileName(fileName);
  }
  function updateItem(item) {
    setItem(item);
    setIsEdit(true);
  }
  function updateFolderName(folderName) {
    setFolderName(folderName);
  }
  function updateFileName(fileName) {
    setFileName(fileName);
  }
  function updateIsEdit(isEdit) {
    setIsEdit(isEdit);
  }


  const ctxValue = {
    item,
    update: update,
    folderName,
    fileName,
    isEdit,
    updateItem: updateItem,
    updateFolderName: updateFolderName,
    updateFileName: updateFileName,
    updateIsEdit: updateIsEdit,
  };

  return (
    <modifyContext.Provider value={ctxValue}>{children}</modifyContext.Provider>
  );
}

export default modifyContext;

import SingleForm from "./SingleForm";
const FormRender = ({ items, folderName, fileName }) => {
  return (
    <SingleForm folderName={folderName} fileName={fileName} items={items} />
  );
};

export default FormRender;

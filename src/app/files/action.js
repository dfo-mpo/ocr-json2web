"use server";
import { promises as fs } from "fs";
import path from "path";

export async function logData(prevState, formData) {
  const { folderName, fileName, errorField, errorDescription } = {
    folderName: formData.get("folderName"),
    fileName: formData.get("fileName"),
    errorField: formData.get("errorField"),
    errorDescription: formData.get("errorDescription"),
  };

  const folderPath = path.join(process.cwd(), "/src/app/mylog/");
  try {
    const logFilePath = `${folderName}.log`;
    try {
      await fs.access(`${folderPath}/${logFilePath}`, fs.constants.F_OK); // Check if file exists
    } catch {
      // If the file does not exist, create it with the initial content
      await fs.writeFile(`${folderPath}/${logFilePath}`, "utf8");
    }

    // Append the fileName to the log file
    await fs.appendFile(
      `${folderPath}/${logFilePath}`,
      `File Name: ${fileName}, Error: ${errorField}, Description: ${errorDescription}; \n`,
      "utf8"
    );

    return {
      status: 200,
      message: "Success",
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  const { folderName, fileName, errorField, errorDescription } =
    await request.json();

  const folderPath = process.cwd() + "/src/app/mylog/";


  try { 
    const logFilePath = `${folderName}.log`;
    try {
      await fs.access(`${folderPath}/${logFilePath}`, fs.constants.F_OK); // Check if file exists
    } catch {
      // If the file does not exist, create it with the initial content
      await fs.writeFile(
        `${folderPath}/${logFilePath}`,
        "utf8"
      );
    }

    // Append the fileName to the log file
    await fs.appendFile(
      `${folderPath}/${logFilePath}`,
      `File Name: ${fileName}, Error: ${errorField}, Description: ${errorDescription}; \n`,
      "utf8"
    );
    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

//fetch the JSON data from the blob storage based on the folder name and file name
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const dataJson = await request.json();
  const { folderName, formSettingIndex, data } = dataJson;

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  // jsondata is container name which storage the data by folder
  const mainContainerName = process.env.DIRECTORY_NAME;

  const containerName = "websiteinfo";
  const fileName = "formSetting.json";

  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    const containerClient =
      blobServiceClient.getContainerClient(mainContainerName);
    const blockBlobClient = containerClient.getBlockBlobClient(
      `${containerName}/${fileName}`
    );
    const blobExists = await blockBlobClient.exists();
    if (blobExists) {
      const existingData = await blockBlobClient.downloadToBuffer();
      const existingJson = existingData.toString();
      let existingJsonObj = JSON.parse(existingJson);
      existingJsonObj[folderName][formSettingIndex] = data;
      await blockBlobClient.upload(
        JSON.stringify(existingJsonObj),
        existingJson.length
      );
      return new Response("Data saved", {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("No data found", { status: 404 });
    }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

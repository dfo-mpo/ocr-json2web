//sending error report to blob storage
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    const dataJson = await request.json();
    const { folderName, fileName, errorField, errorDescription, error } =
      dataJson;
    // format the data to be sent to the blob storage
    const errorData = [
      {
        folderName: folderName,
        fileName: fileName,
        error: true,
        errorInfo: [
          { errorField: errorField, errorDescription: errorDescription },
        ],
      },
    ];

    const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;

    const blobService = new BlobServiceClient(SAS_URL);

    const containerClient = blobService.getContainerClient("errorLog");
    // Generate a blob name based on the folder name
    const blobName = `${dataJson.folderName}.json`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    //remove the verified log
    const containerClient2 = blobService.getContainerClient("verified");
    const blockBlobClient2 = containerClient2.getBlockBlobClient(blobName);
    const blobExists2 = await blockBlobClient2.exists();
    if (blobExists2) {
      const existingData = await blockBlobClient2.downloadToBuffer();
      const existingJson = existingData.toString();
      // Parse the existing JSON data
      let existingJsonArray;
      try {
        existingJsonArray = JSON.parse(existingJson);
      } catch (error) {
        return;
      }
      const newData = existingJsonArray.filter(
        (item) => item.fileName != dataJson.fileName
      );
      const updatedJsonData = JSON.stringify(newData, null, 2);
      try {
        await blockBlobClient2.upload(updatedJsonData, updatedJsonData.length);
      } catch (error) {
        console.error("Caught an uploading error:", error);
        return new Response(error.message, { status: 500 });
      }
    }

    // Check if the blob already exists
    const blobExists = await blockBlobClient.exists();

    if (blobExists) {
      // If blob exists, download the existing JSON data
      const existingData = await blockBlobClient.downloadToBuffer();

      const existingJson = existingData.toString();

      let existingJsonArray;
      try {
        existingJsonArray = JSON.parse(existingJson);
      } catch (error) {
        return;
      }
      // Append new data to existing JSON array
      // check the existingJsonArray to see if the there is same file name
      // if there is same file name, append the error info to the existingJsonArray
      // Iterate through existingJsonArray to check if the fileName already exists
      let fileExists = false;
      existingJsonArray.forEach((item) => {
        if (item.fileName === fileName) {
          // If the fileName exists, append the error info
          item.errorInfo.push({
            errorField: errorField,
            errorDescription: errorDescription,
          });
          fileExists = true;
        }
      });
      if (!fileExists) {
        existingJsonArray = [...existingJsonArray, ...errorData];
      }

      // Convert the updated data to JSON string
      const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);

      // Upload the updated JSON data to the blob
      await blockBlobClient.upload(updatedJsonData, updatedJsonData.length);
      return new Response("success", { status: 200 });
    }
    // If blob doesn't exist, create a new JSON array
    const jsonData = JSON.stringify(errorData, null, 2);
    // Upload the new JSON array to the blob
    await blockBlobClient.upload(jsonData, jsonData.length);
    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Caught an uploading error:", error);
    return new Response(error.message, { status: 500 });
  }
}

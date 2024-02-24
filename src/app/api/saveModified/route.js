//fetch the JSON data from the blob storage based on the folder name and file name
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const dataJson = await request.json();
  const { folderName, fileName, data } = dataJson;

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  // jsondata is container name which storage the data by folder
  const containerName = "jsondatamodified";

  const containerName2 = "websiteinfo";

  const statusData = [
    {
      folderName: folderName,
      fileName: fileName,
      modified: true,
      error: false,
      errorInfo: [],
      verified: false,
    },
  ];

  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(
      `${containerName}/${folderName}`
    );
    //update to fileStatus container
    const containerClient2 =
      blobServiceClient.getContainerClient(containerName2);
    const blobName = `${folderName}.json`;

    const blockBlobClient2 = containerClient2.getBlockBlobClient(
      `fileStatus/${blobName}`
    );

    //open json file

    const blobExists2 = await blockBlobClient2.exists();
    if (blobExists2) {
      const existingData2 = await blockBlobClient2.downloadToBuffer();
      const existingJson2 = existingData2.toString();
      let existingJsonArray = JSON.parse(existingJson2);

      const index = existingJsonArray.findIndex(
        (item) => item.fileName === fileName
      );
      if (index !== -1) {
        //if exists, update the status
        existingJsonArray[index] = {
          ...existingJsonArray[index],
          modified: true,
        };
      } else {
        // Append new data to existing JSON array
        existingJsonArray = [...existingJsonArray, ...statusData];
        // Convert the updated data to JSON string
      }

      const updatedJsonData2 = JSON.stringify(existingJsonArray, null, 2);
      // Upload the updated JSON data to the blob
      try {
        await blockBlobClient2.upload(
          updatedJsonData2,
          updatedJsonData2.length
        );
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      // If blob doesn't exist, create a new JSON array
      const jsonData = JSON.stringify(statusData, null, 2);
      //     // Upload the new JSON array to the blob
      try {
        await blockBlobClient2.upload(jsonData, jsonData.length);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const blobExists = await blockBlobClient.exists();
    //whatever blobExists, upload the data
    // Convert the updated data to JSON string
    const updatedJsonData = JSON.stringify(data, null, 2);

    // Upload the updated JSON data to the blob
    try {
      await blockBlobClient.upload(updatedJsonData, updatedJsonData.length);
      return new Response("Success", { status: 200 });
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

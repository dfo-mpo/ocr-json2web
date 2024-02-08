//server action. didn't work on server at beginning. but it may work now.  no use for now.
"use server";

import { BlobServiceClient } from "@azure/storage-blob";
export async function verified(prevState, data) {
  const dataJson = [
    {
      folderName: data.get("folderName"),
      fileName: data.get("fileName"),
      verified: data.get("verified"),
    },
  ];

  const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;

  const blobService = new BlobServiceClient(SAS_URL);

  const containerClient = blobService.getContainerClient("verified");

  // Generate a blob name based on the folder name
  const blobName = `${data.get("folderName")}.json`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Check if the blob already exists
  const blobExists = await blockBlobClient.exists();

  if (blobExists) {
    // If blob exists, download the existing JSON data
    const existingData = await blockBlobClient.downloadToBuffer();
    const existingJson = existingData.toString();

    // Parse the existing JSON data
    let existingJsonArray;
    try {
      existingJsonArray = JSON.parse(existingJson);
    } catch (error) {
      console.error(`Error parsing existing JSON: ${error}`);
      return;
    }

    // Append new data to existing JSON array
    existingJsonArray = [...existingJsonArray, ...dataJson];
    console.log(existingJsonArray);
    // Convert the updated data to JSON string
    const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);

    // Upload the updated JSON data to the blob
    await blockBlobClient.upload(updatedJsonData, updatedJsonData.length, {
      blobHTTPHeaders: { blobContentType: "application/json" },
    });
  } else {
    // If blob doesn't exist, create a new JSON array
    const jsonData = JSON.stringify(dataJson, null, 2);

    //     // Upload the new JSON array to the blob
    await blockBlobClient.upload(jsonData, jsonData.length, {
      blobHTTPHeaders: { blobContentType: "application/json" },
    });
  }

  console.log(`File "${blobName}" updated successfully.`);
}

// send verified  data to azure blob storage
import { getStorageConnectionString } from "../../server/storage";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const dataJson = await request.json();
  const { folderName, fileName } = dataJson;

  const data = [
    {
      folderName: folderName,
      fileName: fileName,
      verified: true,
      error: false,
      errorInfo: [],
    },
  ];

  const connectionString = await getStorageConnectionString(); 
  const mainContainerName = process.env.DIRECTORY_NAME;

  const containerName = "websiteinfo";
  //connect to jsondata container to update verified status in the json file

  // const containerName2 = "jsondata";


  //connect to jsondatamodified container to update verified status in the json file
  const containerName3 = "json";
  const subContainerName3 = "jsondatamodified";
  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(`${mainContainerName}/${containerName}`);
    //connect to jsondata container
    // const containerClient2 =
    //   blobServiceClient.getContainerClient(containerName2);

    // const blockBlobClient2 = containerClient2.getBlockBlobClient(
    //   `${folderName}/${fileName}`
    // );

    //open json file

    // const blobExists2 = await blockBlobClient2.exists();

    // if (blobExists2) {
    //   const existingData2 = await blockBlobClient2.downloadToBuffer();
    //   const existingJson2 = existingData2.toString();
    //   let jsonData = JSON.parse(existingJson2);

    //   // update or add verified status to existing json file
    //   jsonData = { ...jsonData, verified: true };
    //   const updatedJsonData2 = JSON.stringify(jsonData, null, 2);
    //   // Upload the updated JSON data to the blob
    //   try {
    //     await blockBlobClient2.upload(
    //       updatedJsonData2,
    //       updatedJsonData2.length
    //     );
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // }

    //connect to jsondatamodified container
    const containerClient3 =
      blobServiceClient.getContainerClient(`${mainContainerName}/${containerName3}`);

    const blockBlobClient3 = containerClient3.getBlockBlobClient(
      `${subContainerName3}/${folderName}/${fileName}`
    );

    //open json file from jsondatamodified container

    const blobExists3 = await blockBlobClient3.exists();

    if (blobExists3) {
      const existingData3 = await blockBlobClient3.downloadToBuffer();
      const existingJson3 = existingData3.toString();
      let jsonData = JSON.parse(existingJson3);

      // update or add verified status to existing json file
      jsonData = { ...jsonData, verified: true };
      const updatedJsonData3 = JSON.stringify(jsonData, null, 2);
      // Upload the updated JSON data to the blob
      try {
        await blockBlobClient3.upload(
          updatedJsonData3,
          updatedJsonData3.length
        );
      } catch (error) {
        throw new Error(error.message);
      }
    }

    // Generate a blob name based on the folder name
    const blobName = `${folderName}.json`;
    const blockBlobClient = containerClient.getBlockBlobClient(
      `fileStatus/${blobName}`
    );

    const blobExists = await blockBlobClient.exists();
    if (blobExists) {
      // If blob exists, download the existing JSON data
      const existingData = await blockBlobClient.downloadToBuffer();
      const existingJson = existingData.toString();
      let existingJsonArray = JSON.parse(existingJson);
      //check fileName exists in the json array
      const index = existingJsonArray.findIndex(
        (item) => item.fileName === fileName
      );

      if (index !== -1) {
        //if exists, update the status
        existingJsonArray[index] = {
          ...existingJsonArray[index],
          verified: true,
          error: false,
          errorInfo: [],
        };
      } else {
        // Append new data to existing JSON array
        existingJsonArray = [...existingJsonArray, ...data];
        // Convert the updated data to JSON string
      }
      const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);
      // Upload the updated JSON data to the blob
      try {
        await blockBlobClient.upload(updatedJsonData, updatedJsonData.length);
        return new Response("Success", { status: 200 });
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      // If blob doesn't exist, create a new JSON array
      const jsonData = JSON.stringify(data, null, 2);
      //     // Upload the new JSON array to the blob
      try {
        await blockBlobClient.upload(jsonData, jsonData.length);
        return new Response("Success", { status: 200 });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

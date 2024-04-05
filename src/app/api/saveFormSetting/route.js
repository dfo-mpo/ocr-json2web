//fetch the JSON data from the blob storage based on the folder name and file name
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const dataJson = await request.json();
  const { folderNames } = dataJson;

  const folderObject = {
    style: {
      display: "grid",
      gap: "2px",
    },
  };
  folderNames.forEach((name) => {
    folderObject[name] = [];
  });

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

      // Iterate over the keys of folderObject
      for (const key in folderObject) {
        // Check if the key exists in existingJsonObj
        if (!(key in existingJsonObj)) {
          // If it doesn't exist, append it to existingJsonObj
          existingJsonObj[key] = [];
        }
      }

      if (!existingJsonObj["style"]) {
        // Append new data to existing JSON object
        existingJsonObj = {
          style: {
            display: "grid",
            gap: "2px",
          },
          ...existingJsonObj,
        };
      }

      // Convert the updated data to JSON string
      let uploadJson = JSON.stringify(existingJsonObj, null, 2);

      // Upload the updated JSON data to the blob
      try {
        await blockBlobClient.upload(uploadJson, uploadJson.length);
        return new Response("Success", { status: 200 });
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      // If blob doesn't exist, create a new JSON object
      const jsonData = JSON.stringify(folderObject, null, 2);

      // Upload the new JSON object to the blob
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

  //   try {
  //     // Create a BlobServiceClient
  //     const blobServiceClient =
  //       BlobServiceClient.fromConnectionString(connectionString);
  //     // Get a container client from the BlobServiceClient
  //     const containerClient = blobServiceClient.getContainerClient(
  //       `${mainContainerName}/${containerName}/${subContainerName}/${folderName}`
  //     );
  //     //update to fileStatus container
  //     const containerClient2 =
  //       blobServiceClient.getContainerClient(`${mainContainerName}/${containerName2}`);
  //     const blobName = `${folderName}.json`;

  //     const blockBlobClient2 = containerClient2.getBlockBlobClient(
  //       `fileStatus/${blobName}`
  //     );

  //     //open json file

  //     const blobExists2 = await blockBlobClient2.exists();
  //     if (blobExists2) {
  //       const existingData2 = await blockBlobClient2.downloadToBuffer();
  //       const existingJson2 = existingData2.toString();
  //       let existingJsonArray = JSON.parse(existingJson2);

  //       const index = existingJsonArray.findIndex(
  //         (item) => item.fileName === fileName
  //       );
  //       if (index !== -1) {
  //         //if exists, update the status
  //         existingJsonArray[index] = {
  //           ...existingJsonArray[index],
  //           modified: true,
  //         };
  //       } else {
  //         // Append new data to existing JSON array
  //         existingJsonArray = [...existingJsonArray, ...statusData];
  //         // Convert the updated data to JSON string
  //       }

  //       const updatedJsonData2 = JSON.stringify(existingJsonArray, null, 2);
  //       // Upload the updated JSON data to the blob
  //       try {
  //         await blockBlobClient2.upload(
  //           updatedJsonData2,
  //           updatedJsonData2.length
  //         );
  //       } catch (error) {
  //         throw new Error(error.message);
  //       }
  //     } else {
  //       // If blob doesn't exist, create a new JSON array
  //       const jsonData = JSON.stringify(statusData, null, 2);
  //       //     // Upload the new JSON array to the blob
  //       try {
  //         await blockBlobClient2.upload(jsonData, jsonData.length);
  //       } catch (error) {
  //         throw new Error(error.message);
  //       }
  //     }

  //     const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  //     const blobExists = await blockBlobClient.exists();
  //     //whatever blobExists, upload the data
  //     // Convert the updated data to JSON string
  //     const updatedJsonData = JSON.stringify(data, null, 2);

  //     // Upload the updated JSON data to the blob
  //     try {
  //       await blockBlobClient.upload(updatedJsonData, updatedJsonData.length);
  //       return new Response("Success", { status: 200 });
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   } catch (error) {
  //     console.error("Caught an outside error:", error);
  //     return new Response(error.message, { status: 500 });
  //   }
}

// send verified  data to azure blob storage
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    const dataJson = await request.json();
    const data = [dataJson];
   
    const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;
    
    const blobService = new BlobServiceClient(SAS_URL);
  
    const containerClient = blobService.getContainerClient("verified");
  

    // Generate a blob name based on the folder name
    const blobName = `${dataJson.folderName}.json`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    

    // remove the error log
    const containerClient2 = blobService.getContainerClient("errorLog");
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
      const newData = existingJsonArray.filter((item) => item.fileName != dataJson.fileName);
      const updatedJsonData = JSON.stringify(newData, null, 2);
      try{
      await blockBlobClient2.upload(updatedJsonData, updatedJsonData.length);
      }catch(error){
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

      // Parse the existing JSON data
      let existingJsonArray;
      try {
        existingJsonArray = JSON.parse(existingJson);
      } catch (error) {
     
        return;
      }

      // Append new data to existing JSON array
      existingJsonArray = [...existingJsonArray, ...data];

      // Convert the updated data to JSON string
      const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);

      // Upload the updated JSON data to the blob
      await blockBlobClient.upload(updatedJsonData, updatedJsonData.length, {
        blobHTTPHeaders: { blobContentType: "application/json" },
      });
      return new Response('success', { status: 200 });
    } else {
      // If blob doesn't exist, create a new JSON array
      const jsonData = JSON.stringify(data, null, 2);
      //     // Upload the new JSON array to the blob
      try {
        await blockBlobClient.upload(jsonData, jsonData.length);
      } catch (error) {
        console.error("Caught an uploading error:", error);
        return new Response(error.message, { status: 500 });
      }
      return new Response("Success", { status: 200 });
    }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

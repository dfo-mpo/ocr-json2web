
//TODO: old code, need to be removed
// fetch the data from the blob storage, combine them and return the data to the frontend
// data contain the file name and the folder name and verified data 
import { BlobServiceClient } from "@azure/storage-blob";

export async function GET() {


  try {
    const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;

    const blobService = new BlobServiceClient(SAS_URL);

    const containerClient = blobService.getContainerClient("formSetting");
    const blobName = 'formSetting.json';

    // Get the blockBlobClient for the generated blobName
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Check if the blob already exists
    const blobExists = await blockBlobClient.exists();
    let data = {};
    if (blobExists) {
      // Blob exists, fetch its content
      const response = await blockBlobClient.downloadToBuffer();
      data = JSON.parse(response.toString()); // Assuming the content is JSON

    }
    else{
      return new Response("No data", { status: 203 });
    }
    // Convert the updated data

    const updatedJsonData = JSON.stringify(data, null, 2);

    // Upload the updated JSON data to the blob

    return new Response(updatedJsonData, { status: 200 });
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

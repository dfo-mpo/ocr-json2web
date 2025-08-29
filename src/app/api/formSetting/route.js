// fetch the data from the blob storage, combine them and return the data to the frontend
// data contain the file name and the folder name and verified data
import { getBlobServiceClient } from "../../server/storage";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const mainContainerName = process.env.DIRECTORY_NAME;
  const containerName = "websiteinfo";
  const fileName = "formSetting.json";
  try {
    const blobServiceClient = getBlobServiceClient();
    const containerClient = blobServiceClient.getContainerClient(`${mainContainerName}/${containerName}`);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const blobExists = await blockBlobClient.exists();
 
    if (blobExists) {
      const response = await blockBlobClient.downloadToBuffer();
      const blobContent = JSON.parse(response.toString());
      const updatedJsonData = JSON.stringify(blobContent, null, 2);
 
      return new Response(updatedJsonData, {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response("Blob not found", { status: 203 });
    }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
 
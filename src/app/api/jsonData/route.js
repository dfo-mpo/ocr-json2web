// fetch the data from the blob storage, combine them and return the data to the frontend
// data contain the file name and the folder name and verified data
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {

    const dataJson = await request.json();
    const { folderName, fileName } = dataJson;

  try {
    const SAS_URL = process.env.NEXT_JSONDATA_SAS_URL;

    const blobService = new BlobServiceClient(SAS_URL);

    const containerClient = blobService.getContainerClient(folderName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    // // Generate a blob name based on the folder name
    // Check if the blob already exists
    const blobExists = await blockBlobClient.exists();

    if (blobExists) {
      // Blob exists, fetch its content
      const response = await blockBlobClient.downloadToBuffer();
      const blobContent = JSON.parse(response.toString()); // Assuming the content is JSON

     
      const updatedJsonData = JSON.stringify(blobContent, null, 2);
      return new Response(updatedJsonData, { status: 200 });
    }

    // Upload the updated JSON data to the blob
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

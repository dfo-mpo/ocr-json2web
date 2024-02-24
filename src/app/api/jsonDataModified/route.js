//fetch the JSON data from the blob storage based on the folder name and file name
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const dataJson = await request.json();
  const { folderName, fileName } = dataJson;

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  // jsondata is container name which storage the data by folder
  const containerName = "jsondatamodified";

  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(
      `${containerName}/${folderName}`
    );


    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const blobExists = await blockBlobClient.exists();


    if (blobExists) {
      //   // Blob exists, fetch its content
      const response = await blockBlobClient.downloadToBuffer();
      const blobContent = JSON.parse(response.toString());
      const updatedJsonData = JSON.stringify(blobContent, null, 2);
      return new Response(updatedJsonData, { status: 200 });
    } else {
      throw new Error("Blob does not exist");
    }
    // const SAS_URL = process.env.NEXT_JSONDATA_SAS_URL;

    // const blobService = new BlobServiceClient(SAS_URL);

    // const containerClient = blobService.getContainerClient(folderName);
    // const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    // // // Generate a blob name based on the folder name
    // // Check if the blob already exists
    // const blobExists = await blockBlobClient.exists();

    // if (blobExists) {
    //   // Blob exists, fetch its content
    //   const response = await blockBlobClient.downloadToBuffer();
    //   const blobContent = JSON.parse(response.toString()); // Assuming the content is JSON

    //   const updatedJsonData = JSON.stringify(blobContent, null, 2);
    //   return new Response(updatedJsonData, { status: 200 });
    // }

    // Upload the updated JSON data to the blob
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

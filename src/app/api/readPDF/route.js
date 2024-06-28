//fetch the JSON data from the blob storage based on the folder name and file name
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) { 
  const dataJson = await request.json();
  const { folderName, fileName } = dataJson;

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  // jsondata is container name which storage the data by folder
  const containerName = "pdf";
  const subContainerName = "donottouch";
  const mainContainerName = process.env.DIRECTORY_NAME;

  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(`${mainContainerName}/${containerName}`);

    const blockBlobClient = containerClient.getBlockBlobClient(
      `${subContainerName}/${folderName}/${fileName}`
    );
    const blobExists = await blockBlobClient.exists();

    if (blobExists) {
        
      //   // Blob exists, fetch its content
      // Download the PDF blob content
      const response = await blockBlobClient.downloadToBuffer();
      //   console.log("response", response);

      // Parse the PDF content
      return new Response(response, { status: 200 });
    } else {
      return new Response("Blob does not exist", { status: 203 });
    }
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

// fetch the data from the blob storage, combine them and return the data to the frontend
// data contain the file name and the folder name and verified data
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const folderName = await request.json();

  const mainContainerName = process.env.CONTAINER_NAME;


  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  const containerName = "websiteinfo";

  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(`${mainContainerName}/${containerName}`);

    let combinedData = [];
    await Promise.all(
      folderName.map(async (folderName) => {
        // Generate a blob name based on the folder name
        const blobName = `fileStatus/${folderName}.json`;

        // Get the blockBlobClient for the generated blobName
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Check if the blob already exists
        const blobExists = await blockBlobClient.exists();

        if (blobExists) {
          // Blob exists, fetch its content
          const response = await blockBlobClient.downloadToBuffer();
          const blobContent = JSON.parse(response.toString()); // Assuming the content is JSON
          combinedData = [...combinedData, ...blobContent];
        }
      })
    );

    if (combinedData.length === 0) {
      return new Response("No data", { status: 203 });
    }

    const updatedJsonData = JSON.stringify(combinedData, null, 2);

    // Upload the updated JSON data to the blob

    return new Response(updatedJsonData, { status: 200 });

   
  } catch (error) {
    console.error("Caught an outside error:", error);
    return new Response(error.message, { status: 500 });
  }
}

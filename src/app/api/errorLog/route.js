// fetch error log from azure blob storage
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  const folderName = await request.json();

  try {
    const SAS_URL = process.env.NEXT_PUBLIC_SAS_URL;

    const blobService = new BlobServiceClient(SAS_URL);

    const containerClient = blobService.getContainerClient("errorLog");
    let combinedData = [];
    // Generate a blob name based on the folder name
    await Promise.all(
      folderName.map(async (folderName) => {
        // Generate a blob name based on the folder name
        const blobName = `${folderName}.json`;

        // Get the blockBlobClient for the generated blobName
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Check if the blob already exists
        const blobExists = await blockBlobClient.exists();

        if (blobExists) {
          // Blob exists, fetch its content
          const response = await blockBlobClient.downloadToBuffer();
          const blobContent = JSON.parse(response.toString()); // Assuming the content is JSON
          // console.log(blobContent);
          combinedData = [...combinedData, ...blobContent];
        }
      })
    );
    // Convert the updated data to JSON string
    if (combinedData.length === 0) {
      return new Response("No data", { status: 203 });
    }

    const updatedJsonData = JSON.stringify(combinedData, null, 2);

    // Upload the updated JSON data to the blob

    return new Response(updatedJsonData, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

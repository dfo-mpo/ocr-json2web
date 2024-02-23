import { BlobServiceClient } from "@azure/storage-blob";

export async function GET() {

  // You need to set up these variables with your values
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = "jsondata";
  try {
    // Create a BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);
    // List blobs in the container
    let dataObject = [];

    
    for await (const blob of containerClient.listBlobsFlat()) {
      const fullFileName = blob.name;
      let [folderName, fileName] = fullFileName.split("/");
      dataObject.push({ folderName, fileName });
      // const extension = fullFileName.split('.').pop();
      // const blobClient = containerClient.getBlobClient(blob.name);

      // Download blob content

      /*   
      const downloadBlockBlobResponse = await blobClient.download();  
      const readableStream = downloadBlockBlobResponse.readableStreamBody;  
      // Convert the readableStream to buffer  
      const stream = new streamBuffers.WritableStreamBuffer();  
      readableStream.pipe(stream);  
      stream.on('finish', () => {  
        // Once the download finishes, read the content as a JSON object  
        const buffer = stream.getContents();  
        try {  
          const jsonObject = JSON.parse(buffer.toString());  
          // Do something with the JSON object  
          console.log(jsonObject);  
        } catch (error) {  
          console.error(`Error parsing JSON from blob: ${blob.name}`, error);  
        }  
      });  
    */
    }


    const updatedJsonData = JSON.stringify(dataObject, null, 2);
 

    // Upload the updated JSON data to the blob

    return new Response(updatedJsonData, { status: 200 });
  } catch (error) {
    console.error("Error reading response:", error);
    return new Response(error.message, { status: 500 });
  }
}

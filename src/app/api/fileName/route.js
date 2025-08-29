// fetch the data from the blob storage, combine them and return the data to the frontend
// data contain the file name and the folder name and verified data
import { getBlobServiceClient } from "../../server/storage";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {

  // jsondata is container name which storage the data by folder

  const mainContainerName = process.env.DIRECTORY_NAME;

  const containerName = "json";
  // const subContainerName = "jsondatamodified";
  try {
    // Create a BlobServiceClient
    const blobServiceClient = getBlobServiceClient();
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(mainContainerName
    );
    // List blobs in the container
    let dataObject = [];
    const directoryPath = "json/jsondatamodified/"

    for await (const blob of containerClient.listBlobsFlat({ prefix: directoryPath })) {
      const fullFileName = blob.name;

      let [json,jsondatamodified, folderName, fileName] = fullFileName.split("/");
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

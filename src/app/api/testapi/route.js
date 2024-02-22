import { BlobServiceClient } from "@azure/storage-blob";

export async function GET() {
    console.log("runing")
    // You need to set up these variables with your values  
    const connectionString = "DefaultEndpointsProtocol=https;AccountName=bc16website;AccountKey=u50+Xj9UpVh5QBH7o+cdnuwWqj60nWDTsb9ha3RlAioMXDR+N9GRrlw+ROoUBB4ZZkk7JsgYq/0m+AStLMFemA==;EndpointSuffix=core.windows.net";  
    const containerName = "jsondata";  
    // Create a BlobServiceClient  
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);  
    // Get a container client from the BlobServiceClient  
    const containerClient = blobServiceClient.getContainerClient(containerName);  
    // List blobs in the container  
    for await (const blob of containerClient.listBlobsFlat()) {  
      const fullFileName = blob.name;  
      const extension = fullFileName.split('.').pop();  
      const blobClient = containerClient.getBlobClient(blob.name);  
      // Download blob content  
      console.log(blob.name);
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
  }

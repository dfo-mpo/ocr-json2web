import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    const { fileName, folderName, jsonData } = await request.json();

    const SAS_URL = process.env.NEXT_MODIFY_SAS_URL;
    const blobService = new BlobServiceClient(SAS_URL);
    const containerClient = blobService.getContainerClient(folderName);
    //connect to errorLog container
    const SAS_URL_ErrorLog = process.env.NEXT_PUBLIC_SAS_URL;
    const blobServiceErrorLog = new BlobServiceClient(SAS_URL_ErrorLog);
    const containerClientErrorLog =
      blobServiceErrorLog.getContainerClient("errorLog");
    const blobNameErrorLog = `${folderName}.json`;
    const blockBlobClientErrorLog =
      containerClientErrorLog.getBlockBlobClient(blobNameErrorLog);
    const blobExistsErrorLog = await blockBlobClientErrorLog.exists();

    const errorData = [
      {
        folderName: folderName,
        fileName: fileName,
        errorInfo: [
          {
            errorField: "Other",
            errorDescription: "Modified json file, pending verification",
          },
        ],
        isModified: true,
        error: true,
      },
    ];
    if (blobExistsErrorLog) {
      const existingData = await blockBlobClientErrorLog.downloadToBuffer();
      const existingJson = existingData.toString();
      // Parse the existing JSON data
      let existingJsonArray;
      try {
        existingJsonArray = JSON.parse(existingJson);
      } catch (error) {
        return;
      }

      // const newData = existingJsonArray.map((item) => {
      //   if (item.fileName === fileName) {
      //     return {
      //       ...item,
      //       isModified: true,
      //       error: true,
      //       errorInfo: [
      //         ...item.errorInfo,
      //         {
      //           errorField: "other",
      //           errorDescription: "Modified json file, pending verification",
      //         },
      //       ],
      //     };
      //   }
      //   return item;
      // });

      let fileExists = false;
      existingJsonArray.forEach((item) => {
        if (item.fileName === fileName) {
          // If the fileName exists, append the error info
          item.isModified = true;
          item.error = true;
          item.errorInfo.push({
            errorField: "Other",
            errorDescription: "Modified json file, pending verification",
          });
          fileExists = true;
        }
      });

      if (!fileExists) {
        existingJsonArray = [...existingJsonArray, ...errorData];
      }
      // Convert the updated data to JSON string
      const updatedJsonData = JSON.stringify(existingJsonArray, null, 2);

      try {
        await blockBlobClientErrorLog.upload(
          updatedJsonData,
          updatedJsonData.length
        );
      } catch (error) {
        console.error("Caught an uploading error:", error);
        return new Response(error.message, { status: 500 });
      }
    } else {
      const updatedJsonData = JSON.stringify(errorData, null, 2);
      await blockBlobClientErrorLog.upload(
        updatedJsonData,
        updatedJsonData.length
      );
    }

    // Check if the blob already exists

    // Generate a blob name based on the folder name
    const blobName = fileName;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Check if the blob already exists
    const blobExists = await blockBlobClient.exists();
    const updatedJsonData = JSON.stringify(jsonData, null, 2);
    if (blobExists) {
      // Trim ".json" from fileName
      const trimmedFileName = fileName.replace(".json", "");

      // Generate a blob name based on the trimmed fileName and append Date.now()
      const newBlobName = `${trimmedFileName}_${Date.now()}.json`;
      const newBlockBlobClient =
        containerClient.getBlockBlobClient(newBlobName);
      await newBlockBlobClient.upload(updatedJsonData, updatedJsonData.length);
    } else {
      await blockBlobClient.upload(updatedJsonData, updatedJsonData.length);
    }

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Caught an error:", error);
    return new Response(error.message, { status: 500 });
  }
}

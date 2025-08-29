import { DefaultAzureCredential, ClientSecretCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName && !process.env.AZURE_STORAGE_CONNECTION_STRING) throw new Error('AZURE_STORAGE_ACCOUNT_NAME is required');

const accountUrl = `https://${accountName}.blob.core.windows.net`;

const tenantID = process.env.AZURE_SP_TENANT_ID;
const clientID = process.env.AZURE_SP_CLIENT_ID;
const secret = process.env.AZURE_SP_CLIENT_SECRET;

let blobServiceClient; // cached per process

function makeCredential() {
    if (clientID && secret && tenantID) {
        return new ClientSecretCredential(tenantID, clientID, secret);
    }
    // Useful locally (az login) and in Azure with Managed Identity
    return new DefaultAzureCredential();
}

export function getBlobServiceClient() {
    if (blobServiceClient) return blobServiceClient;

    if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
        blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    } else {
        const credential = makeCredential();
        blobServiceClient = new BlobServiceClient(accountUrl, credential);
    }
    return blobServiceClient;
}

export function getContainerClient(containerName) {
    return getBlobServiceClient().getContainerClient(containerName);
}
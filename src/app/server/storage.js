import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { BlobServiceClient } from "@azure/storage-blob";

const vaultUrl = process.env.KEY_VAULT_URL;
const secretName = process.env.STORAGE_CONN_STR_SECRET_NAME || "StorageConnectionString";

const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(vaultUrl, credential);

// If a storage connection string is provided then use it, otherwise will use the azure key vault
const storageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
if (!vaultUrl && !storageConnectionString) throw new Error("Missing KEY_VAULT_URL and AZURE_STORAGE_CONNECTION_STRING, must provide one of the 2.");

// Simple in-memory cache with TTL
let cached = { value: null, expiresAt: 0 };
let inflight = null;
const DEFAULT_TTL_MS = Number(process.env.KV_SECRET_TTL_MS || 10 * 60 * 1000);

export async function getStorageConnectionString(ttlMs = DEFAULT_TTL_MS) {
    const now = Date.now();
    if (cached.value && now < cached.expiresAt) return cached.value;
    if (inflight) return inflight;

    if (storageConnectionString) inflight = storageConnectionString;
    else inflight = secretClient.getSecret(secretName).then(s => {
        if (!s.value) throw new Error(`Secret ${secretName} has no value`);
            cached = { value: s.value, expiresAt: Date.now() + ttlMs };
            return s.value;
    }).finally(() => { inflight = null; });

    return inflight;
}

export async function getBlobServiceClient() {
    const conn = await getStorageConnectionString();
    return BlobServiceClient.fromConnectionString(conn);
}
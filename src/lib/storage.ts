import fs from "fs/promises";
import path from "path";

export type StorageBackend = "local" | "s3";

const backend: StorageBackend =
  (process.env.STORAGE_BACKEND as StorageBackend) || "local";

const PRIVATE_ROOT = path.join(process.cwd(), "storage", "private");

export async function uploadPrivateFile({
  buffer,
  filename,
  contentType,
  folder,
}: {
  buffer: Buffer;
  filename: string;
  contentType: string;
  folder: string;
}) {
  if (backend === "s3") {
    throw new Error(
      "S3 storage backend requires @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner packages. Install them or use STORAGE_BACKEND=local."
    );
  }

  const dir = path.join(PRIVATE_ROOT, folder);
  await fs.mkdir(dir, { recursive: true });
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = path.join(dir, `${Date.now()}_${safe}`);
  await fs.writeFile(filePath, buffer);
  return {
    url: `/api/storage/private/${encodeURIComponent(path.relative(PRIVATE_ROOT, filePath))}`,
    key: filePath,
    size: buffer.length,
    contentType,
  };
}

export async function deleteFile(key: string) {
  if (backend === "s3") {
    throw new Error(
      "S3 storage backend requires @aws-sdk/client-s3 package. Install it or use STORAGE_BACKEND=local."
    );
  }
  try {
    await fs.unlink(path.isAbsolute(key) ? key : path.join(PRIVATE_ROOT, key));
  } catch {
    // ignore missing
  }
}

export function privateFileUrl(key: string): string {
  return `/api/storage/private/${encodeURIComponent(key)}`;
}

import { Storage } from "@google-cloud/storage";

const storage = new Storage();

const bucket = storage.bucket("matching-day-bucket");

export async function uploadToGCS(file: File): Promise<string> {
  const { name: originalname, buffer } = file;

  const blob = bucket.file(originalname.replace(/ /g, "_"));
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true,
  });

  return new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.end(buffer);
  });
}

export function getOriginalVideoFilePath(filePath: string): string {
  const file = filePath.split(`/hd.mp4`)[0];
  return `${file}.webm`
}

export async function hasVideoFromGCS(filePath: string) {
    const file = filePath.split(`${bucket.name}/`)[1];
    if (!file) {
      return false;
    } 
    const blob = bucket.file(file);
    return (await blob.exists())[0];
}

export async function deleteFromGCS(filePaths: string[]): Promise<string[]> {
  const failedDeletions: string[] = [];
  const promises = filePaths.map((filePath) => {
    const file = filePath.split(`${bucket.name}/`)[1];
    if (!file) {
      failedDeletions.push(filePath);
      return;
    } 
    const blob = bucket.file(file);
    return blob.delete();
  });

  await Promise.all(promises);

  return failedDeletions;
}

interface File {
  name: string;
  buffer: Buffer;
}

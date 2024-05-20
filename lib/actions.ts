"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Jimp from "jimp";

const s3Client = new S3Client({
  region: process.env.DB_NEXT_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.DB_NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.DB_NEXT_AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName, contentType) {
  try {
    const params = {
      Bucket: process.env.DB_NEXT_AWS_BUCKET_NAME,
      Key: `${fileName}`,
      Body: file,
      ContentType: contentType,
    };

    // Ensure headers are strings
    for (const headerName in params) {
      if (typeof params[headerName] !== 'string') {
        params[headerName] = String(params[headerName]);
      }
    }

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return fileName;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}

export async function uploadFile(formData) {
  try {
    const file = formData.get("file");

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let fileName = file.name; // Get the filename from the file object
    let contentType = file.type; // Get the content type from the file object

    let processedBuffer = buffer;

    // Check if the file is an AVIF image and convert if necessary
    if (contentType === 'image/avif') {
      const image = await Jimp.read(buffer);
      processedBuffer = await image
        .resize(800, 400)
        .quality(50) // Adjust the quality of the JPEG output
        .getBufferAsync(Jimp.MIME_JPEG);
      fileName = fileName.replace(/\.[^/.]+$/, ".jpg"); // Change the file extension to .jpg
      contentType = "image/jpeg"; // Set the content type to image/jpeg
    } else {
      const image = await Jimp.read(buffer);
      processedBuffer = await image
        .resize(800, 400)
        .getBufferAsync(Jimp.AUTO); // This will automatically set the format
      contentType = Jimp.AUTO;
    }

    await uploadFileToS3(processedBuffer, fileName, contentType); // Upload the file to S3

    revalidatePath("/");
    return { status: "success", message: "File has been uploaded.", fileName };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Failed to upload file." };
  }
}

export async function uploadEditorFile(content, fileName) {
  try {
    const params = {
      Bucket: process.env.DB_NEXT_AWS_BUCKET_NAME,
      Key: fileName,
      Body: content,
      ContentType: "text/plain", // Set the content type to plain text
    };

    // Ensure headers are strings
    for (const headerName in params) {
      if (typeof params[headerName] !== 'string') {
        params[headerName] = String(params[headerName]);
      }
    }

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return response;
  } catch (error) {
    console.error("Error uploading editor file to S3:", error);
    throw error;
  }
}

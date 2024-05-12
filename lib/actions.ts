"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Jimp from "jimp";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  try {
    const image = await Jimp.read(file); // Read the file as an image with Jimp
    await image.quality(50); // Set the image quality to 50%
    await image.resize(800, 400); // Resize the image to 800x400

    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG); // Get the image buffer in JPEG format

    const params = {
      Bucket: process.env.NEXT_AWS_BUCKET_NAME,
      Key: `${fileName}`,
      Body: buffer,
      ContentType: "image/jpeg", // Set the content type to image/jpeg
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return fileName;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(formData) {
  try {
    console.log(formData)
    const file = formData.get("file");

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = file.name; // Get the filename from the file object

    await uploadFileToS3(buffer, fileName); // Upload the file to S3

    revalidatePath("/");
    return { status: "success", message: "File has been uploaded." ,fileName};
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Failed to upload file." };
  }
}

export async function uploadEditorFile(content, fileName) {
  try {
      const params = {
          Bucket: process.env.NEXT_AWS_BUCKET_NAME,
          Key: fileName,
          Body: content,
          ContentType: "text/plain", // Set the content type to plain text
      };

      const command = new PutObjectCommand(params);
      const response = await s3Client.send(command);

      return response;
  } catch (error) {
      throw error;
  }
}
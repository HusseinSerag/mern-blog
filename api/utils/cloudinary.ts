import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function uploadToCloudinary(
  file: Express.Multer.File,
  options?: UploadApiOptions
) {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function deleteFromCloudinary(id: string) {
  try {
    await cloudinary.uploader.destroy(id);
  } catch (e) {
    throw e;
  }
}

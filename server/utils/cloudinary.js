import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.configDotenv();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudTestName = process.env.CLOUDINARY_CLOUD_NAME;
console.log(cloudTestName, "cloudTestNmae");
console.log(process.env.CLOUDINARY_CLOUD_NAME, "name");
console.log(process.env.CLOUDINARY_API_KEY, "key");
console.log(process.env.CLOUDINARY_API_SECRET, "secret");

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully", response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Error uploading file", error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId, { resource_type: "image" });
    console.log("File deleted successfully from Cloudinary");
  } catch (error) {
    console.error("Error deleting file from Cloudinary", error);
  }
};

export const getCloudinaryPublicId = (url) => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart.split(".")[0];
};

export const uploadMultipleImagesOnCloudinary = async (localFilePaths) => {
  try {
    if (!localFilePaths || !Array.isArray(localFilePaths)) return [];

    const uploadPromises = localFilePaths.map((filePath) =>
      cloudinary.v2.uploader.upload(filePath, { resource_type: "auto" })
    );

    const responses = await Promise.all(uploadPromises);

    // Clean up local files
    console.log("localFilePaths", localFilePaths);
    localFilePaths.forEach((filePath) => {
      try {
        fs.unlinkSync(filePath);
        console.log("File deleted successfully locally");
      } catch (err) {
        console.error("Error deleting local file", err);
      }
    });

    console.log("Files uploaded successfully", responses);
    return responses;
  } catch (error) {
    console.error("Error uploading files", error);

    // Clean up local files in case of an error
    localFilePaths.forEach((filePath) => {
      try {
        fs.unlinkSync(filePath);
        console.log("File deleted successfully locally");
      } catch (err) {
        console.error("Error deleting local file", err);
      }
    });

    return [];
  }
};

export const getCloudinaryPublicIds = (urls) => {
  return urls.map((url) => {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    return lastPart.split(".")[0];
  });
};

export const deleteMultipleImageFromCloudinary = async (publicIds) => {
  try {
    const deletePromises = publicIds.map((publicId) =>
      cloudinary.v2.uploader.destroy(publicId, { resource_type: "image" })
    );
    const deleteResults = await Promise.all(deletePromises);
    console.log("Files deleted successfully from Cloudinary", deleteResults);
  } catch (error) {
    console.error("Error deleting files from Cloudinary", error);
    throw error;
  }
};

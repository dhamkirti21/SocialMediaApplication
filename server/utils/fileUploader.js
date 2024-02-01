import * as cloudinary from "cloudinary";
import fs from "fs";

const fileUploader = async (fileBuffer, originalName) => {
  try {
    const tempPath = `temp-${originalName}-${Date.now()}.jpg`;

    fs.writeFileSync(tempPath, fileBuffer);
    const newFile = await cloudinary.uploader.upload(tempPath);
    //file deletion
    fs.unlinkSync(tempPath);
    return newFile;
  } catch (error) {
    throw new Error(`Error While Uploading Image: ${error}`);
  }
};

export default fileUploader;

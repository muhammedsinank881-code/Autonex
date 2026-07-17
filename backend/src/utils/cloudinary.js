import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (
  filePath,
  folder
) => {
  const result =
    await cloudinary.uploader.upload(
      filePath,
      {
        folder,
        resource_type: "image",
      }
    );

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export const deleteFromCloudinary =
  async (publicId) => {
    if (!publicId) return;

    await cloudinary.uploader.destroy(
      publicId
    );
  };
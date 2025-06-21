import {v2 as cloudinary} from 'cloudinary'
import { asyncHandler } from '../utils/asyncHandler.js'

const connectCloudinary = asyncHandler(async () => {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,

    })
}
);
export default connectCloudinary

// ✅ Add this export if needed
export const deleteFromCloudinary = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw error;
    }
  };
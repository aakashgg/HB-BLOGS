// middleware/config.js
import dotenv from "dotenv";
dotenv.config();

export const PORTNO = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const JWT_SECRET = process.env.SECRET;

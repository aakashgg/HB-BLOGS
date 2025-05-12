import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// ✅ Hardcoded Cloudinary credentials
cloudinary.config({
    cloud_name: "dyea2nd8t",
    api_key: "759459336123969",
    api_secret: "5jFv6Y3LJ0J75aDnyp_v00ESTh4",
});


// ✅ Cloudinary storage engine
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const fileExt = file.originalname.split(".").pop();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
        return {
            folder: "uploads",
            allowed_formats: ["jpg", "jpeg", "png", "webp"],
            public_id: uniqueName,
        };
    },
});

// ✅ Multer middleware
export const singleUpload = multer({ storage }).single("image");

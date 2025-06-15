import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const configureCloudinary = () => {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary configured with:", {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY ? "set" : "missing",
        api_secret: process.env.API_SECRET ? "set" : "missing",
    });
};
export default configureCloudinary;

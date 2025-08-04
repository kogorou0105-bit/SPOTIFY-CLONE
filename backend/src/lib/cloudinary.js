import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const cloudinary_URL = process.env.CLOUDINARY_URL;
const parsedUrl = new URL(cloudinary_URL);
console.log("cloud_name:", parsedUrl.hostname);
console.log("api_key:", parsedUrl.username);
console.log("api_secret:", parsedUrl.password);
cloudinary.config({
  cloud_name: parsedUrl.hostname,
  api_key: parsedUrl.username,
  api_secret: parsedUrl.password,
  secure: true, // 推荐启用 HTTPS
});
export default cloudinary;

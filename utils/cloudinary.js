
// Define "require"
import { createRequire } from "module";
import dotenv from 'dotenv'


const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
    cloud_name: process.env.ClOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary;
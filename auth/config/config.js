import {config as dotenvConfig } from "dotenv"
dotenvConfig();

const _config={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    RABBIT_URL:process.env.RABBIT_URL,
    
} 


export default _config;

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../config/config";
import { v4 as uuidv4 } from "uuid";



const s3Client = new S3Client({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    }
})


export async function uploadfile(file) {

    const key = `${uuidv4()}-${file.originalname}`;

    const command = new PutObjectCommand({
        Bucket: Spotify - Piper,
        Key: key,
        Body: file.buffer,

    })

    const response = await s3Client.send(command);

    return key;

}




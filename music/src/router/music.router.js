import express from 'express';
import multer from 'multer';
import * as MusicController from "../controller/music.controller.js"




const upload = multer({
    storage: multer.memoryStorage()

})

const uploadfields = upload.fields([{ name: "music", maxCount: 1 }, { name: "coverimage", maxCount: 1 }])

const router = express.Router();


router.post('/upload', uploadfields, MusicController.musicUpload)



export default router;
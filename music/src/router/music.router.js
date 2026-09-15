import express from 'express';
import multer from 'multer';
import * as MusicController from "../controller/music.controller.js"
import { authArtistMiddleware } from '../middleware/auth.middleware.js';



const upload = multer({
    storage: multer.memoryStorage()

})

const uploadfields = upload.fields([{ name: "music", maxCount: 1 }, { name: "coverimage", maxCount: 1 }])

const router = express.Router();


router.post('/upload', authArtistMiddleware, uploadfields, MusicController.musicUpload)
router.get('/artist-musics', authArtistMiddleware, MusicController.getArtistMusic)



export default router;
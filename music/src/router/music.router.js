import express from 'express';
import multer from 'multer';
import * as MusicController from "../controller/music.controller.js"
import * as authMiddleware from '../middleware/auth.middleware.js';



const upload = multer({
    storage: multer.memoryStorage()

})

const uploadfields = upload.fields([{ name: "music", maxCount: 1 }, { name: "coverimage", maxCount: 1 }])

const router = express.Router();


router.post('/upload', authMiddleware.authArtistMiddleware, uploadfields, MusicController.musicUpload)
router.get('/', authMiddleware.authmiddleware, MusicController.getAllMusic)
router.get("/music-details/:id", authMiddleware.authmiddleware, MusicController.getMusicById)
router.get('/artist-musics', authMiddleware.authArtistMiddleware, MusicController.getArtistMusic)

router.post('/create-playlist', authMiddleware.authArtistMiddleware, MusicController.createPlaylist)
router.get('/playlist', authMiddleware.authmiddleware, MusicController.getPlaylist)
router.get('/playlist/:id', authMiddleware.authmiddleware, MusicController.getPlaylistById)

export default router;
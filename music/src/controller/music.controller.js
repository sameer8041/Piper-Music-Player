import { uploadfile } from "../services/storage.service.js"
import musicModel from "../model/music.model.js"


export async function musicUpload(req, res) {
    const musicFile = req.files.music[0];
    const coverImageFile = req.files.coverimage[0];

    if (!musicFile || !coverImageFile) {
        return res.status(400).json({
            message: "Both music and cover image are required"
        })
    }

    try {

        const musicKey = await uploadfile(musicFile);
        const coverImageKey = await uploadfile(coverImageFile);

        const music = await musicModel.create({
            title: req.body.title,
            artist: `${req.user.fullname.firstname} ${req.user.fullname.lastname}`,
            artistId: req.user.id,
            musicKey,
            coverImageKey
        })

        return res.status(201).json({
            message: "Music uploaded successfully",
            music
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }



}
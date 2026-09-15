import { uploadfile, getPreSignedUrl } from "../services/storage.service.js"
import musicModel from "../model/music.model.js"
import playlistModel from "../model/playlist.model.js";


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

export async function getArtistMusic(req, res) {
    try {

        const musicdocs = await musicModel.find({ artistId: req.user.id }).lean();

        if (musicdocs.length == 0) {
            return res.status(404).json({
                message: "No music found"
            })
        }

        const musics = []

        for (let music of musicdocs) {
            music.musicUrl = await getPreSignedUrl(music.musicKey);
            music.coverImageUrl = await getPreSignedUrl(music.coverImageKey);
            musics.push(music)
        }

        return res.status(200).json({
            message: "Music fetched successfully",
            musics
        })

    } catch (error) {
        console.log("Error During Fetching Music", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export async function createPlaylist(req, res) {
    const { title, musics } = req.body;
    try {
        const playlist = await playlistModel.create({

            title,
            artist: `${req.user.fullname.firstname} ${req.user.fullname.lastname}`,
            artistId: req.user.id,
            userId: req.user.id,
            musics
        })


        return res.status(201).json({
            message: "Playlist created successfully",
            playlist
        })



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}
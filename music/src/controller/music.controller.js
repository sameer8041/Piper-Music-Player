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

export async function getPlaylist(req, res) {
    try {
        const playlists = await playlistModel.find({ userId: req.user.id });

        return res.status(200).json({
            message: "Playlist fetched successfully",
            playlists
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })

    }

}


export async function getAllMusic(req, res) {
    const { skip = 0, limit = 10 } = req.query;

    try {
        const musicdocs = await musicModel.find().skip(skip).limit(limit).lean();

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




export async function getPlaylistById(req, res) {
    const { id } = req.params;
    try {
        const playlistdoc = await playlistModel.findById(id).lean();

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found"
            })
        }


        const musics = []

        for (let musicId of playlistdoc.musics) {
            const playlistmusic = await musicModel.findById(musicId).lean();
            if (playlistmusic) {
                playlistmusic.musicUrl = await getPreSignedUrl(playlistmusic.musicKey);
                playlistmusic.coverImageUrl = await getPreSignedUrl(playlistmusic.coverImageKey);
                musics.push(playlistmusic)
            }
        }

        return res.status(200).json({
            message: "Playlist fetched successfully",
            playlist: playlistdoc,
            musics

        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        })

    }
}


export async function getMusicById(req, res) {

    const { id } = req.params;

    try {
        const music = await musicModel.findById(id).lean();

        if (!music) {
            return res.status(404).json({
                message: "Music not found"
            })
        }

        music.musicUrl = await getPreSignedUrl(music.musicKey);
        music.coverImageUrl = await getPreSignedUrl(music.coverImageKey);

        return res.status(200).json({
            message: "Music fetched successfully",
            music
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
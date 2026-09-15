import mongoose from "mongoose";


const playListSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music"
    }]

})


const playlistModel = mongoose.model("playlist", playListSchema);


export default playlistModel;
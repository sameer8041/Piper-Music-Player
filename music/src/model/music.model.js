import mongoose from "mongoose";


const musicSchema = mongoose.Schema({
    titile: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId

    },
    musicKey: {
        type: String,
        required: true
    },
    coverImageKey: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})



const musicModel = mongoose.model('music', musicSchema);


export default musicModel;



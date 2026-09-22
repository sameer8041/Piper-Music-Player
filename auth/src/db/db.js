import mongoose from "mongoose";
import config from "../../config/config.js"



async function connectdb() {
    try {
        await mongoose.connect(config.MONGO_URI)

        console.log("db Connected")

    } catch (err) {
        console.error("Error Connecting to db", err)
    }

}

export default connectdb;
import jwt from "jsonwebtoken";
import config from "../config/config.js"


export async function authArtistMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    try {

        const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY);

        if (decodedToken.role !== "artist") {
            return res.status(403).json({
                message: "Only artist can upload music"
            })
        }

        req.user = decodedToken
        next()


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

export async function authmiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    try {

        const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY);

        req.user = decodedToken
        next()


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}
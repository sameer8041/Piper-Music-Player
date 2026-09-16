import { Server } from "socket.io";
import cookie from "cookie"
import config from "../../config/config.js"


export function initSocket(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    io.use((socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "")
        const token = cookies.token
        if (!token) {
            return next(new Error("Unauthorized"))
        }
        try {
            const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY)
            socket.user = decodedToken
            next()
        } catch (error) {
            return next(new Error("Unauthorized"))
        }


    })

    io.on("connection", (socket) => {

        socket.join(socket.user.id)

        socket.on("play", (data) => {
            const musicId = data.musicId;
            io.broadcast.to(socket.user.id).emit("play", { musicId });
        })
        socket.on("disconnect", () => {
            socket.leave(socket.user.id)
        })

    })

}

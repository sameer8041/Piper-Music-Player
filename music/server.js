import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import initSocket from "./src/Socket/socket.service.js"
import http from "http";

connectDB();

const server = http.createServer(app);


initSocket(server);

server.listen(3002, () => {
    console.log("server run on the port 3002")
})
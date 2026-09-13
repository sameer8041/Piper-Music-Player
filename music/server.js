import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();


app.listen(3002,()=>{
    console.log("server run on the port 3002")
})
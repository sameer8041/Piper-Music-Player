import express from 'express'
import musicRoutes from './router/music.router.js'
import cookieParser from 'cookie-parser';
const app=express();
app.use(cookieParser());
app.use(express.json())


app.use('/api/music',musicRoutes)


export default app;
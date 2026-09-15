import express from 'express'
import musicRoutes from './router/music.router.js'
import cookieParser from 'cookie-parser';
const app = express();


app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/music', musicRoutes)


export default app;
import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import router from './routes.js';
import db from './db.js';
import cors from 'cors';
// import router from './routes/index.js';

dotenv.config();
const app = express();
const port = 8083;

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database connected..');
        // await Users.sync();
    } catch (error) {
        console.error(error);
    }
    app.use(cors({
        origin: '*',  
        credentials: true,  
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use('/', router);
    

    app.listen(port, () => {
        console.log(`Server mendengarkan pada port ${port}`);
    });
};

startServer();  

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import router from './router';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config()

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

app.get ("/", (req, res) => {res.json("Kalinga Backend")})

const MongDB_URL = process.env.MONGO_DB_ATLAS_URL

if (!MongDB_URL) {
    throw new Error("MongoDB URL is not defined");
}

server.listen(7000,() => {
    console.log("Server Running on http://localhost:7000")
    if(MongDB_URL === process.env.MONGO_DB_LOCAL)
        console.log("MongoDB is running at localhost")
    else console.log("MongoDB is running at Atlas")
});

mongoose.Promise = Promise;
mongoose.connect(MongDB_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/kalinga', router());

export default app;
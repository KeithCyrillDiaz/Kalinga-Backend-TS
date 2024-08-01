console.log("Hello TS")

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
// import router from './router';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const app = express();

dotenv.config()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

const mongoDB = process.env.MONGODB_LOCAL_URL;


server.listen(8080, () => {
    console.log('Server is Running on http://localhost:8080/');
    if(mongoDB === process.env.MONGODB_LOCAL_URL){
        console.log("MongoDb is running in Localhost");
    } else {
        console.log("MongoDB is running in Atlas");
    }
})

mongoose.Promise = Promise;
mongoose.connect(mongoDB);
mongoose.connection.on('error', (error: Error) => console.log(error));



app.get("/", (req: express.Request, res: express.Response) => {res.json("Kalinga Backend")} )

// app.use('/', router())
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import cors from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'
import threadsRoutes from './routes/threadsRoutes'
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/user',userRoutes);
app.use('/threads',threadsRoutes);

mongoose.connect((process.env.MONGO_URI || "")).then(() =>{
    app.listen(process.env.PORT, () => {
        console.log('listening to port 3000')
    })
})

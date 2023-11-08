import dotenv from 'dotenv'
import express from 'express'
dotenv.config();

const app = express();

app.get('/');

app.listen(3000, () => {
    console.log('listening to port 3000')
})
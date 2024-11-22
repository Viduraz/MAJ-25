import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGOURI).then( () => {
    console.log('DB connected Successfully');
}).catch( (Err) => {
    console.log(err);
});

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 4000');
    });
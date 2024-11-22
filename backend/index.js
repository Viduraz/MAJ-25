import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';

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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes); 
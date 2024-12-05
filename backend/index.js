import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import scoutRoutes from './routes/registration.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

mongoose.connect(process.env.MONGOURI).then( () => {
    console.log('DB connected Successfully');
}).catch( (Err) => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registration", scoutRoutes);

app.use(function(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
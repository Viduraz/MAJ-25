import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import activityRoutes from './routes/activity.routes.js';
import scoutRoutes from './routes/registration.routes.js';
import adminRoutes from './routes/adminadd.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

mongoose.connect(process.env.MONGOURI).then(() => {
    console.log('DB connected Successfully');
}).catch((err) => {
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
app.use("/api/activity", activityRoutes);
app.use("/api/admin", adminRoutes);

app.use(function(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
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
app.use(cors({
  origin: ['http://localhost:5173', 'https://maj2025.com', 'http://maj2025.com', 'http://35.232.49.147:5173'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('🎉 Backend is working!');
});

app.get('/api/news', (req, res) => {
    const news = [
        {
            title: "MAJ 2025 Registration Now Open",
            description: "Join us for the biggest scouting event of the year! Early bird registration is now available for Your Troop registrations.",
            image: "https://storage.googleapis.com/your-bucket/Registration_Open.jpg"
        },
        {
            title: "Sirasa TV Holiday Adventure",
            description: "Tune in to Sirasa TV this weekend for a special holiday adventure featuring the MAJ 2025 organizing committee.",
            image: "https://storage.googleapis.com/your-bucket/SIRASATV.jpg"
        },
        {
            title: "Volunteer Opportunities",
            description: "We're looking for experienced scouts and Rovers to volunteer as activity coordinators and team leaders during the jamboree.",
            image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1000&auto=format&fit=crop"
        }
    ];
    
    res.json(news);
});

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
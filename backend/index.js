import dotenv from 'dotenv';
import connectDB from './config/db.js';
import express from 'express';

dotenv.config();

// Make the initialization async
const init = async () => {
    try {
        await connectDB(); // Wait for the connection
        
        const app = express();
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
};

init(); // Run the async initialization
  
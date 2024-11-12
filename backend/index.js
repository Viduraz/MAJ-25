import express from 'express';

// Load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()) 
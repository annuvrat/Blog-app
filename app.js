import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import { errorHandler } from './helpers/errorHandler.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

// Connect Database
connectDB();


app.use(cookieParser());

// Middleware
app.use(express.json());
app.get('/', (req, res) => {
    res.send('hiii');
});
// Routes
app.use('/api/', authRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

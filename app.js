import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import { errorHandler } from './helpers/errorHandler.js';
import authRoutes from './routes/authRoute.js';
import blogRoutes from './routes/blogRoute.js';
import cookieParser from 'cookie-parser';
import refreshTokenRoutes from './routes/tokenRoute.js'
dotenv.config();

const app = express();
app.use(express.json());

connectDB();


app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/token', refreshTokenRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

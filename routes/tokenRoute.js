import express from 'express';
import jwt from 'jsonwebtoken';
import UserToken from '../models/UserToken.js'; 
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/refresh', async (req, res) => {
    const { refresh_token } = req.cookies; // Get refresh token from cookies
    if (!refresh_token) return res.status(403).json({ error: 'No refresh token provided.' });

    try {
        
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
     
        const userToken = await UserToken.findOne({ userId: decoded.id, token: refresh_token });
        
        if (!userToken || userToken.used || userToken.expiresAt < Date.now()) {
            return res.status(403).json({ error: 'Invalid or expired refresh token.' });
        }

       
        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired refresh token.' });
    }
});

export default router;

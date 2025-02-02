// authMiddleware.js
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../helpers/errorResponse.js';
import User from '../models/User.js';
import UserToken from '../models/UserToken.js'; 
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        if (!req.cookies) return res.status(401).json({ success: false, message: 'No cookies found.' });

        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ success: false, message: 'User not found.' });

        req.user = { userId: user._id }; 

        next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const refreshToken = req.cookies.refresh_token;
            if (!refreshToken) return res.status(401).json({ success: false, message: 'Refresh token not available.' });

            try {
             
                const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

             
                const userToken = await UserToken.findOne({ userId: decodedRefresh.id, token: refreshToken });
                if (!userToken) return res.status(401).json({ success: false, message: 'Invalid refresh token.' });

                const newAccessToken = jwt.sign({ id: decodedRefresh.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000 // 15 minutes
                });

            
                req.user = { userId: decodedRefresh.id }; 

                next(); 
            } catch (refreshError) {
                return res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Invalid or expired access token.' });
        }
    }
};

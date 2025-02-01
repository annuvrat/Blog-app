import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../helpers/errorResponse.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.access_token; // Change here to get token from cookie
        if (!token) return ErrorResponse.unauthorized(res, 'Access denied. No token provided.');
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user without password field
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return ErrorResponse.unauthorized(res, 'User not found.');
        
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return ErrorResponse.unauthorized(res, 'Invalid or expired token.');
    }
};

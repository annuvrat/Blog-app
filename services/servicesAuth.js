import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import dotenv from 'dotenv';
import UserToken from '../models/UserToken.js'; 

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secrets must be defined in environment variables.');
}

export const authService = {
    register: async (username, email, password) => {
        const userExists = await User.findOne({ email });
        if (userExists) throw new Error('User already exists');
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({ username, email, password: hashedPassword });
        return user;
    },

    login: async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid credentials');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        await UserToken.create({ userId: user._id, token: refreshToken, expiresAt });

        return { accessToken, refreshToken };
    },

    logout: () => {
        return 'Logout successful';
    }
};

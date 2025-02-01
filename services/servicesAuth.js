import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Change to default import
import dotenv from 'dotenv';

dotenv.config();

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
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    },

    logout: () => {
        return 'Logout successful';
    }
};

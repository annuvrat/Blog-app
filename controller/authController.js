import { authService } from '../services/servicesAuth.js';
import { SuccessResponse } from '../helpers/successResponse.js';
import { ErrorResponse } from '../helpers/errorResponse.js';

export const authController = {
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const user = await authService.register(username, email, password);
            return SuccessResponse.created(res, user, 'User registered successfully');
        } catch (error) {
            return ErrorResponse.badRequest(res, error.message);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);

            // Set the JWT in an HTTP-only cookie
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hour
            });

            return SuccessResponse.ok(res, null, 'Login successful');
        } catch (error) {
            return ErrorResponse.unauthorized(res, error.message);
        }
    },

    logout: (req, res) => {
        res.clearCookie('access_token');
        return SuccessResponse.ok(res, null, 'Logout successful');
        
    }
};

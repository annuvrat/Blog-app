import { authService } from '../services/servicesAuth.js';
import { SuccessResponse } from '../helpers/successResponse.js';
import { ErrorResponse } from '../helpers/errorResponse.js';
import UserToken from '../models/UserToken.js';
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
            const { accessToken, refreshToken } = await authService.login(email, password);


            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV,
                maxAge: 25 * 60 * 1000 // 25 minutes
            });


            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            return SuccessResponse.ok(res, null, 'Login successful');
        } catch (error) {
            return ErrorResponse.unauthorized(res, error.message);
        }
    },


    logout: async (req, res) => {
        const { refresh_token } = req.cookies;

        if (refresh_token) {
            await UserToken.deleteOne({ token: refresh_token });
        }

        res.clearCookie('access_token');
        res.clearCookie('refresh_token');

        return SuccessResponse.ok(res, null, 'Logout successful');
    }
};

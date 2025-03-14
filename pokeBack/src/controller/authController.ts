import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import AppError from '../errors/AppError';

const authService = new AuthService();

export const loginController = async (req: Request, res: Response) => {
    try {
        const { token } = await authService.login(req.body);
        return res.json({ token });
    } catch (error) {
        const err = error as AppError;
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

export const registerController = async (req: Request, res: Response) => {
    try {
        const { newTrainer } = await authService.register(req.body);
        return res.status(201).json({ newTrainer });
    } catch (error) {
        const err = error as AppError;
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

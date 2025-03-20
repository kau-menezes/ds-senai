import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import AppError from '../errors/AppError';

const authService = new AuthService();

export class AuthController {

    static loginController = async (req: Request, res: Response) => {


        try {
            const id = await authService.login(req.body);
            res.json({ id });
        } catch (error) {
            const err = error as AppError;
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    };
    
    static registerController = async (req: Request, res: Response) => {
        try {
            const { newTrainer } = await authService.register(req.body);
            res.status(201).json({ newTrainer });
        } catch (error) {
            const err = error as AppError;
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    };
}


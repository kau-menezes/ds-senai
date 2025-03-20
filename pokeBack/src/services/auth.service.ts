import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import AppError from '../errors/AppError';
import { ILoginPayload, IRegisterPayload } from '../interface/dto/auth/auth.dto';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export default class AuthService {

    // Login functionality
    async login({ email, password }: ILoginPayload) {
        
        const trainer = await prisma.trainer.findUnique({
            where: { email },  
        });
    
        if (!trainer) {
            throw new AppError('Trainer not found', 404);
        }
    
        const isPasswordValid = await bcrypt.compare(password, trainer.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }
        const token = sign(
            { userId: trainer.id }, 
            process.env.JWT_SECRET_KEY as string
        );
    
        return { token };
    }

    async register({ email, password, name }: IRegisterPayload) {
        const existingTrainer = await prisma.trainer.findUnique({
            where: { email }
        });

        if (existingTrainer) {
            throw new AppError('Trainer already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTrainer = await prisma.trainer.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        return { newTrainer };
    }
}

import pkg, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import AppError from '../AppError.ts';
const { verify } = pkg;

interface IToken {
    id?: string, 
    userType?: string
}


export async function validateToken(req: Request, res: Response, next: NextFunction) {

    console.log("Token validation begin...")
    
    let token = req.headers.authorization;

    if (!token) {
        return next(new AppError('No token provided', 401));
    }

    token = token.replace("Bearer ", "")

    verify(
        token, 
        String(process.env.SECRET_KEY),


        (err, decoded) => {

            if (err) {
                throw new AppError(err.message, 401);
            }


            if (decoded) {

                const payload = decoded as JwtPayload;

                res.locals.userID = payload.id;
                res.locals.userType = payload.userType;
            } else {
                
                throw new AppError('Invalid token', 401);
            }
        }
    );


    next();
}
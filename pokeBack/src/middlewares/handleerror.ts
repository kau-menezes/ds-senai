import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError";

export default function handleError(err:Error, _req:Request, res:Response, next:NextFunction) {
    switch (err.constructor) {
        
        case AppError:
            const appError = err as AppError;
            return res.status(appError.statusCode).json({ message: err.message });

        default:
            if(process.env.NODE_ENV === "dev") console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
    }
}
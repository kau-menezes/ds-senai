import { NextFunction, Request, Response } from "express";
import AppError from "../AppError.ts";

export async function handleError(error: any, req: Request, res: Response, next: NextFunction) {

    if(error instanceof AppError) {
        return res.status(error.statuscode).json({
            message: error.message
        })
    }

    console.error(error)
    return res.status(500).json({
        message: "Server Internal Error nem a gente sabe oq rolou"
    })
}
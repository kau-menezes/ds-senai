import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";

export default async function authenticate(req:Request, res:Response, next:NextFunction) {
    
    let authenticated = false;
    const auth = req.headers.authorization;
    
    if(!auth) {
        res.status(401).json({message:"unauthorized"}) 
        return
    }
    const [_bearer, token] = auth.split(" ");

    verify(
        token,
        String(process.env.JWT_SECRET_KEY),
        (err:any, decoded:any) => {
            if(!err) {
                authenticated = true;
            }
            res.locals.userId = decoded.userId
        }
    )
    
    if(authenticated) {
        next()
    }
}
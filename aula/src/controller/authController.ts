import { Request, Response } from "express";
import Task from "../model/task.model.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
static async register(req: Request, res: Response): Promise<void> {
// Implementação da função
}

static async login(req: Request, res: Response): Promise<void> {
// Implementação da função
}
}

export default AuthController;
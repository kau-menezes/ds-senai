import express from 'express';
import cors from "cors";
import "express-async-errors";  
import { capturePokemon, getTrainerTeam } from './controller/pokemonController';
import authenticate from './middlewares/validate.middleware';
import { AuthController } from './controller/authController';

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',              
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true          
}));


app.post('/login', AuthController.loginController);
app.post('/register', AuthController.registerController);

app.post('/capture', capturePokemon);
app.get('/team/:userId', getTrainerTeam);

app.options('*', cors()); // Allow preflight for all routes

export default app;
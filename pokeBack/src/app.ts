import express from 'express';
import "express-async-errors";
import { capturePokemon, getTrainerTeam } from './controller/pokemonController';
import { loginController, registerController } from './controller/authController';
import authenticate from './middlewares/validate.middleware';

const app = express();
app.use(express.json());

app.post('/login', loginController);
app.post('/register', registerController);

app.post('/capture', authenticate, capturePokemon);
app.get('/team', authenticate, getTrainerTeam);

export default app;
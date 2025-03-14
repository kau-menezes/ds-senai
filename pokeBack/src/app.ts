import express from 'express';
import { capturePokemon, getTrainerTeam } from './controllers/pokemon.controller';

const app = express();
app.use(express.json());

app.post('/capture', capturePokemon);  // Capture Pokémon route
app.get('/team/:trainerId', getTrainerTeam);  // Get trainer's team route

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
-
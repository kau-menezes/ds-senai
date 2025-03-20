import { Request, Response } from 'express';
import PokemonService from '../services/pokemon.service';
import AppError from '../errors/AppError';

const pokemonService = new PokemonService();


export const capturePokemon = async (req: Request, res: Response) => {
  try {
    const { trainerId, pokemonId } = req.body; 
    const capturedPokemon = await pokemonService.capture({ trainerId, pokemonId });
    res.status(200).json({ message: "Pokémon captured successfully", data: capturedPokemon });
  } catch (error) {
    const err = error as AppError;
    res.status(400).json({ message: err.message });
  }
};


export const getTrainerTeam = async (req: Request, res: Response) => {
  try {
    const trainerId = parseInt(req.params.userId); 
    const team = await PokemonService.team(trainerId);
    res.status(200).json({ data: team });
  } catch (error) {
    const err = error as AppError;
    res.status(400).json({ message: err.message });
  }
};

import { Request, Response } from 'express';
import PokemonService from '../services/pokemon.service.ts';
import AppError from '../errors/AppError.ts';

const pokemonService = new PokemonService();


export const capturePokemon = async (req: Request, res: Response) => {
  try {
    const { trainerId, pokemonId } = req.body; 
    const capturedPokemon = await pokemonService.capture({ trainerId, pokemonId });
    return res.status(200).json({ message: "Pokémon captured successfully", data: capturedPokemon });
  } catch (error) {
    const err = error as AppError;
    return res.status(400).json({ message: err.message });
  }
};


export const getTrainerTeam = async (req: Request, res: Response) => {
  try {
    const trainerId = parseInt(req.params.trainerId, 10); 
    const team = await PokemonService.team(trainerId);
    return res.status(200).json({ data: team });
  } catch (error) {
    const err = error as AppError;
    return res.status(400).json({ message: err.message });
  }
};

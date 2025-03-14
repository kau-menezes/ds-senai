import { Request, Response } from 'express';
import { captureDTO } from "../interface/dto/pokemon/pokemon.dto.ts";
import { PrismaClient } from '@prisma/client';
import AppError from '../errors/AppError.ts';

const prisma = new PrismaClient();

export default class PokemonService {

  // Capture a Pokémon and assign it to a Trainer
  async capture(data: captureDTO) {
    const { trainerId, pokemonId } = data;

    try {
      // Check if the Pokémon exists
      const pokemonExists = await prisma.pokemon.findUnique({
        where: { id: pokemonId },
      });

      if (!pokemonExists) {
        throw new Error("Pokémon not found");
      }

      // Check if the Trainer exists
      const trainerExists = await prisma.trainer.findUnique({
        where: { id: trainerId },
      });

      if (!trainerExists) {
        throw new Error("Trainer not found");
      }

      // Check if the Pokémon is already assigned to the Trainer
      const existingAssignment = await prisma.trainerPokemon.findUnique({
        where: {
          trainerId_pokemonId: {
            trainerId,
            pokemonId,
          },
        },
      });

      if (existingAssignment) {
        throw new Error("This Pokémon is already assigned to this trainer");
      }

      // Create the relationship in the join table
      const trainerPokemon = await prisma.trainerPokemon.create({
        data: {
          trainerId,
          pokemonId,
        },
      });

      return trainerPokemon;
    } catch (error) {
        const err = error as AppError;
      throw new Error(`Error capturing Pokémon: ${err.message}`);
    }
  }

  // Get all Pokémon assigned to a Trainer (Team)
  static async team(trainerId: number) {
    try {
      // Fetch the trainer and include all related Pokémon
      const trainerWithPokemons = await prisma.trainer.findUnique({
        where: { id: trainerId },
        include: {
          pokemon: true, // This will fetch all Pokémon assigned to the trainer
        },
      });

      if (!trainerWithPokemons) {
        throw new Error("Trainer not found");
      }

      return trainerWithPokemons.pokemon; // Return the list of Pokémon
    } catch (error) {
        const err = error as AppError;
        throw new Error(`Error fetching trainer's team: ${err.message}`);
    }
  }
}

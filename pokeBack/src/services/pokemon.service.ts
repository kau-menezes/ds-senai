import { captureDTO } from "../interface/dto/pokemon/pokemon.dto";
import { PrismaClient } from "@prisma/client";
import AppError from '../errors/AppError';

const prisma = new PrismaClient();

export default class PokemonService {

  // Capture a Pokémon and assign it to a Trainer
  async capture(data: captureDTO) {

    console.log(data);
    

    const { trainerId, pokemonId } = data;

    try {
      // Check if the Pokémon exists
      const pokemonExists = await prisma.pokemon.findUnique({
        where: { id: pokemonId },
      });

      if (!pokemonExists) {
        await prisma.pokemon.create({ data: { id: pokemonId } })
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

      const randomNumber = Math.floor(Math.random() * 5);
      if(randomNumber < 4) {
        throw new Error("Could not get pokémon, try again!")
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

  static async team(trainerId: number) {
    try {
      const trainerWithPokemons = await prisma.trainer.findUnique({
        where: { id: trainerId },
        include: {
          TrainerPokemon: {
            include: {
              pokemon: true, // Isso traz os Pokémon associados ao treinador
            },
          },
        },
      });

      if (!trainerWithPokemons) {
        throw new Error("Trainer not found");
      }

      // Retorna apenas os Pokémon do treinador
      return trainerWithPokemons.TrainerPokemon.map((tp: any) => tp.pokemon);
    } catch (error) {
      console.error("Error fetching trainer's team:", error);
      throw new Error("Could not fetch trainer's team");
    }
  }
  
}

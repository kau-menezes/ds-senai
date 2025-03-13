export type PokemonType = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";

export interface WholePokemon
{
    name: string,
    url: string,
    id: number,
    types: {
      type: {
        name: PokemonType;
      };
    }[];
};  
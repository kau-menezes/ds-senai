export interface PokemonProps {
    name: string,
    url: string,
    types: {
      type: {
        name: string;
      };
    }[];
  }
  
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 20; 
const MAX_POKEMONS = 1025;

export default function Home() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState<number>(Number(query.get("page")) || 1);

  const handlePageChange = (value: number) => {
    if (value * PAGE_SIZE < MAX_POKEMONS + PAGE_SIZE && value > 0) {
      setQuery({ page: String(value) });
    }
    setPage(value);
  };


  const getPokemonData = useCallback(async () => {
    const offset = (page - 1) * PAGE_SIZE;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
    const data = await response.json();
    setPokemons(data.results);
  }, [page]);

  useEffect(() => {
    getPokemonData();
  }, [page]);

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <img 
        src="/assets/poke-logo.png" 
        alt="Pokemon Logo"
        className="w-75"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
        {pokemons.map((pokemon, index) => {
          const id = pokemon.url.split("/").slice(-2, -1)[0];
          return (
            <div key={id} className="p-4 border rounded-lg shadow-md bg-white">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={pokemon.name}
                className="w-20 h-20 mx-auto"
              />
              <h2 className="text-lg font-semibold text-center capitalize">{pokemon.name}</h2>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>

        <span className="px-4">Page {page}</span>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          disabled={page * PAGE_SIZE >= MAX_POKEMONS}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

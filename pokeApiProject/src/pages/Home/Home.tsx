import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { PokemonProps } from "./interfaces/PokemonProps";
import PokeCard from "./components/PokeCard";
import { WholePokemon } from "./interfaces/WholePokemon";

const PAGE_SIZE = 15;
const MAX_POKEMONS = 1025;

import pokeTypeColor from "../../data/types.json";

export default function Home() {
  const [pokemons, setPokemons] = useState<WholePokemon[]>([]);
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState<number>(Number(query.get("page")) || 1);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<WholePokemon | null>(null);

  const handlePageChange = (value: number) => {
    if (value * PAGE_SIZE < MAX_POKEMONS + PAGE_SIZE && value > 0) {
      setQuery({ page: String(value) });
    }
    setPage(value);
  };

  const handlePokemonClick = (pokemon: WholePokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const getPokemonData = useCallback(async () => {
    const offset = (page - 1) * PAGE_SIZE;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (e: PokemonProps) => {
        const newRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${e.name}`);
        const newData: WholePokemon = await newRes.json();

        return {
          ...e,
          types: newData.types,
          id: newData.id,
        };
      })
    );

    setPokemons(detailedPokemons);
  }, [page]);

  useEffect(() => {
    getPokemonData();
  }, [page, getPokemonData]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5 bg-gray-200">
      {isModalOpen && selectedPokemon && (
        <div className="fixed inset-0 bg-blue bg-opacity-50 flex justify-end">
          <div className="w-1/2 bg-white p-6 overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-2xl hover:cursor-pointer">
              &times;
            </button>
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-center rounded-lg shadow-md font-exo cursor-pointer w-[280px] h-auto overflow-hidden">
                <div className="bg-gray-300 w-full h-[220px] flex justify-center items-center">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                    alt={selectedPokemon.name}
                    className="mx-auto bg-gray-300 w-50 h-auto"
                  />
                </div>
                <div className="w-full !py-8 !pl-2">
                  <h2 className="text-lg font-semibold capitalize">{selectedPokemon.name}</h2>
                  <div className="mt-4">
                    <div className="flex space-x-2 mt-1 gap-3">
                      {selectedPokemon.types.map((type, index) => {
                        const color: string = pokeTypeColor[type.type.name] || '#fff'; // Default to white if color is not found
                        return (
                          <span
                            key={index}
                            style={{ backgroundColor: color }} // Using inline style for dynamic color
                            className="rounded-full py-1 px-3 w-[60px] text-white font-extralight text-sm text-center capitalize"
                          >
                            {type.type.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <img
        src="/assets/poke-logo.png"
        alt="Pokemon Logo"
        className="w-75 !my-10"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
        {pokemons.map((pokemon, index) => (
          <PokeCard
            key={index}
            pokemon={pokemon}
            onClick={handlePokemonClick}  // Passing the click handler to PokeCard
          />
        ))}
      </div>

      <div className="!my-5 flex justify-center gap-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-0"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <span className="material-icons text-black hover:cursor-pointer">chevron_left</span>
        </button>

        <span className="bg-gray-300 !p-2 w-[40px] h-[40px] text-center rounded-full">{page}</span>

        <button
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          disabled={page * PAGE_SIZE >= MAX_POKEMONS}
          onClick={() => handlePageChange(page + 1)}
        >
          <span className="material-icons text-black hover:cursor-pointer">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

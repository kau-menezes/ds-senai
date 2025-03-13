import React from 'react';
import { WholePokemon } from '../interfaces/WholePokemon';
import pokeTypeColor from "../../../data/types.json";

const PokeCard: React.FC<{ pokemon: WholePokemon, onClick: (pokemon: WholePokemon) => void }> = ({ pokemon, onClick }) => {
  const id = pokemon.url.split("/").slice(-2, -1)[0];
  const name = pokemon.name;
  const types = pokemon.types.map((type) => type.type.name);

  return (
    <div
      className="flex flex-col items-center rounded-lg shadow-md  font-exo cursor-pointer w-[180px] h-auto overflow-hidden"
      onClick={() => onClick(pokemon)}  
    >
      <div className='bg-gray-300 w-full h-[120px] flex justify-center items-center'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          className="mx-auto bg-gray-300 w-24 h-auto"
        />
      </div>
      <div className="w-full !py-8 !pl-2">
        <h2 className="text-lg font-semibold capitalize">{name}</h2>
        <div className="mt-4">
          <div className="flex space-x-2 mt-1 gap-3">
            {types.map((type, index) => {
              const color: string = pokeTypeColor[type] || '#fff';  // Default to white if color is not found
              return (
                <span
                  key={index}
                  style={{ backgroundColor: color }} // Using inline style for dynamic color
                  className="rounded-full py-1 px-3 w-[60px] text-white font-extralight text-sm text-center capitalize"
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;

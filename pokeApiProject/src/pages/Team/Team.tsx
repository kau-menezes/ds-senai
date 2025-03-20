import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokeCard from "../Home/components/PokeCard";
import { WholePokemon } from "../Home/interfaces/WholePokemon";


export default function Team() {
  const [team, setTeam] = useState<WholePokemon[]>([]);
  const navigate = useNavigate();

  // Fetch trainer's team from backend
  useEffect(() => {
    const fetchTeam = async () => {
      const trainerId = localStorage.getItem("id");
      if (!trainerId) return;

      try {
        const response = await fetch(`http://localhost:8080/team/${trainerId}`);
        if (!response.ok) throw new Error("Failed to fetch team");

        const data = await response.json();
        const pokemonIds = data.data.map((p: { id: number }) => p.id);

        // Fetch detailed Pokémon data from PokeAPI
        const detailedPokemons = await Promise.all(
          pokemonIds.map(async (id: number) => {
            console.log(id);
            
            const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return await pokeResponse.json();
          })
        );

        setTeam(detailedPokemons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 p-5 bg-gray-200 min-h-screen">
      <img src="/assets/poke-logo.png" alt="Pokemon Logo" className="w-75 !my-10" />
      
      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button 
          className="bg-amber-400 text-white font-bold rounded-2xl w-[100px] p-1 hover:bg-amber-500 hover:cursor-pointer"
          onClick={() => navigate("/home")}
        >
          All
        </button>
        <button className="bg-blue-400 text-white font-bold rounded-2xl w-[100px] p-1">My team</button>
      </div>

      {/* Display Pokémon Team */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 xl:grid-cols-7 gap-4 mt-10">
        {team.map((pokemon, index) => (
          <PokeCard key={index} pokemon={pokemon} onClick={ () => {}}/>
        ))}
      </div>
    </div>
  );
}

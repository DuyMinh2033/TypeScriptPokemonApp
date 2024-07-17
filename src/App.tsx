import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonComponent from "./Component/Pokemon";
import { Pokemonss } from "./interface";

interface Detail {
  id: number;
  isOpen: boolean;
}

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemonss[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewDetail, setViewDetails] = useState<Detail>({
    id: 0,
    isOpen: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(
        async (pokemonResult: { name: string; url: string }) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonResult.name}`
          );
          setPokemon((prevPokemon) => [...prevPokemon, poke.data]);
        }
      );
    };
    getPokemon();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(
      async (pokemonResult: { name: string; url: string }) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonResult.name}`
        );
        setPokemon((prevPokemon) => [...prevPokemon, poke.data]);
        setLoading(false);
      }
    );
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon__header">Pokemon</header>
        <PokemonComponent poke={pokemon} />
        <button className="btn" onClick={handleLoadMore}>
          {loading ? ".....Loading" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default App;

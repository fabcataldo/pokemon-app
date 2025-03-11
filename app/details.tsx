import React from "react";
import PokemonDetail from "../components/PokemonDetail";
import { useLocalSearchParams } from "expo-router";
import { Pokemon } from "../models/Pokemon";

const DetailsScreen = () => {
  console.log("DETAILS SCREEN");
  const params = useLocalSearchParams();
  const realPokemon: Pokemon = JSON.parse(params.pokemon as string);
  return <PokemonDetail pokemon={realPokemon} />;
};

export default DetailsScreen;

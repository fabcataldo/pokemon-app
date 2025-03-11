import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  GetPokemonsResponse,
  GetPokemonsResponseResult,
} from "../models/GetPokemonsResponse";
import { getPokemon, getPokemons } from "../services/ApiService";
import { Pokemon } from "../models/Pokemon";
import AnimatedPokemonCard from "./AnimatedPokemonCard";
import Screen from "./Screen";

const PokemonsList = () => {
  const [pokemonsFromAPI, setPokemonsFromAPI] =
    useState<GetPokemonsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPokemonFromAPI = async (urlDetail: string, urlColor: string) => {
    try {
      const responseDetail = await (
        await getPokemon(urlDetail, urlColor)
      ).promisePokemonDetail;

      const responseColor = await (
        await getPokemon(urlDetail, urlColor)
      ).promisePokemonColor;

      if (responseDetail && responseColor) {
        return {
          responseDetail,
          responseColor,
        };
      }
    } catch (error: any) {
      //PONER UN ALERT ACA
      console.error("getPokemon error:", error);
      setError(
        error.message || "Ocurrió un error al obtener el detalle del pokemon."
      );
    }
  };

  const getPokemonsFromAPI = async () => {
    try {
      const response: GetPokemonsResponse = await getPokemons();

      if (response && Array.isArray(response.results)) {
        for (const elementResult of response.results) {
          const pokemon = await getPokemonFromAPI(
            elementResult.url,
            elementResult.url.slice(elementResult.url.length - 1)
          );
          if (pokemon && pokemon.responseDetail && pokemon.responseColor) {
            elementResult.detail = pokemon.responseDetail;
            elementResult.detail.color = pokemon.responseColor;
          }
        }
        setPokemonsFromAPI(response);
      } else {
        //PONER UN ALERT ACA
        throw new Error("La respuesta falló");
      }
    } catch (error: any) {
      //PONER UN ALERT ACA
      console.error("getPokemons error:", error);
      setError(error.message || "Ocurrió un error al obtener los pokemons.");
    }
  };

  useEffect(() => {
    getPokemonsFromAPI();
  }, []);

  return (
    <Screen>
      <Text>Pokedex</Text>
      {pokemonsFromAPI && pokemonsFromAPI.results.length === 0 ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList
          data={pokemonsFromAPI?.results}
          keyExtractor={(pokemon) => pokemon.name}
          renderItem={({ item, index }) => (
            <AnimatedPokemonCard pokemon={item.detail} index={index} />
          )}
        />
      )}
    </Screen>
  );
};

export default PokemonsList;

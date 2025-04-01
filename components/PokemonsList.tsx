import { Text, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  GetPokemonsResponse,
  GetPokemonsResponseResult,
} from "../models/GetPokemonsResponse";
import {
  getPokemon,
  getPokemons,
  getPokemonColorInfo,
} from "../services/ApiService";
import AnimatedPokemonCard from "./AnimatedPokemonCard";
import Screen from "./Screen";

const possiblePokemonColors = new Array(10).fill(null).map((_, i) => i + 1);
const PokemonsList = () => {
  const [pokemonsFromAPI, setPokemonsFromAPI] =
    useState<GetPokemonsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPokemons, setTotalPokemons] = useState<number>(0);
  const [pokemons, setPokemons] = useState<GetPokemonsResponseResult[]>([]);

  const getPokemonFromAPI = async (urlDetail: string, urlColor: string) => {
    try {
      const responseDetail = await (
        await getPokemon(urlDetail, urlColor)
      ).promisePokemonDetail;

      let responseColor;

      for (const idColor of possiblePokemonColors) {
        const tmpResponse = await getPokemonColorInfo(idColor);

        if (tmpResponse) {
          const colorInPokemon = tmpResponse.pokemon_species.find(
            (pok: any) => pok.name === responseDetail.name
          );
          if (colorInPokemon) {
            responseColor = {
              id: tmpResponse.id,
              name: tmpResponse.name,
              names: tmpResponse.names,
              pokemon_species: [colorInPokemon],
            };
            break;
          }
        }
      }

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

  const getPokemonIdFromURL = (url: string): string | null => {
    const evaluatorMatches = url.match(/\/(\d+)\/$/);
    return evaluatorMatches ? evaluatorMatches[1] : null;
  };

  const getPokemonsFromAPI = async () => {
    try {
      const response: GetPokemonsResponse = await getPokemons(
        currentPage,
        pageSize
      );

      if (response && Array.isArray(response.results)) {
        setTotalPokemons(response.count);
        for (const elementResult of response.results) {
          const pokemonId = getPokemonIdFromURL(elementResult.url);

          if (pokemonId) {
            const pokemon = await getPokemonFromAPI(
              elementResult.url,
              pokemonId
            );
            if (pokemon && pokemon.responseDetail && pokemon.responseColor) {
              elementResult.detail = pokemon.responseDetail;
              elementResult.detail.color = pokemon.responseColor;
            }
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
  }, [currentPage]);

  useEffect(() => {
    if (!!pokemonsFromAPI) {
      setPokemons([...pokemons, ...pokemonsFromAPI.results]);
    }
  }, [pokemonsFromAPI]);

  return (
    <Screen>
      <Text className="mt-8 mb-5 text-3xl font-bold color-black-900">
        Pokedex
      </Text>
      {pokemonsFromAPI && pokemonsFromAPI.results.length === 0 ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <>
          <FlatList
            data={pokemons}
            keyExtractor={(pokemon) => pokemon.detail.id.toString()}
            renderItem={({ item, index }) => (
              <AnimatedPokemonCard pokemon={item.detail} index={index} />
            )}
          />

          <Pressable
            className={`border border-black bg-blue-500
                 active:border-white/50:bg-blue-200 mb-5 p-4 rounded-xl`}
            onPress={() => {
              setCurrentPage(currentPage + 10);
            }}
          >
            <Text className="text-white text-center">See more</Text>
          </Pressable>
        </>
      )}
    </Screen>
  );
};

export default PokemonsList;

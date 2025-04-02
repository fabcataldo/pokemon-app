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
import { usePokemons } from "@/hooks/usePokemons";

const possiblePokemonColors = new Array(10).fill(null).map((_, i) => i + 1);

const PokemonsList = () => {
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pokemons, setPokemons] = useState<GetPokemonsResponseResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: allPokemonsFromAPI, isLoading } = usePokemons(
    currentPage,
    pageSize
  );

  const getPokemonFromAPI = async (urlDetail: string, urlColor: string) => {
    try {
      const responseDetail = await getPokemon(urlDetail);

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
    console.log("allPokemonsFromAPI");
    console.log(allPokemonsFromAPI);
    try {
      if (allPokemonsFromAPI && Array.isArray(allPokemonsFromAPI.results)) {
        for (const elementResult of allPokemonsFromAPI.results) {
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
        setPokemons([...pokemons, ...allPokemonsFromAPI.results]);

        console.log("pokemons");
        console.log(pokemons);
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
    if (allPokemonsFromAPI && currentPage === 0) {
      getPokemonsFromAPI();
    }
  }, [allPokemonsFromAPI]);

  return (
    <Screen>
      <Text className="mt-8 mb-5 text-3xl font-bold color-black-900">
        Pokedex
      </Text>
      {isLoading ? (
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

import { Text, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedPokemonCard from "./AnimatedPokemonCard";
import Screen from "./Screen";
import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/models/Pokemon";
import { PokemonMapper } from "../utils/mappers/pokemon.mapper";

const PokemonsList = () => {
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: allPokemonsFromAPI, isLoading } = usePokemons(
    currentPage,
    pageSize
  );

  const getPokemonsFromAPI = async () => {
    console.log("allPokemonsFromAPI");
    console.log(allPokemonsFromAPI);
    try {
      if (allPokemonsFromAPI && Array.isArray(allPokemonsFromAPI.results)) {
        let finalPokemons = [];
        for (const elementResult of allPokemonsFromAPI.results) {
          const finalPokemon: Pokemon = await PokemonMapper.getFullPokemonInfo(
            elementResult
          );

          if (finalPokemon) {
            finalPokemons.push(finalPokemon);
          }
        }

        if (finalPokemons.length) {
          setPokemons([...pokemons, ...finalPokemons]);
          console.log("pokemons");
          console.log(pokemons);
        }
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
    if (allPokemonsFromAPI) {
      getPokemonsFromAPI();
    }
  }, [allPokemonsFromAPI, currentPage]);

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
            keyExtractor={(pokemon) => pokemon.id.toString()}
            renderItem={({ item, index }) => (
              <AnimatedPokemonCard pokemon={item} index={index} />
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

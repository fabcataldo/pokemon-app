import {
  Text,
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AnimatedPokemonCard from "./AnimatedPokemonCard";
import Screen from "./Screen";
import { usePokemons } from "@/hooks/usePokemons";
import { Pokemon } from "@/models/Pokemon";
import { PokemonMapper } from "../utils/mappers/pokemon.mapper";

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { allPokemonsQuery } = usePokemons();
  const isLoading = useRef(false);

  const getPokemonsFromAPI = async () => {
    try {
      if (allPokemonsQuery.data) {
        const finalPokemons = await PokemonMapper.getFullPokemons(
          allPokemonsQuery.data
        );

        if (finalPokemons) {
          setPokemons(finalPokemons);
        }
      } else {
        throw new Error("La respuesta falló");
      }
    } catch (error: any) {
      console.error("getPokemons error:", error);
      setError(error.message || "Ocurrió un error al obtener los pokemons.");
    }
  };

  useEffect(() => {
    if (allPokemonsQuery.data) {
      getPokemonsFromAPI();
    }
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [allPokemonsQuery.data]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isEndReached =
      contentOffset.y + layoutMeasurement.height + 600 >= contentSize.height;

    if (!isEndReached) return;

    isLoading.current = true;

    allPokemonsQuery.fetchNextPage && allPokemonsQuery.fetchNextPage();
  };

  if (allPokemonsQuery.isLoading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="mb-4">Espere por favor</Text>
        <ActivityIndicator color="purple" size={30} />
      </View>
    );
  }

  return (
    <Screen>
      <Text className="mt-8 mb-5 text-3xl font-bold color-black-900">
        Pokedex
      </Text>

      <>
        <FlatList
          data={pokemons}
          keyExtractor={(pokemon, i) => `${pokemon.id.toString()}-${i}`}
          renderItem={({ item, index }) => (
            <AnimatedPokemonCard pokemon={item} index={index} />
          )}
          onScroll={onScroll}
        />
      </>
    </Screen>
  );
};

export default PokemonsList;

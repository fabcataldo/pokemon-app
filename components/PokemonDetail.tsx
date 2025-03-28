import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Pokemon } from "../models/Pokemon";
import Screen from "./Screen";
import { Ionicons } from "@expo/vector-icons";
import PokemonTypes from "./PokemonTypes";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: Props) => {
  const router = useRouter();
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: pokemon.color.name },
          headerTintColor: "white",
          headerLeft: ({ tintColor }) => (
            <Ionicons
              name={"chevron-back-circle-outline"}
              size={20}
              className="mr-5"
              color={tintColor}
              onPress={() => router.back()}
            />
          ),
        }}
      ></Stack.Screen>

      <View className="flex-col items-start">
        <Text className="text-center text-black font-bold text-xl capitalize">
          {pokemon.name}
        </Text>

        <PokemonTypes pokemon={pokemon} defaultTypeColor="white" />

        <View className="pt-10 w-[400px]">
          <View className="border-b-2 border-solid border-gray-300">
            <Text>Experience: {pokemon.base_experience}</Text>
          </View>
          <View className="border-b-2 border-solid border-gray-300">
            <Text>Height: {pokemon.height}</Text>
          </View>
          <View className="border-b-2 border-solid border-gray-300">
            <Text>Weight: {pokemon.weight}</Text>
          </View>
        </View>

        <Image
          className="mb-4 rounded"
          source={{
            uri: pokemon.sprites.other?.["official-artwork"].front_default,
          }}
          style={{ width: 400, height: 400 }}
        ></Image>
      </View>
    </Screen>
  );
};

export default PokemonDetail;

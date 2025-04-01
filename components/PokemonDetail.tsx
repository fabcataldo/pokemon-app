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
    <Screen backgroundColor={pokemon.color.name}>
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
          title: "",
        }}
      ></Stack.Screen>

      <View className="flex-col items-start">
        <Text className="text-center text-white font-bold text-3xl capitalize">
          {pokemon.name}
        </Text>

        <PokemonTypes pokemon={pokemon} />
      </View>

      <View
        className="mt-10 flex flex-row justify-between items-center self-center
       border-b-2 border-solid border-gray-300 w-[80%] pb-3
      "
      >
        <View>
          <Text className=" text-white">Experience</Text>
        </View>
        <View>
          <Text className=" text-white">{pokemon.base_experience}</Text>
        </View>
      </View>

      <View
        className="mt-3 flex flex-row justify-between items-center self-center
      border-b-2 border-solid border-gray-300 w-[80%] pb-3
      "
      >
        <View>
          <Text className=" text-white">Height</Text>
        </View>
        <View>
          <Text className=" text-white">{pokemon.height}</Text>
        </View>
      </View>

      <View className="mt-3 flex flex-row justify-between items-center self-center w-[80%] mb-7">
        <View>
          <Text className=" text-white">Weight</Text>
        </View>
        <View>
          <Text className=" text-white">{pokemon.weight}</Text>
        </View>
      </View>

      <Image
        source={{
          uri: pokemon.sprites.other?.["official-artwork"].front_default,
        }}
        style={{ width: 400, height: 400 }}
      ></Image>
    </Screen>
  );
};

export default PokemonDetail;

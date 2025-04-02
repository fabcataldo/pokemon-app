import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Pokemon } from "../models/Pokemon";
import { useRouter } from "expo-router";
import PokemonTypes from "./PokemonTypes";

interface Props {
  pokemon: Pokemon;
}

const PokemonSmallDetail = ({ pokemon }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      style={{
        backgroundColor: pokemon.color,
      }}
      className={`border border-black
         active:border-white/50 mb-5 p-4 rounded-xl`}
      onPress={() =>
        router.push({
          pathname: "/details",
          params: { pokemon: JSON.stringify(pokemon) },
        })
      }
    >
      <View
        key={pokemon.name}
        className="flex-row gap-4 justify-between w-full"
      >
        <View className="flex-col w-[40%]">
          <Text
            className={`mb-2 text-2xl capitalize ${
              pokemon.color &&
              (pokemon.color.includes("black") ||
                pokemon.color.includes("blue") ||
                pokemon.color.includes("brown"))
                ? "text-white"
                : "text-black"
            }`}
          >
            {pokemon.name}
          </Text>
          <PokemonTypes pokemon={pokemon} />
        </View>
        <View className="flex-col w-[60%]">
          <Image
            className=""
            style={{ width: 200, height: 200 }}
            source={{
              uri: pokemon.img,
            }}
          ></Image>
        </View>
      </View>
    </Pressable>
  );
};

export default PokemonSmallDetail;

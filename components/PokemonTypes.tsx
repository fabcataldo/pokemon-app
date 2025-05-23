import { View, Text, FlatList } from "react-native";
import React from "react";
import { Pokemon } from "@/models/Pokemon";
import CustomSegment from "./CustomSegment";

interface Props {
  pokemon: Pokemon;
  defaultTypeColor?: string;
}
const PokemonTypes = ({ pokemon }: Props) => {
  return (
    <>
      {pokemon.types && pokemon.types.length ? (
        <FlatList
          className="mt-2"
          data={pokemon.types}
          keyExtractor={(type) => type.url}
          horizontal={true}
          renderItem={({ item, index }) => (
            <CustomSegment text={item.name} key={index}></CustomSegment>
          )}
        ></FlatList>
      ) : (
        <View>
          <Text
            className={`mb-1 ${
              pokemon.color && pokemon.color.includes("black")
                ? "text-white"
                : "text-black"
            }`}
          >
            This pokemon does not have any type
          </Text>
        </View>
      )}
    </>
  );
};

export default PokemonTypes;

import { View, Text, FlatList } from "react-native";
import React from "react";
import { Pokemon } from "@/models/Pokemon";
import CustomSegment from "./CustomSegment";

interface Props {
  pokemon: Pokemon;
  defaultTypeColor?: string;
}
const PokemonTypes = ({ pokemon, defaultTypeColor = "" }: Props) => {
  return (
    <>
      {pokemon.types && pokemon.types.length ? (
        <FlatList
          data={pokemon.types}
          keyExtractor={(pokemon) => pokemon.type.url}
          horizontal={true}
          renderItem={({ item, index }) => (
            <CustomSegment
              text={item.type.name}
              key={index}
              customColor={defaultTypeColor || pokemon.color.name}
            ></CustomSegment>
          )}
        ></FlatList>
      ) : (
        <View>
          <Text
            className={`mb-1 ${
              pokemon.color.name.includes("black") ? "text-white" : "text-black"
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

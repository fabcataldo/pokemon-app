import { View, Text, FlatList, ScrollView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { Pokemon } from "../models/Pokemon";
import CustomSegment from "./CustomSegment";
import Screen from "./Screen";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: Props) => {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerTitle: pokemon?.name ? pokemon.name : "Pokemon Detail",
        }}
      ></Stack.Screen>
      <View className="flex-1 justify-center items-center">
        <ScrollView>
          <View className="justify-center items-center text-center">
            <Image
              className="mb-4 rounded"
              source={{
                uri: pokemon.sprites.other?.["official-artwork"].front_default,
              }}
              style={{ width: 215, height: 294 }}
            ></Image>
            <Text className="text-center text-white font-bold text-xl">
              {pokemon.name}
            </Text>
            {pokemon.types && pokemon.types.length ? (
              <FlatList
                data={pokemon.types}
                keyExtractor={(pokemon) => pokemon.type.url}
                renderItem={({ item, index }) => (
                  <CustomSegment
                    text={item.type.name}
                    key={index}
                  ></CustomSegment>
                )}
              ></FlatList>
            ) : (
              <View>
                <Text>This pokemon does not have any type</Text>
              </View>
            )}
          </View>
          <View>
            <Text>Experience: {pokemon.base_experience}</Text>
          </View>
          <View>
            <Text>Height: {pokemon.height}</Text>
          </View>
          <View>
            <Text>Weight: {pokemon.weight}</Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default PokemonDetail;

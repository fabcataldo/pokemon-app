import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Pokemon } from "../models/Pokemon";
import CustomSegment from "./CustomSegment";
import Screen from "./Screen";

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
          headerTitle: pokemon?.name ? pokemon.name : "Pokemon Detail",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Text style={{ color: "yellow", padding: 10 }}>Back</Text>
            </Pressable>
          ),
        }}
      ></Stack.Screen>
      <View className="flex-1 justify-center items-center">
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
              nestedScrollEnabled
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
      </View>
    </Screen>
  );
};

export default PokemonDetail;

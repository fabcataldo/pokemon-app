import { View, Text, Pressable, Image, FlatList } from "react-native";
import React from "react";
import { Pokemon } from "../models/Pokemon";
import { Link, useRouter } from "expo-router";
import CustomSegment from "./CustomSegment";

interface Props {
  pokemon: Pokemon;
}

const PokemonSmallDetail = ({ pokemon }: Props) => {
  const router = useRouter();
  return (
    <Pressable
      className="active:opacity-70 border border-black active:border-white/50 mb-2 p-4 rounded-xl bg-slate-500/10"
      onPress={() =>
        router.push({
          pathname: "/details",
          params: { pokemon: JSON.stringify(pokemon) }, // 🔥 Pasamos el objeto como string
        })
      }
    >
      <View key={pokemon.name} className="flex-row gap-4">
        <View>
          <Text className="mb-1">{pokemon.name}</Text>
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
        <View className="flex-shrink">
          <Image
            source={{
              uri: pokemon.sprites.other?.["official-artwork"].front_default,
            }}
          ></Image>
        </View>
      </View>
    </Pressable>
  );
};

export default PokemonSmallDetail;

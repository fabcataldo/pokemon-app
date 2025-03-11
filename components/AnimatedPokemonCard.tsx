import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Pokemon } from "../models/Pokemon";
import PokemonSmallDetail from "./PokemonSmallDetail";

interface Props {
  pokemon: Pokemon;
  index: any;
}
const AnimatedPokemonCard = ({ pokemon, index }: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);
  return (
    <Animated.View style={{ opacity }}>
      <PokemonSmallDetail pokemon={pokemon}></PokemonSmallDetail>
    </Animated.View>
  );
};

export default AnimatedPokemonCard;

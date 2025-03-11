import { View, Text } from "react-native";
import React from "react";
import PokemonsList from "../components/PokemonsList";
import Header from "../layout/Header";

const Home = () => {
  return (
    <View>
      <Header />
      <PokemonsList></PokemonsList>
    </View>
  );
};

export default Home;

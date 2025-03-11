import { Pressable, View } from "react-native";
import { Link, Stack } from "expo-router";
import { CircleInfoIcon } from "../components/CustomIcons";

const Header = () => {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "yellow",
          headerTitle: "Pokedex",
        }}
      />
    </View>
  );
};

export default Header;

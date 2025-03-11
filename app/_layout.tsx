import React from "react";
import Header from "../layout/Header";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#1E293B" }, // Fondo del header
        headerTintColor: "#FACC15", // Color del texto del header
        headerTitleStyle: { fontWeight: "bold" },
      }}
    ></Stack>
  );
};

export default _layout;

import React from "react";

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
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ headerShown: true }} />
    </Stack>
  );
};

export default _layout;

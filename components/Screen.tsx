import { View, Text } from "react-native";
import React, { PropsWithChildren } from "react";

const Screen = ({ children }: PropsWithChildren) => {
  return <View className="flex-1 bg-black pt-4">{children}</View>;
};

export default Screen;

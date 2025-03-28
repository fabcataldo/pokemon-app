import { View } from "react-native";
import React, { PropsWithChildren } from "react";

const Screen = ({ children }: PropsWithChildren) => {
  return <View className="flex-1 bg-white pt-4 pl-5 pr-5">{children}</View>;
};

export default Screen;

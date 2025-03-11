import { View, Text } from "react-native";
import React from "react";

interface Props {
  text: string;
}

const CustomSegment = ({ text }: Props) => {
  return (
    <View className="border-1 rounded-1 border-black">
      <Text className="p-30">{text}</Text>
    </View>
  );
};

export default CustomSegment;

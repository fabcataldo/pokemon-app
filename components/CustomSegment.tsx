import { View, Text } from "react-native";
import React from "react";

interface Props {
  text: string;
}

const CustomSegment = ({ text }: Props) => {
  return (
    <View
      style={{ borderColor: "white" }}
      className="border-2 border-solid rounded-xl p-1.5 h-10 mr-2"
    >
      <Text className={`text-white capitalize max-w-xl`}>{text}</Text>
    </View>
  );
};

export default CustomSegment;

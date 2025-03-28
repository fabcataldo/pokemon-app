import { View, Text } from "react-native";
import React from "react";

interface Props {
  text: string;
  customColor: string;
}

const CustomSegment = ({ text, customColor }: Props) => {
  return (
    <View
      style={{
        borderColor: `${
          !!customColor &&
          (customColor === "black" ||
            customColor === "blue" ||
            customColor === "brown")
            ? "white"
            : "black"
        }`,
      }}
      className="border-2 border-solid rounded-xl p-1.5 h-10 mr-2"
    >
      <Text
        className={`${
          !!customColor &&
          (customColor === "black" ||
            customColor === "blue" ||
            customColor === "brown")
            ? "text-white"
            : "text-black"
        }`}
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomSegment;

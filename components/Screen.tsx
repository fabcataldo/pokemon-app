import { View } from "react-native";
import React, { PropsWithChildren } from "react";

interface Props {
  children: PropsWithChildren;
  backgroundColor?: string;
}
const Screen = ({
  children,
  backgroundColor = "white",
}: PropsWithChildren<Props>) => {
  return (
    <View
      className="flex-1 pt-4 pl-5 pr-5"
      style={{
        backgroundColor: `${backgroundColor}`,
      }}
    >
      {children}
    </View>
  );
};

export default Screen;

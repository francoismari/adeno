import { View, Text } from "react-native";
import React from "react";

export default function CardWrapper({ title, color, children }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: color,
        marginHorizontal: 20,
        paddingTop: 26,
        borderRadius: 26,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: -18,
          backgroundColor: color,
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 10,
          transform: [{ rotate: "-1.01deg" }],
        }}
      >
        <Text
          style={{ fontSize: 20, color: "white", fontFamily: "FrancoisOne" }}
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";

export default function CardWrapper({ title, color, children }) {
  return (
    <View style={[styles.cardContainer, { borderColor: color }]}>
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: color,
          },
        ]}
      >
        <CustomText
          style={{ fontSize: 20, color: "white", fontFamily: "FrancoisOne" }}
        >
          {title}
        </CustomText>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    marginHorizontal: 20,
    paddingTop: 26,
    borderRadius: 26,
    marginTop: 20,
    marginBottom: 20,
  },
  textContainer: {
    position: "absolute",
    alignSelf: "center",
    top: -18,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    transform: [{ rotate: "-1.01deg" }],
  },
});

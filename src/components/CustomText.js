import React from "react";
import { Text, Platform, StyleSheet } from "react-native";

const CustomText = ({ children, style, ...props }) => {
  const platformStyle =
    Platform.OS === "android"
      ? { lineHeight: (style?.fontSize || 14) * 1.5, paddingBottom: 2 }
      : {};

  return (
    <Text style={[styles.defaultStyle, platformStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "FrancoisOne",
  },
});

export default CustomText;

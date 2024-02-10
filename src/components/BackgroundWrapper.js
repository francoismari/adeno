import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BackgroundWrapper = ({ children, style, disableTop, bottom }) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      // colors={["#587CF9", "#000000", "#FBD51F"]}
      // colors={["#587CF9", "#B08BFF", "#FBD51F"]}
      colors={["#5354E8", "#050675", "#000000"]}
      // colors={["#B08BFF", "#000000", "#FBD51F"]}
      // colors={["#587CF9", "#FBD51F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.background, style]}
    >
      <View
        style={{
          ...styles.container,
          paddingTop: disableTop ? 0 : insets.top,
          paddingBottom: bottom ? insets.bottom : 0,
        }}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default BackgroundWrapper;

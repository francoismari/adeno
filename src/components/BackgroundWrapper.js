import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BackgroundWrapper = ({ children, style, disableTop, bottom }) => {
  const insets = useSafeAreaInsets();

  const topPadding = disableTop
    ? 0
    : Platform.OS === "android"
    ? StatusBar.currentHeight
    : insets.top;

  const bottomPadding = bottom
    ? Platform.OS === "android"
      ? Math.max(insets.bottom, 16)
      : insets.bottom
    : 0;

  return (
    <LinearGradient
      colors={["#5354E8", "#050675", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.background, style]}
    >
      <View
        style={{
          ...styles.container,
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
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

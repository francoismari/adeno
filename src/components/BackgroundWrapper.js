import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, SafeAreaView } from "react-native";

const BackgroundWrapper = ({ children }) => {
  return (
    <LinearGradient
      colors={["#587CF9", "#000000", "#FBD51F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
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

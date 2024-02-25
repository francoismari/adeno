import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const BackButton = ({ handleGoBack }) => {
  return (
    <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainer}>
      <Entypo name="chevron-thin-left" size={30} color="#4647D3" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default BackButton;

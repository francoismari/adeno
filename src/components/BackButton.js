import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const BackButton = ({ handleGoBack }) => {
  return (
    // <SafeAreaView style={{ zIndex: 100 }}>
      <TouchableOpacity
        onPress={handleGoBack}
        style={{
          // position: "absolute",
          // top: 12,
          width: 45,
          height: 45,
          borderRadius: 30,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Entypo name="chevron-thin-left" size={30} color="#4647D3" />
      </TouchableOpacity>
    // </SafeAreaView>
  );
};

export default BackButton;

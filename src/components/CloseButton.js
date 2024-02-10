import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const CloseButton = ({ handleClose }) => {
  return (
    <View style={{ zIndex: 100}}>
      <TouchableOpacity
        onPress={handleClose}
        style={{
          position: "absolute",
          right: 0,
          top: 20,
          width: 49,
          height: 49,
          borderRadius: 30,
          // backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: Platform.OS === "android" ? 10 : 0
        }}
      >
        <AntDesign name="close" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CloseButton;

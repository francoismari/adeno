import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity onPress={() => AsyncStorage.removeItem("isSetUp")}>
        <Text>Reset onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MainHeader({ title, emoji }) {
  const navigation = useNavigation();

  const handleOpenSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View style={{ transform: [{ rotate: "-1.48deg" }] }}>
        <Text
          style={{ fontSize: 53, fontFamily: "FrancoisOne", color: "white" }}
        >
          Adeno
        </Text>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 24, fontFamily: "FrancoisOne" }}>
            {title}
          </Text>
          <View style={styles.emojiContainer}>
            <Text>{emoji}</Text>
          </View>
        </View>
      </View>
      <Pressable onPress={handleOpenSettings} style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={26} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titleContainer: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 15,
    paddingVertical: 2,
  },
  emojiContainer: {
    position: "absolute",
    right: -18,
    bottom: -10,
    width: 29,
    height: 29,
    backgroundColor: "white",
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DB3366",
  },
  settingsButton: {
    width: 54,
    height: 54,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});

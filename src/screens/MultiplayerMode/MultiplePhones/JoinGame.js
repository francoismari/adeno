import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../../assets/colors";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function JoinGame({ route }) {
  const { pseudo } = route.params;

  const navigation = useNavigation();

  const [roomCode, setRoomCode] = useState("");
  const [isJoiningRoom, setIsJoiningRoom] = useState("");

  const handleJoinRoom = () => {
    setIsJoiningRoom(true);

    if (roomCode !== "") {
      const joinRoomFunction = httpsCallable(functions, "joinRoom");

      joinRoomFunction({ roomCode: roomCode, pseudo: pseudo })
        .then((result) => {
          console.log(result.data);
          navigation.navigate("Room", { roomCode: result.data });
        })
        .catch((error) => {
          console.error("Error joining room:", error.message);
          Alert.alert(
            "Code invalide",
            "Renseigne un code valide et essaye à nouveau."
          );
        })
        .finally(() => {
          setIsJoiningRoom(false);
        });
    } else {
      Alert.alert(
        "Code invalide",
        "Renseigne un code valide et essaye à nouveau."
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.mainBgColor }}>
      <Text
        style={{
          marginTop: 60,
          textAlign: "center",
          fontFamily: "Carena",
          fontSize: 30,
        }}
      >
        Rejoindre un salon
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontFamily: "Carena",
          color: colors.mainPurple,
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Code d'invitation
      </Text>

      <View style={{ marginHorizontal: 50, marginTop: 15, marginBottom: 20 }}>
        {/* <LinearGradient
            colors={["#09D8AE", "#000000", "#AA71EC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 5,
              padding: 1,
            }}
          > */}
        <TextInput
          placeholder={"XHLPSM..."}
          value={roomCode}
          onChangeText={(text) => setRoomCode(text.toUpperCase())}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "transparent", // Make original border transparent
            padding: 14,
            fontFamily: "Poppins-Regular",
            fontSize: 15,
            backgroundColor: "white", // Set background color to match your theme
          }}
        />
        {/* </LinearGradient> */}
      </View>

      <Pressable
        onPress={handleJoinRoom}
        style={{
          width: 75,
          height: 75,
          borderRadius: 37.5,
          backgroundColor: "#F2F2F2",
          marginTop: 32,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {/* <NextIcon width={40} height={40} color={"black"} /> */}
        <Text>Suivant</Text>
      </Pressable>

      {isJoiningRoom && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject, // This will make the overlay cover the entire screen
            justifyContent: "center", // Center content vertically
            alignItems: "center", // Center content horizontally
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#EDEDED",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        </View>
      )}
    </View>
  );
}

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
import { functions } from "../../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import CenteredHeader from "../../../components/CenteredHeader";
import CustomText from "../../../components/CustomText";

export default function JoinGame({ route }) {
  const { pseudo } = route.params;

  const navigation = useNavigation();

  const [roomCode, setRoomCode] = useState("");
  const [isJoiningRoom, setIsJoiningRoom] = useState("");

  const handleJoinRoom = () => {
    setIsJoiningRoom(true);

    console.log(roomCode);
    console.log(pseudo);

    if (roomCode !== "") {
      const joinRoomFunction = httpsCallable(functions, "joinRoom");

      joinRoomFunction({ roomCode: roomCode, pseudo: pseudo })
        .then((result) => {
          console.log(result.data);
          navigation.navigate("Game", { roomCode: result.data });
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} />
      <CustomText
        style={{
          marginTop: 60,
          textAlign: "center",
          fontSize: 30,
          color: "white",
        }}
      >
        Rejoindre une partie
      </CustomText>

      <CustomText
        style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 50,
          color: "white",
        }}
      >
        Code d'invitation
      </CustomText>

      <View style={{ marginHorizontal: 50, marginTop: 15, marginBottom: 20 }}>
        <TextInput
          placeholder={"ABCDEF..."}
          value={roomCode}
          onChangeText={(text) => setRoomCode(text.toUpperCase())}
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "transparent", // Make original border transparent
            padding: 14,
            fontSize: 15,
            backgroundColor: "white", // Set background color to match your theme
          }}
        />
      </View>

      <Pressable
        onPress={handleJoinRoom}
        style={{
          marginHorizontal: 50,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#F6F6F6",
          marginBottom: 20,
          borderRadius: 15,
        }}
      >
        <CustomText style={{ fontSize: 27 }}>Rejoindre</CustomText>
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
    </BackgroundWrapper>
  );
}

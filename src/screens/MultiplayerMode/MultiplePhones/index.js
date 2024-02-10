import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../../assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { httpsCallable } from "firebase/functions";
// import { functions } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import CenteredHeader from "../../../components/CenteredHeader";
import CustomText from "../../../components/CustomText";

export default function RatedByFriends() {
  const navigation = useNavigation();

  const [userPseudo, setUserPseudo] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleCreateRoom = async () => {
    if (userPseudo !== "") {
      setIsCreatingRoom(true);

      // const createRoomFunction = httpsCallable(functions, "createRoom");

      // createRoomFunction({ pseudo: userPseudo })
      //   .then((result) => {
      //     //   const roomCode = result.data;
      //     //   console.log(`Room created with code: ${roomCode}`);
      //     setIsCreatingRoom(false);
      //     navigation.navigate("Room", { roomCode: result.data });
      //   })
      //   .catch((error) => {
      //     console.error("Error creating room:", error.message);
      //   });
    } else {
      Alert.alert(
        "Nom invalide",
        "Il faut que tu renseignes un nom pour créer une partie !"
      );
    }
  };

  const handleJoinRoom = () => {
    navigation.navigate("JoinGame", { pseudo: userPseudo });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader
        title={"Plusieurs téléphones"}
        handleGoBack={handleGoBack}
      />

      {/* <View
        style={{
          borderColor: "#ddd",
          height: 120,
          width: 120,
          borderRadius: 60,
          borderWidth: 1,
          alignSelf: "center",
          marginTop: 46,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "500",
            fontFamily: "Carena",
            marginTop: 5,
          }}
        >
          {userPseudo.charAt(0)}.
        </Text>
      </View> */}

      <CustomText
        style={{
          fontSize: 30,
          color: "white",
          textAlign: "center",
          marginTop: Dimensions.get("screen").height * 0.15,
        }}
      >
        Ton pseudo
      </CustomText>
      <View style={{ marginHorizontal: 50, marginTop: 15, marginBottom: 20 }}>
        <TextInput
          placeholder={"Ton pseudo"}
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "transparent", // Make original border transparent
            padding: 12,
            fontSize: 17,
            backgroundColor: "white", // Set background color to match your theme
          }}
        />
      </View>

      <Pressable
        onPress={handleCreateRoom}
        style={{
          marginHorizontal: 50,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#F6F6F6",
          marginBottom: 20,
          borderRadius: 15,
        }}
      >
        <CustomText style={{ fontSize: 27 }}>Créer une partie</CustomText>
      </Pressable>

      <Pressable
        onPress={handleJoinRoom}
        style={{
          marginHorizontal: 50,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#F6F6F6",
          marginBottom: 20,
          borderRadius: 15,
        }}
      >
        <CustomText style={{ fontSize: 27 }}>Rejoindre une partie</CustomText>
      </Pressable>

      {isCreatingRoom && (
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

import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebaseConfig";
import { getDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../../context/userContext";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import CenteredHeader from "../../../components/CenteredHeader";
import CustomText from "../../../components/CustomText";
import i18n from "../../../languages/i18n";

export default function Game({ route }) {
  const navigation = useNavigation();

  const { user } = useUser();
  const { roomCode } = route.params;

  //   const [isUserReady, setIsUserReady] = useState(false);

  console.log("ROOM CODE: ", roomCode);
  const [roomDetails, setRoomDetails] = useState(null);

  const isCurrentUserAdmin = roomDetails?.players.find(
    (player) => player.uid === auth.currentUser.uid
  )?.admin;
  const areAllPlayersReady = roomDetails?.players.every(
    (player) => player.isReady
  );

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomCode);

    // Listen to real-time updates
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        setRoomDetails(doc.data());

        // Check if the party has been started and navigate to RateFriend
        if (doc.data().partyStarted) {
          navigation.navigate("MultiplePhonesQuestions", { roomCode });
        }
      } else {
        console.log("Room does not exist");
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [roomCode]);

  const handleStart = async () => {
    if (roomDetails?.players.length > 1) {
      const roomRef = doc(db, "rooms", roomCode);
      await updateDoc(roomRef, {
        partyStarted: true,
      });
      navigation.navigate("MultiplePhonesQuestions", { roomCode });
    } else {
      Alert.alert(
        "Pas assez de joueurs",
        "Vous devez être au moins 3 joueurs pour lancer une partie !"
      );
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader
        title={i18n.t("gameScreen.title")}
        handleGoBack={handleGoBack}
      />

      {roomDetails ? (
        <>
          <RoomDetails roomDetails={roomDetails} />
          <View
            style={{
              position: "absolute",
              bottom: 60,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{
                fontSize: 24,
                marginBottom: 15,
                color: "white",
              }}
            >
              {i18n.t("gameScreen.codeText")}
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 265 }}>
                <View
                  style={{
                    paddingVertical: 10,
                    // borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 30,
                      letterSpacing: 5,
                    }}
                  >
                    {roomCode}
                  </CustomText>
                </View>
              </View>
            </View>

            {isCurrentUserAdmin ? (
              <>
                <Pressable
                  onPress={handleStart}
                  style={{
                    width: 262,
                    paddingHorizontal: 5,
                    paddingVertical: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginTop: 14,
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 20,
                      color: "#04055F",
                    }}
                  >
                    {i18n.t("gameScreen.startButton")}
                  </CustomText>
                </Pressable>
              </>
            ) : (
              <CustomText
                style={{
                  textAlign: "center",
                  color: "white",
                  marginTop: 20,
                  marginHorizontal: 20,
                }}
              >
                {i18n.t("multiplePhones.waitCreatorText")}
              </CustomText>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </BackgroundWrapper>
  );
}

const RoomDetails = ({ roomDetails }) => {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const fetchedPlayersData = await Promise.all(
        roomDetails.players.map(async (player) => {
          const userRef = doc(db, "users", player.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            return {
              ...player,
              profilePicUrl: userSnap.data().profilePicUrl,
            };
          } else {
            return player; // or handle the error if needed
          }
        })
      );
      setPlayersData(fetchedPlayersData);
    };

    fetchPlayerData();
  }, [roomDetails.players]);

  return (
    <View style={styles.roomDetailsContainer}>
      <ScrollView contentContainerStyle={styles.playersGrid}>
        {playersData.map((player, index) => (
          <View key={index} style={styles.playerContainer}>
            <View
              style={[
                styles.circle,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  //   backgroundColor: "white",
                  borderColor: "white",
                  borderWidth: 1,
                },
              ]}
            >
              <CustomText
                style={{
                  fontSize: 30,
                  fontWeight: "500",
                  marginTop: 5,
                  color: "white",
                }}
              >
                {player?.pseudo ? player.pseudo.charAt(0) : ""}.
              </CustomText>
            </View>

            <CustomText style={styles.pseudo} numberOfLines={1}>
              {player.pseudo}
            </CustomText>
            {/* <View
              style={[
                styles.statusIcon,
                {
                  backgroundColor: player.isReady ? "green" : "lightgray",
                },
              ]}
            >
              {player.isReady ? (
                <Feather name="check" size={17} color="white" />
              ) : (
                <AntDesign name="clockcircleo" size={15} color="white" />
              )}
            </View> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  roomDetailsContainer: {
    height: Dimensions.get("screen").height * 0.18,
    marginHorizontal: 25,
    // backgroundColor: "#F6F6F6",
    borderRadius: 5,
    padding: 25,
    marginTop: 25,
  },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  playerContainer: {
    width: "27%", // Adjust the width to fit 3 in a row
    aspectRatio: 1, // To make sure that width and height are equal
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    width: "90%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 40,
  },
  pseudo: {
    color: "white",
    marginTop: 5,
  },
  statusIcon: {
    position: "absolute",
    bottom: 20,
    right: 5,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});

import {
  View,
  Text,
  Pressable,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

export default function SetupMultiplayer() {
  const navigation = useNavigation();

  const [players, setPlayers] = useState([]);

  const handleStartGame = () => {
    if (players.length >= 3) {
      navigation.navigate("MultiplayerQuestion", { players });
    } else {
      Alert.alert("Not enough players", "Please add at least 3 players.");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <BackButton handleGoBack={handleGoBack} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 50,
          fontFamily: "FrancoisOne",
          color: "white",
          marginBottom: 17,
        }}
      >
        Joueurs
      </Text>
      <PlayersList players={players} setPlayers={setPlayers} />

      <StartButton handleStartGame={handleStartGame} />
    </BackgroundWrapper>
  );
}

const BackButton = (handleGoBack) => {
  return (
    <Pressable
      onPress={handleGoBack}
      style={{
        width: 49,
        height: 49,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <Entypo name="chevron-thin-left" size={24} color="#233C93" />
    </Pressable>
  );
};

const PlayersList = ({ players, setPlayers }) => {
  return (
    <View
      style={{
        height: Dimensions.get("screen").height * 0.57,
        backgroundColor: "white",
        width: "90%",
        alignSelf: "center",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <FlatList
        data={players}
        keyExtractor={(item) => item.pseudo}
        renderItem={({ item }) => (
          <PlayerNameItem player={item} setPlayers={setPlayers} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              marginTop: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "FrancoisOne", fontSize: 25 }}>
              Aucun joueur ajouté
            </Text>
          </View>
        )}
      />
      <PlayerListFooter players={players} setPlayers={setPlayers} />
    </View>
  );
};

const StartButton = ({ handleStartGame }) => {
  return (
    <Pressable
      onPress={handleStartGame}
      style={{
        position: "absolute",
        bottom: 90,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{ fontSize: 27, fontFamily: "FrancoisOne", color: "#182D7C" }}
      >
        C'est parti
      </Text>
    </Pressable>
  );
};

const PlayerNameItem = ({ player, setPlayers }) => {
  const handleRemovePlayer = () => {
    setPlayers((currentPlayers) =>
      currentPlayers.filter((p) => p.pseudo !== player.pseudo)
    );
  };

  return (
    <View
      style={{
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DFDFDF",
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30, fontFamily: "FrancoisOne" }}>
        {player.pseudo}
      </Text>
      <TouchableOpacity
        onPress={handleRemovePlayer}
        style={{
          width: 35,
          height: 35,
          backgroundColor: "#D03636",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 2.5,
            width: 17,
            backgroundColor: "white",
            transform: [{ rotate: "-5deg" }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const PlayerListFooter = ({ players, setPlayers }) => {
  const handleAddPlayer = () => {
    if (players.length >= 10) {
      Alert.alert("Limit Reached", "You cannot add more than 10 players.");
      return;
    }

    Alert.prompt(
      "Ajouter un joueur",
      "Entrez le nom du joueur",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Ajouter",
          onPress: (pseudo) => {
            if (!pseudo) return;

            // Check for duplicate pseudo
            const isDuplicate = players.some(
              (player) => player.pseudo === pseudo
            );
            if (isDuplicate) {
              Alert.alert(
                "Ce nom est déjà ajouté",
                "Each player must have a unique name."
              );
            } else {
              setPlayers([...players, { pseudo }]);
            }
          },
        },
      ],
      "plain-text"
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 15,
        width: "92%",
        alignSelf: "center",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Text
        style={{
          marginBottom: 5,
          fontFamily: "FrancoisOne",
          textAlign: "center",
          color: "#878787",
        }}
      >
        {players.length}/10
      </Text>
      <Pressable
        onPress={handleAddPlayer}
        style={{
          backgroundColor: "#3856C1",
          paddingVertical: 10,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "FrancoisOne",
            textAlign: "center",
            color: "white",
          }}
        >
          Ajouter un joueur
        </Text>
      </Pressable>
    </View>
  );
};

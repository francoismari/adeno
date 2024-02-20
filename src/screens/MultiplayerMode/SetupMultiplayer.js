import {
  View,
  Text,
  Pressable,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/CustomText";
import CenteredHeader from "../../components/CenteredHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../languages/i18n";

export default function SetupMultiplayer() {
  const navigation = useNavigation();

  const [players, setPlayers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleStartGame = async () => {
    // Make this function async

    if (players.length >= 2) {
      setIsLoaded(true);
      try {
        const multiplayerTime = await AsyncStorage.getItem("multiplayerTime"); // Retrieve the value from AsyncStorage
        const time = multiplayerTime ? JSON.parse(multiplayerTime) : 10; // Parse the value or default to 10
        navigation.navigate("MultiplayerQuestion", { players, time }); // Pass it as parameter
      } catch (error) {
        console.error(
          "Failed to read multiplayerTime from AsyncStorage",
          error
        );
        navigation.navigate("MultiplayerQuestion", { players, time: 10 }); // In case of error, default to 10
      } finally {
        setIsLoaded(false);
      }
    } else {
      Alert.alert(
        "Pas assez de joueurs",
        "Ajoute au moins 2 joueurs pour commencer la partie !"
      );
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const submitNewPlayer = () => {
    if (!newPlayerName) {
      setModalVisible(false);
      return;
    }

    const isDuplicate = players.some(
      (player) => player.pseudo === newPlayerName
    );
    if (isDuplicate) {
      Alert.alert(
        i18n.t("setupOnePhone.addPlayerModal.errors.nameAlreadyUsedTitle"),
        i18n.t("setupOnePhone.addPlayerModal.errors.nameAlreadyUsedSubtitle")
      );
    } else {
      setPlayers([...players, { pseudo: newPlayerName }]);
      setNewPlayerName("");
      setModalVisible(false);
    }
  };

  return (
    <BackgroundWrapper bottom>
      <CenteredHeader
        handleGoBack={handleGoBack}
        title={i18n.t("setupOnePhone.title")}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText style={styles.modalTitle}>
              {i18n.t("setupOnePhone.addPlayerModal.title")}
            </CustomText>
            <TextInput
              style={styles.modalTextInput}
              placeholder={i18n.t("setupOnePhone.addPlayerModal.placeholder")}
              onChangeText={setNewPlayerName}
              value={newPlayerName}
              autoFocus={true}
            />
            <Pressable style={styles.modalButton} onPress={submitNewPlayer}>
              <CustomText style={styles.modalButtonText}>
                {i18n.t("setupOnePhone.addPlayerModal.addPlayerButton")}
              </CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>

      <PlayersList
        players={players}
        setPlayers={setPlayers}
        setModalVisible={setModalVisible}
      />

      <StartButton handleStartGame={handleStartGame} />
    </BackgroundWrapper>
  );
}

const PlayersList = ({ players, setPlayers, setModalVisible }) => {
  return (
    <View
      style={{
        height: Dimensions.get("screen").height * 0.57,
        backgroundColor: "white",
        width: "90%",
        marginTop: 30,
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
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
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
            <CustomText style={{ fontFamily: "FrancoisOne", fontSize: 25 }}>
              {i18n.t("setupOnePhone.noPlayerAdded")}
            </CustomText>
          </View>
        )}
      />
      <PlayerListFooter
        players={players}
        setPlayers={setPlayers}
        setModalVisible={setModalVisible}
      />
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
      <CustomText
        style={{ fontSize: 27, fontFamily: "FrancoisOne", color: "#182D7C" }}
      >
        {i18n.t("setupOnePhone.letGoText")}
      </CustomText>
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
      <CustomText style={{ fontSize: 30, fontFamily: "FrancoisOne" }}>
        {player.pseudo}
      </CustomText>
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

const PlayerListFooter = ({ players, setPlayers, setModalVisible }) => {
  const handleAddPlayer = () => {
    if (players.length > 9) {
      Alert.alert(
        i18n.t("setupOnePhone.addPlayerModal.errors.moreThanTenTitle"),
        i18n.t("setupOnePhone.addPlayerModal.errors.moreThanTenSubtitle")
      );
      return;
    }

    setModalVisible(true);
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
      <CustomText
        style={{
          marginBottom: 5,
          fontFamily: "FrancoisOne",
          textAlign: "center",
          color: "#878787",
        }}
      >
        {players.length}/10
      </CustomText>
      <Pressable
        onPress={handleAddPlayer}
        style={{
          backgroundColor: "#3856C1",
          paddingVertical: 10,
          borderRadius: 15,
        }}
      >
        <CustomText
          style={{
            fontSize: 25,
            fontFamily: "FrancoisOne",
            textAlign: "center",
            color: "white",
          }}
        >
          {i18n.t("setupOnePhone.addPlayerText")}
        </CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "FrancoisOne",
    fontSize: 25,
    marginBottom: 10,
  },
  modalTextInput: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#3856C1",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "FrancoisOne",
  },
});

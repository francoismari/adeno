import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/CustomText";
import { useNavigation } from "@react-navigation/native";
import CenteredTitleHeader from "../components/CenteredTitleHeader";
import { useUser } from "../context/userContext";
import { signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import i18n from "../languages/i18n";

const team = [
  {
    name: "Pauline Bizet",
    role: "Bénévole (à completer)",
  },
  {
    name: "Ithier Bariety",
    role: "Bénévole (à completer)",
  },
  {
    name: "Maxime Laporte",
    role: "Bénévole (à completer)",
  },
  {
    name: "Marco Demichelis",
    role: "Bénévole (à completer)",
  },
  {
    name: "Emmie Hallot",
    role: "Bénévole (à completer)",
  },
  {
    name: "Elise Torche",
    role: "Responsable pôle éditorial",
  },
  {
    name: "Alix Poncet",
    role: "Bénévole (à completer)",
  },
  {
    name: "Igor Thiam",
    role: "Bénévole (à completer)",
  },
  {
    name: "Alexandre Alecse",
    role: "Bénévole (à completer)",
  },
  {
    name: "Louise R",
    role: "Bénévole (à completer)",
  },
  {
    name: "Léna Bergougnan-Dijou",
    role: "Bénévole (à completer)",
  },
  {
    name: "Apolline Choux",
    role: "Bénévole (à completer)",
  },
  {
    name: "Emi Heiler",
    role: "Bénévole (à completer)",
  },
  {
    name: "Adelaïde Brouillet",
    role: "Bénévole (à completer)",
  },
  {
    name: "Alice Nigon",
    role: "Bénévole (à completer)",
  },
  {
    name: "May Barthelemy",
    role: "Bénévole (à completer)",
  },
  {
    name: "Emma Constantin",
    role: "Bénévole (à completer)",
  },
  {
    name: "Laurie Segreto",
    role: "Responsable communication",
  },
];

export default function Settings() {
  const navigation = useNavigation();

  const { user, setUser } = useUser();

  const [multiplayerTime, setMultiplayerTime] = useState("10");
  const [modalVisible, setModalVisible] = useState(false);
  const [tempTime, setTempTime] = useState(multiplayerTime);

  const handleClose = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const getMultiplayerTime = async () => {
      const time = await AsyncStorage.getItem("multiplayerTime");
      if (time) {
        setMultiplayerTime(time);
      }
    };
    getMultiplayerTime();
  }, []);

  const saveMultiplayerTime = async () => {
    if (tempTime >= 10 && tempTime <= 20) {
      await AsyncStorage.setItem("multiplayerTime", tempTime.toString());
      setMultiplayerTime(tempTime.toString());
      setModalVisible(false);
    } else if (tempTime == "") {
      setModalVisible(false);
    } else {
      // Handle invalid input, e.g., show an alert
      Alert.alert(
        "Temps de réponse invalide",
        "Il faut que tu choisisses un temps de réponse entre 10 et 20 secondes !"
      );
    }
  };

  const handleSetStudyInfos = () => {
    navigation.navigate("SetStudyInfos");
  };

  const handleSignOutAndDeleteData = async () => {
    try {
      const userId = auth.currentUser.uid;

      if (!userId) {
        console.log("No user is signed in.");
        return;
      }

      await deleteDoc(doc(db, "users", userId));

      // Sign out the user
      await signOut(auth);

      setUser(null);

      console.log("User signed out and data deleted.");
    } catch (error) {
      console.error("Error signing out and deleting user data: ", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleResetResults = () => {
    Alert.alert(
      "Réinitialiser mes résultats",
      "Ton classement sera réinitialisé et tes réponses perdues, es-tu sûr de vouloir réinitialiser tes résultats ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () => {
            AsyncStorage.removeItem("answeredQuestions");
          },
        },
      ]
    );
  };

  const getSecondWord = (fullName) => {
    const names = fullName.split(" ");
    return names.length > 1 ? names[1] : names[0];
  };

  // Sort the team by the second word of their name
  const sortedTeam = team.sort((a, b) => {
    const nameA = getSecondWord(a.name).toUpperCase(); // Ignore case
    const nameB = getSecondWord(b.name).toUpperCase(); // Ignore case
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; // names must be equal
  });

  const handleOpenScientificCouncil = () => {
    navigation.navigate("ScientificCouncil");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader title={"Réglages"} handleClose={handleClose} />

      <ScrollView>
        <CategoryWrapper title={i18n.t("settingsScreen.multiplayerCard.title")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <CustomText style={{ fontSize: 17 }}>
              Temps de réponse par question
            </CustomText>
            <TouchableOpacity
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: "lightgray",
                borderRadius: 10,
              }}
              onPress={() => setModalVisible(true)}
            >
              <CustomText>{multiplayerTime}s</CustomText>
            </TouchableOpacity>
          </View>
        </CategoryWrapper>

        <CategoryWrapper title={i18n.t("settingsScreen.soloCard.title")}>
          {user?.responses ? (
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomText
                style={{ transform: [{ rotate: "-4deg" }], fontSize: 20 }}
              >
                🇪🇺
              </CustomText>
              <CustomText>
                Tu participes à la grande étude sur l'Europe !
              </CustomText>
            </View>
          ) : (
            <>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "FrancoisOne",
                  textAlign: "center",
                }}
              >
                Participe à la grande étude des jeunes en Europe
              </Text>
              <CustomText style={{ color: "gray", textAlign: "center" }}>
                Tes réponses aux questions du mode solo seront enregistrées de
                manière anonyme, et permettront de réaliser une grande étude sur
                les comportements éléctoraux des jeunes en Europe, supervisée
                par un{" "}
                <Text
                  style={{ color: "#5354E8" }}
                  onPress={handleOpenScientificCouncil}
                >
                  conseil scientifique de professeurs, chercheurs, et
                  intellectuels
                </Text>
                .
              </CustomText>
              <TouchableOpacity
                onPress={handleSetStudyInfos}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#DB3366",
                  paddingVertical: 7,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <CustomText style={{ fontSize: 20, color: "white" }}>
                  C'est parti !
                </CustomText>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            onPress={handleResetResults}
            style={{ alignSelf: "center" }}
          >
            <CustomText style={{ fontSize: 17, color: "gray", marginTop: 10 }}>
              {i18n.t("settingsScreen.soloCard.resetResultsText")}
            </CustomText>
          </TouchableOpacity>
        </CategoryWrapper>

        <CategoryWrapper title={i18n.t("settingsScreen.createdByCard.title")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              // alignSelf: "center",
              justifyContent: "space-around",
            }}
          >
            <CreatedByContainer />
          </View>
          <CustomText
            style={{
              fontFamily: "FrancoisOne",
              color: "gray",
              lineHeight: 17,
              textAlign: "center",
              marginTop: 15,
            }}
          >
            {i18n.t("settingsScreen.createdByCard.subtitle")}
          </CustomText>
        </CategoryWrapper>

        <CategoryWrapper title={i18n.t("settingsScreen.incubatedBy.title")}>
          <Image
            source={require("../../assets/images/inceptio.jpg")}
            style={{
              width: 120,
              height: 70,
              borderRadius: 30,
              alignSelf: "center",
              marginTop: 10,
            }}
            resizeMode={'contain'}
          />

          <CustomText style={{ color: "gray" }}>
            {i18n.t("settingsScreen.incubatedBy.subtitle")}
          </CustomText>

          <View style={{ alignSelf: "center" }}>
            <View
              style={{
                // width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/data/images/inceptio/alexis.jpg")}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <CustomText style={{ textAlign: "center", marginTop: 5 }}>
                  Alexis Costa
                </CustomText>
                <CustomText style={{ textAlign: "center", color: "gray" }}>
                  {i18n.t("settingsScreen.incubatedBy.founderMaleText")}
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center", marginHorizontal: 20 }}
              >
                <Image
                  source={require("../../assets/data/images/inceptio/laurie.jpg")}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <CustomText style={{ textAlign: "center", marginTop: 2 }}>
                  Laurie Segreto
                </CustomText>
                <CustomText style={{ textAlign: "center", color: "gray" }}>
                  {i18n.t("settingsScreen.incubatedBy.founderFemaleText")}
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/data/images/inceptio/vladimir.jpg")}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <CustomText style={{ textAlign: "center", marginTop: 2 }}>
                  Vladimir Méline
                </CustomText>
                <CustomText style={{ textAlign: "center", color: "gray" }}>
                  {i18n.t("settingsScreen.incubatedBy.founderMaleText")}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </CategoryWrapper>

        <CategoryWrapper title={i18n.t("settingsScreen.teamCard.title")}>
          {sortedTeam.map((member, index) => {
            return (
              <View style={{ marginBottom: 10 }}>
                <CustomText style={{ fontSize: 17 }}>{member.name}</CustomText>
                <CustomText style={{ fontSize: 14, color: "gray" }}>
                  {member.role}
                </CustomText>
              </View>
            );
          })}
        </CategoryWrapper>

        <CustomText
          style={{
            fontFamily: "FrancoisOne",
            color: "white",
            textAlign: "center",
          }}
        >
          © 2024, Adeno
        </CustomText>
        <CustomText
          style={{
            fontFamily: "FrancoisOne",
            color: "white",
            textAlign: "center",
            marginTop: -2,
          }}
        >
          {i18n.t('settingsScreen.allRightsReserved')}
        </CustomText>

        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ color: "white" }}>Debug dev:</Text>
          <TouchableOpacity onPress={() => AsyncStorage.removeItem("isSetUp")}>
            <Text style={{ color: "white" }}>Reset onboarding</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
            <CustomText style={styles.modalTitle}>Modifier le temps</CustomText>
            <TextInput
              style={styles.modalTextInput}
              placeholder="10"
              onChangeText={setTempTime}
              value={tempTime}
              keyboardType="numeric"
              autoFocus={true}
            />
            <Pressable style={styles.modalButton} onPress={saveMultiplayerTime}>
              <CustomText style={styles.modalButtonText}>
                Enregistrer
              </CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CategoryWrapper = ({ title, children }) => {
  return (
    <View
      style={{
        width: "90%",
        backgroundColor: "white",
        alignSelf: "center",
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
      }}
    >
      <View style={{ alignSelf: "center" }}>
        <View
          style={{
            alignSelf: "flex-start",
            paddingVertical: 2,
            paddingHorizontal: 7,
            backgroundColor: "#FBD51F",
            transform: [{ rotate: "-2deg" }],
            borderRadius: 10,
          }}
        >
          <CustomText
            style={{
              fontSize: 15,
              fontFamily: "FrancoisOne",
              color: "white",
            }}
          >
            {title}
          </CustomText>
        </View>
      </View>

      {children}
    </View>
  );
};

const CreatedByContainer = () => {
  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => Linking.openURL("https://instagram.com/matthieu.mlrd")}
    >
      <Image
        source={require("../../assets/data/images/photo_Matthieu_Adeno.jpg")}
        style={{ width: 90, height: 90, borderRadius: 45 }}
      />
      <View
        style={{
          marginTop: -10,
          backgroundColor: "#DB3366",
          alignSelf: "center",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: "-2deg" }],
        }}
      >
        <CustomText
          style={{
            fontSize: 15,
            fontFamily: "FrancoisOne",
            color: "white",
          }}
        >
          Matthieu Maillard
        </CustomText>
      </View>
    </TouchableOpacity>
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
    backgroundColor: "#5354E8",
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

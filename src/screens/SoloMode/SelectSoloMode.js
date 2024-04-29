import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CenteredHeader from "../../components/CenteredHeader";
import { useUser } from "../../context/userContext";
import i18n from "../../languages/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectSoloMode() {
  const navigation = useNavigation();

  const { user } = useUser();

  const checkForExistingAnswersAndNavigate = async (
    navigateAction,
    modeKey
  ) => {
    const existingAnswers = await AsyncStorage.getItem("answeredQuestions");
    const easyExistingAnswers = await AsyncStorage.getItem(
      "easyModeAnsweredQuestions"
    );
    if (
      existingAnswers &&
      JSON.parse(existingAnswers).length > 0 &&
      modeKey === "easy"
    ) {
      Alert.alert(
        "Attention",
        "Tu as déjà commencé à répondre au mode avancé, si tu relances le mode facile, tes réponses du mode avancé seront réinitialisées, es-tu sûr de vouloir continuer ?",
        [
          {
            text: "Non",
            style: "cancel",
          },
          {
            text: "Oui",
            onPress: async () => {
              await AsyncStorage.removeItem("answeredQuestions");
              navigateAction();
            },
          },
        ]
      );
    } else if (
      easyExistingAnswers &&
      JSON.parse(easyExistingAnswers).length > 0 &&
      modeKey === "easy"
    ) {
      await AsyncStorage.removeItem("easyModeAnsweredQuestions");
    } else {
      navigateAction();
    }
  };

  const modes = [
    {
      id: 1,
      title: i18n.t("selectSoloMode.expressCard.title"),
      description: i18n.t("selectSoloMode.expressCard.subtitle"),
      colors: ["#DB3366", "#E7265A"],
      onPress: () =>
        checkForExistingAnswersAndNavigate(
          () => navigation.navigate("EasyMode"),
          "easy"
        ),
    },
    {
      id: 2,
      title: i18n.t("selectSoloMode.classicCard.title"),
      description: i18n.t("selectSoloMode.classicCard.subtitle"),
      colors: ["#BFBFBFE0", "#BFBFBFE0"],
      onPress: () =>
        checkForExistingAnswersAndNavigate(
          () => navigation.navigate("ClassicMode"),
          "classic"
        ),
    },
  ];

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleSetStudyInfos = () => {
    navigation.navigate("SetStudyInfos");
  };

  console.log("USER : ", user);

  return (
    <BackgroundWrapper>
      <CenteredHeader
        handleGoBack={handleGoBack}
        title={i18n.t("selectSoloMode.title")}
      />

      <ScrollView style={{ flex: 1 }}>
        {modes.map((mode, index) => (
          <ModeCard mode={mode} />
        ))}

        {!user?.responses && (
          <StudyCardInfo handleSetStudyInfos={handleSetStudyInfos} />
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
}

const ModeCard = ({ mode }) => {
  return (
    <Pressable onPress={mode.onPress}>
      <LinearGradient
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#DB3366",
          padding: 15,
          borderRadius: 20,
          // borderWidth: 2,
          // borderColor: "white",
          marginTop: 10,
          marginBottom: 10,
        }}
        colors={mode.colors}
      >
        <CustomText
          style={{
            textAlign: "center",
            fontFamily: "FrancoisOne",
            color: "white",
            fontSize: 25,
          }}
        >
          {mode.title}
        </CustomText>
        <CustomText
          style={{
            textAlign: "center",
            fontFamily: "FrancoisOne",
            color: "white",
            fontSize: 17,
            lineHeight: 20,
            marginTop: 5,
            marginHorizontal: 20,
          }}
        >
          {mode.description}
        </CustomText>
      </LinearGradient>
    </Pressable>
  );
};

const StudyCardInfo = ({ handleSetStudyInfos }) => {
  const navigation = useNavigation();

  const handleOpenScientificCouncil = () => {
    navigation.navigate("ScientificCouncil");
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          marginTop: 5,
          fontFamily: "FrancoisOne",
          textAlign: "center",
          fontSize: 25,
        }}
      >
        🇪🇺
      </Text>
      <Text
        style={{
          marginTop: 5,
          fontFamily: "FrancoisOne",
          textAlign: "center",
        }}
      >
        {i18n.t("settingsScreen.soloCard.studyInfos.title")}
      </Text>
      <CustomText style={{ color: "gray", textAlign: "center" }}>
        {i18n.t("settingsScreen.soloCard.studyInfos.description")}{" "}
        <Text
          style={{ color: "#5354E8" }}
          onPress={handleOpenScientificCouncil}
        >
          {i18n.t("settingsScreen.soloCard.studyInfos.council")}
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
          {i18n.t("settingsScreen.soloCard.studyInfos.startButtonText")}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

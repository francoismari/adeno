import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/CustomText";
import CenteredHeader from "../../components/CenteredHeader";
import { useUser } from "../../context/userContext";

export default function SelectSoloMode() {
  const navigation = useNavigation();

  const { user } = useUser();

  const modes = [
    {
      id: 1,
      title: "Mode express ⏱️",
      description: "60 secondes pour trouver ton candidat, top chrono !",
      colors: ["#DB3366", "#E7265A"],
      onPress: () => navigation.navigate("ExpressMode"),
    },
    {
      id: 2,
      title: "Mode classique 🗳️",
      description:
        "Répond à 100 questions, sans limite de temps, et trouve un résultat adapté à tes convictions !",
      colors: ["#D1B742", "#F1CB22"],
      onPress: () => navigation.navigate("ClassicMode"),
    },
  ];

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleSetStudyInfos = () => {
    navigation.navigate("SetStudyInfos");
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} title={"Mode solo"} />

      <View style={{ marginBottom: 5 }}>
        {modes.map((mode, index) => (
          <ModeCard key={index} mode={mode} />
        ))}
      </View>

      {!user && <StudyCardInfo handleSetStudyInfos={handleSetStudyInfos} />}
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
            marginHorizontal: 40,
          }}
        >
          {mode.description}
        </CustomText>
      </LinearGradient>
    </Pressable>
  );
};

const StudyCardInfo = ({ handleSetStudyInfos }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: "white",
        padding: 10,
        marginTop: 10,
        borderRadius: 15,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          transform: [{ rotate: "-4deg" }],
          // marginTop: 5,
          fontFamily: "FrancoisOne",
          textAlign: "center",
        }}
      >
        🇪🇺
      </Text>
      <Text
        style={{
          fontFamily: "FrancoisOne",
          textAlign: "center",
          fontSize: 20,
          marginHorizontal: 20,
        }}
      >
        Participe à la grande étude des jeunes en Europe
      </Text>
      <CustomText style={{ color: "gray", textAlign: "center" }}>
        Vos réponses aux questions du mode solo seront collectées de manière
        anonyme, et permettront de réaliser une grande étude sur les
        comportements éléctoraux des jeunes en Europe, supervisée par un conseil
        scientifique de professeurs, chercheurs, et intellectuels.
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
    </View>
  );
};

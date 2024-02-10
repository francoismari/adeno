import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";

export default function SelectMultiplayerMode({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleStartWithOnePhone = () => {
    navigation.navigate("SetupMultiplayer");
  };

  const handleStartWithMultiplePhones = () => {
    navigation.navigate("MultiplePhones");
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader title={"Multijoueur"} handleGoBack={handleGoBack} />

      <View
        style={{
          marginHorizontal: 20,
          marginTop: Dimensions.get("screen").height * 0.15,
        }}
      >
        <CustomText
          style={{
            color: "white",
            fontSize: 30,
            textAlign: "center",
            marginBottom: 15,
            marginHorizontal: 30,
          }}
        >
          Sélectionne le mode qui te convient !
        </CustomText>

        <Pressable
          onPress={handleStartWithOnePhone}
          style={{
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            borderRadius: 15,
          }}
        >
          <CustomText
            style={{ fontSize: 25, transform: [{ rotate: "-4deg" }] }}
          >
            📲
          </CustomText>
          <CustomText style={{ marginLeft: 10, fontSize: 20 }}>
            Un seul téléphone
          </CustomText>
        </Pressable>

        <Pressable
          onPress={handleStartWithMultiplePhones}
          style={{
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            marginTop: 20,
            borderRadius: 15,
          }}
        >
          <CustomText
            style={{ fontSize: 25, transform: [{ rotate: "-4deg" }] }}
          >
            👥
          </CustomText>
          <CustomText style={{ marginLeft: 10, fontSize: 20 }}>
            Plusieurs téléphones
          </CustomText>
        </Pressable>
      </View>
    </BackgroundWrapper>
  );
}

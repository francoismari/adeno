import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import i18n from "../../languages/i18n";

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
      <CenteredHeader
        title={i18n.t("selectMultiplayerMode.title")}
        handleGoBack={handleGoBack}
      />

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
          {i18n.t("selectMultiplayerMode.selectText")}
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
            {i18n.t("selectMultiplayerMode.onePhone")}
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
            {i18n.t("selectMultiplayerMode.multiplePhones")}
          </CustomText>
        </Pressable>
      </View>
    </BackgroundWrapper>
  );
}

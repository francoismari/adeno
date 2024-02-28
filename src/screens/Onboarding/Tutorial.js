import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import CustomText from "../../components/CustomText";
import i18n from "../../languages/i18n";

export default function Tutorial() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <CustomText style={{ fontSize: 40, marginTop: 20 }}>🕹️</CustomText>
      <CustomText
        style={{
          fontSize: 30,
          fontFamily: "FrancoisOne",
          color: "white",
          textAlign: "center",
          fontWeight: "300",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        Comment ça marche ?
        {/* {i18n.t("onboardingScreen.firstScreen.mainTitle")} */}
      </CustomText>
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: "#7C7DDA",
            padding: 15,
            width: Dimensions.get("screen").width * 0.9,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "#FBD51F",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              alignSelf: "center",
            }}
          >
            <CustomText
              style={{ fontSize: 20, transform: [{ rotate: "-10deg" }] }}
            >
              🎮
            </CustomText>
          </View>
          <CustomText
            style={{
              color: "white",
              fontSize: 17,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {i18n.t('onboarding.secondScreen.multiplayerBox.title')}
          </CustomText>
          <CustomText
            style={{ color: "white", textAlign: "center", marginTop: 10 }}
          >
            {i18n.t('onboarding.secondScreen.multiplayerBox.description')}
          </CustomText>
        </View>

        <View
          style={{
            backgroundColor: "#7C7DDA",
            padding: 15,
            width: Dimensions.get("screen").width * 0.9,
            borderRadius: 15,
            marginTop: 15,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "#FBD51F",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              alignSelf: "center",
            }}
          >
            <CustomText
              style={{ fontSize: 20, transform: [{ rotate: "-10deg" }] }}
            >
              🎯
            </CustomText>
          </View>
          <CustomText
            style={{
              color: "white",
              fontSize: 17,
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {i18n.t('onboarding.secondScreen.soloBox.title')}
          </CustomText>
          <CustomText
            style={{ color: "white", textAlign: "center", marginTop: 10 }}
          >
            {i18n.t('onboarding.secondScreen.soloBox.description')}
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
}

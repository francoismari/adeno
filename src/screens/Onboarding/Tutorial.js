import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React from "react";
import CustomText from "../../components/CustomText";

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
            Mode multijoueur
          </CustomText>
          <CustomText
            style={{ color: "white", textAlign: "center", marginTop: 10 }}
          >
            Joue avec tes potes, créé des parties et réponds à des questions sur
            les principaux enjeux européens pour voir tes positions et celles de
            tes amis !
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
            Mode solo
          </CustomText>
          <CustomText
            style={{ color: "white", textAlign: "center", marginTop: 10 }}
          >
            Réponds à 100 questions sur 10 thèmes et fais-toi un avis sur les
            principaux groupes aux parlements européens ! Tu verras également à
            quelle tête de liste tu corresponds dans ton pays.
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import i18n from "../../languages/i18n";

export default function ResultsFooter({ handleRestart }) {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 20,
        alignSelf: "center",
        paddingHorizontal: 26,
        paddingTop: 15,
        paddingBottom: 40,
        borderBlockColor: 20,
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <CustomText
        style={{
          fontSize: 20,
          color: "white",
          alignSelf: "center",
          marginBottom: 5,
        }}
      >
        {i18n.t("multiplayerResults.resultsFooter.anotherRound")}
      </CustomText>
      {/* <BlurView> */}
      <Pressable
        onPress={handleRestart}
        style={{
          width: "100%",
          backgroundColor: "#1F3480",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          // paddingVertical: 5,
          borderRadius: 20,
          // borderWidth: 4,
          borderColor: "white",
          paddingBottom: Platform.OS === "android" ? 12 : 0,
        }}
      >
        <CustomText
          style={{
            fontSize: 27,
            paddingVertical: 10,
            fontFamily: "FrancoisOne",
            color: "white",
          }}
        >
          {i18n.t("multiplayerResults.resultsFooter.restartText")}
        </CustomText>
      </Pressable>
    </View>
  );
}

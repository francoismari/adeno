import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import i18n from "../../languages/i18n";

export default function ChoicesButton({ question, handleResponse }) {
  return (
    <View style={{ position: "absolute", bottom: 25, alignSelf: "center" }}>
      {Object.entries(question.choices).map(([choice, partyIDs]) => (
        <ChoiceButton
          choice={choice}
          partyIDs={partyIDs}
          handleResponse={handleResponse}
        />
      ))}
    </View>
  );
}

const ChoiceButton = ({ choice, partyIDs, handleResponse }) => {
  return (
    <TouchableOpacity
      key={choice}
      onPress={() => handleResponse(partyIDs)}
      style={{
        flexDirection: "row",
        width: Dimensions.get("screen").width * 0.8,
        backgroundColor: "white",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 18,
        borderRadius: 20,
      }}
    >
      <CustomText style={{ fontSize: 30 }}>
        {choice === "for" ? "👍 " : ""}
        {choice === "indifferent" ? "🤷 " : ""}
        {choice === "against" ? "👎 " : ""}
      </CustomText>
      <CustomText style={{ fontFamily: "FrancoisOne", fontSize: 30 }}>
        {choice === "for" && i18n.t("multiplayerOnePhoneGame.for")}
        {choice === "indifferent" &&
          i18n.t("multiplayerOnePhoneGame.indifferent")}
        {choice === "against" && i18n.t("multiplayerOnePhoneGame.against")}
      </CustomText>
    </TouchableOpacity>
  );
};

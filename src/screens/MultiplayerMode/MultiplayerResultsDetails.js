import { View, Text } from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CustomText from "../../components/CustomText";

export default function MultiplayerResultsDetails({ route }) {
  const { result } = route.params;

  console.log(result);

  const isGroup =
    result.groupMembers && result.groupMembers.split(" & ").length > 1;
  const adjective = isGroup
    ? `${result.partyDetails.pluralAdjective}`
    : `${result.partyDetails.adjective}`;

  const displayText = isGroup
    ? `, vous êtes les + ${adjective}`
    : `, tu es le + ${adjective}`;

  return (
    <BackgroundWrapper disableTop>
      <CustomText
        style={{
          color: "white",
          fontFamily: "FrancoisOne",
          fontSize: 35,
          textAlign: "center",
          lineHeight: 40,
          marginTop: 35,
          marginHorizontal: 20,
        }}
      >
        {result.groupMembers}
        {displayText}
      </CustomText>
    </BackgroundWrapper>
  );
}

import { View, Text, ScrollView } from "react-native";
import React from "react";
import CenteredTitleHeader from "../components/CenteredTitleHeader";
import CustomText from "../components/CustomText";
import council from "../../assets/data/council";
import i18n from "../languages/i18n";
import { handleClose } from "../utils/navigationUtils";

export default function ScientificCouncil({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader
        title={i18n.t("councilScreen.title")}
        handleClose={handleClose(navigation)}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {council.map((member, index) => (
          <View style={{ marginBottom: 10 }}>
            <CustomText style={{ color: "white", fontSize: 17 }}>
              {member.name}
            </CustomText>
            <CustomText style={{ color: "lightgray", fontSize: 15 }}>
              {member.role}
            </CustomText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

import { View, Text, ScrollView } from "react-native";
import React from "react";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import CustomText from "../../components/CustomText";
import getTransparencyChart from "../../../assets/data/charts/getTransparencyChart";
import { useUser } from "../../context/userContext";
import { handleClose } from "../../utils/navigationUtils";

export default function TransparencyCharter({ navigation }) {
  const { locale } = useUser();

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader title={""} handleClose={handleClose(navigation)} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <CustomText style={{ color: "white" }}>
          {getTransparencyChart(locale.userLocale)}
        </CustomText>
      </ScrollView>
    </View>
  );
}

import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import CustomText from "../../components/CustomText";
import i18n from "../../languages/i18n";

export default function QuestionContext({ navigation, route }) {
  const { context, sources } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader
        title={i18n.t("contextScreen.title")}
        handleClose={handleClose}
      />
      <CustomText
        style={{ marginHorizontal: 20, color: "white", fontSize: 17 }}
      >
        {context}
      </CustomText>
      <TouchableOpacity
        onPress={() => Linking.openURL(sources)}
        style={{ marginHorizontal: 20, marginTop: 20 }}
      >
        <Text style={{ color: "white" }}>Source : {sources}</Text>
      </TouchableOpacity>
    </View>
  );
}

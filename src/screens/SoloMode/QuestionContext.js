import { View, Text } from "react-native";
import React from "react";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import CustomText from "../../components/CustomText";
import i18n from "../../languages/i18n";

export default function QuestionContext({ navigation, route }) {
  const { context } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader title={i18n.t('contextScreen.title')} handleClose={handleClose} />
      <CustomText style={{marginHorizontal: 20, color: 'white', fontSize: 17}}>{context}</CustomText>
    </View>
  );
}

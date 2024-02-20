import { View, Text, ScrollView } from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";

export default function File({ navigation, route }) {
  const { name, text } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} title={""} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
      >
        <CustomText style={{ color: "white", fontSize: 30, marginBottom: 10 }}>
          {name}
        </CustomText>
        <CustomText style={{ color: "white", fontSize: 20 }}>{text}</CustomText>
      </ScrollView>
    </BackgroundWrapper>
  );
}

import { View, Text, Pressable } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import CustomText from "../CustomText";
import { Feather } from "@expo/vector-icons";
import i18n from "../../languages/i18n";

export default function QuestionHeader({
  themeDetails,
  question,
  handleShowContext,
}) {
  return (
    <>
      {themeDetails && (
        <View
          style={{
            marginHorizontal: 20,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: themeDetails.colors[0],
            alignSelf: "flex-start",
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <CustomText style={{ color: "white" }}>
            {themeDetails.emoji} {themeDetails.name}
          </CustomText>
        </View>
      )}
      <View
        style={{
          marginBottom: 15,
          paddingHorizontal: 20,
          // paddingBottom: 10,
        }}
      >
        <CustomText
          style={{
            fontSize: 25,
            color: "white",
            // textAlign: "center",
          }}
        >
          {question}
        </CustomText>
        <View style={{ borderRadius: 25, overflow: "hidden", marginTop: 10 }}>
          <BlurView style={{ padding: 10 }}>
            <Pressable
              onPress={handleShowContext}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Feather name="plus" size={24} color="#3233B7" />
              </View>
              <CustomText
                style={{ fontSize: 15, color: "white", marginLeft: 10 }}
              >
                {i18n.t("randomQuestionScreen.showContextText")}
              </CustomText>
            </Pressable>
          </BlurView>
        </View>
      </View>
    </>
  );
}

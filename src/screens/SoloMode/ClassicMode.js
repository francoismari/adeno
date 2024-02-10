import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import CustomText from "../../components/CustomText";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import themes from "../../../assets/data/themes";

export default function ClassicMode({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleStartRandom = () => {
    navigation.navigate("RandomQuestionScreen", { random: true });
  };

  const handleStartWithTheme = (theme) => {
    navigation.navigate("QuestionScreen", { theme: theme });
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader title={"Classique"} handleGoBack={handleGoBack} />

      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
      >
        <RandomButton handleStartRandom={handleStartRandom} />
        {themes.map((theme, index) => {
          return (
            <ThemeButton
              theme={theme}
              handleStartWithTheme={handleStartWithTheme}
            />
          );
        })}
      </ScrollView>
    </BackgroundWrapper>
  );
}

const RandomButton = ({ handleStartRandom }) => {
  return (
    <Pressable
      onPress={handleStartRandom}
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 15,
        flexDirection: "row",
        borderRadius: 15,
        alignItems: "center",
      }}
    >
      <CustomText style={{ fontSize: 25, transform: [{ rotate: "-4deg" }] }}>
        🔀
      </CustomText>
      <View style={{ marginLeft: 15 }}>
        <CustomText style={{ fontSize: 20, fontWeight: "500" }}>
          Aléatoire
        </CustomText>
        <CustomText style={{ fontSize: 15, color: "gray", marginTop: -5 }}>
          Tous les thèmes
        </CustomText>
      </View>
    </Pressable>
  );
};

const ThemeButton = ({ theme, handleStartWithTheme }) => {
  return (
    <Pressable
      style={{
        width: "100%",
        backgroundColor: "white",
        padding: 15,
        flexDirection: "row",
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <CustomText style={{ fontSize: 25, transform: [{ rotate: "-4deg" }] }}>
        {theme.emoji}
      </CustomText>
      <View style={{ marginLeft: 15 }}>
        <CustomText style={{ fontSize: 20, fontWeight: "500" }}>
          {theme.name}
        </CustomText>
        {/* <CustomText style={{ fontSize: 15, color: "gray", marginTop: -5 }}>
          Tous les thèmes
        </CustomText> */}
      </View>
    </Pressable>
  );
};

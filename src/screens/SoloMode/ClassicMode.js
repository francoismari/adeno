import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../../components/CustomText";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import getTheme from "../../../assets/data/themes/getTheme";
import { useUser } from "../../context/userContext";
import i18n from "../../languages/i18n";

export default function ClassicMode({ navigation }) {
  const { locale } = useUser();

  const [progress, setProgress] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchProgress = async () => {
      const answeredQuestions = await AsyncStorage.getItem("answeredQuestions");
      const answeredArray = answeredQuestions
        ? JSON.parse(answeredQuestions)
        : [];

      const progressData = getTheme(locale.userLocale).reduce((acc, theme) => {
        const answeredForTheme = answeredArray.filter(
          (question) => question.categoryId === theme.id
        ).length;
        acc[theme.id] = answeredForTheme;
        return acc;
      }, {});
      setProgress(progressData);
    };

    fetchProgress();
  }, [isFocused]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleStartRandom = () => {
    navigation.navigate("RandomQuestionScreen", { random: true });
  };

  const handleStartWithTheme = (theme) => {
    navigation.navigate("ThemeQuestionScreen", { themeId: theme.id });
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader title={"Classique"} handleGoBack={handleGoBack} />

      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <RandomButton handleStartRandom={handleStartRandom} />
        {getTheme(locale.userLocale)
          .slice(0, 10)
          .map((theme, index) => {
            return (
              <ThemeButton
                key={theme.id} // Added key prop for optimization
                theme={theme}
                handleStartWithTheme={handleStartWithTheme}
                progress={progress[theme.id] || 0}
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
          {i18n.t("classicMode.randomCard.title")}
        </CustomText>
        <CustomText style={{ fontSize: 15, color: "gray", marginTop: -5 }}>
        {i18n.t("classicMode.randomCard.subtitle")}
        </CustomText>
      </View>
    </Pressable>
  );
};

const ThemeButton = ({ theme, handleStartWithTheme, progress }) => {
  const progressBarWidth = `${(progress / 10) * 100}%`;

  return (
    <Pressable
      onPress={() => handleStartWithTheme(theme)}
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
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <View
            style={{
              height: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 10,
              marginRight: 10,
              width: "92%",
            }}
          >
            <View
              style={{
                height: "100%",
                width: progressBarWidth,
                backgroundColor: "#3031B3",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

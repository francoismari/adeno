import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../languages/i18n";
import CustomText from "../CustomText";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/userContext";
import getGroups from "../../../assets/data/files/groups/getGroups";

export default function FinishedScreen() {
  const navigation = useNavigation();

  const { locale } = useUser();

  const [favoriteGroups, setFavoriteGroups] = useState(null);

  const calculateFavoriteGroup = async () => {
    const answered = await AsyncStorage.getItem("answeredQuestions");
    const answeredQuestions = answered ? JSON.parse(answered) : [];

    // console.log(answeredQuestions);

    if (answeredQuestions.length === 0) {
      console.log("aucune réponse");
      setFavoriteGroups([]);
      return;
    }

    let tally = {};
    // Corrected to use 'partyId' instead of 'answerId'
    answeredQuestions.forEach(({ partyId }) => {
      tally[partyId] = (tally[partyId] || 0) + 1;
    });

    const totalAnswers = answeredQuestions.length;
    const results = getGroups(locale.userLocale)
      .map((group) => ({
        ...group,
        // Correct calculation of percentage
        percentage: ((tally[group.id] || 0) / totalAnswers) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    await AsyncStorage.setItem("groupResults", JSON.stringify(results));
    setFavoriteGroups(results);
  };

  useEffect(() => {
    calculateFavoriteGroup();
  }, []);

  const handleNavigateToResults = () => {
    navigation.navigate("UserResults", { favoriteGroups });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <CustomText style={{ fontSize: 40, marginBottom: 10 }}>🥳</CustomText>
        <CustomText
          style={{
            fontSize: 25,
            color: "white",
            textAlign: "center",
            marginHorizontal: 20,
          }}
        >
          {i18n.t("randomQuestionScreen.allQuestionsAnswered")}
        </CustomText>
      </View>

      <View
        style={{
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={handleNavigateToResults}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            backgroundColor: "#4344D0",
            paddingHorizontal: 17,
            paddingVertical: 12,
            borderRadius: 15,
          }}
        >
          <CustomText
            style={{ color: "white", textAlign: "center", fontSize: 20 }}
          >
            {i18n.t("randomQuestionScreen.showResultsText")}
          </CustomText>
        </Pressable>
        <Pressable onPress={handleGoBack}>
          <CustomText
            style={{ color: "white", textAlign: "center", fontSize: 20 }}
          >
            {i18n.t("randomQuestionScreen.goBack")}
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
}

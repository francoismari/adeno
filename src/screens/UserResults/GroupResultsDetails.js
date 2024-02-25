import React, { useState, useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import CustomText from "../../components/CustomText";
import questions from "../../../assets/data/solo/questions_fr";
import getTheme from "../../../assets/data/themes/getTheme";
import { useUser } from "../../context/userContext";
import { handleClose } from "../../utils/navigationUtils";

export default function GroupResultsDetails({ navigation, route }) {
  const {locale} = useUser();

  const { group } = route.params;
  const [organizedAnswers, setOrganizedAnswers] = useState({});
  const [themePercentage, setThemePercentage] = useState({});

  useEffect(() => {
    const fetchAnswers = async () => {
      const answeredQuestions = await AsyncStorage.getItem("answeredQuestions");
      const answeredArray = answeredQuestions
        ? JSON.parse(answeredQuestions)
        : [];
      organizeAnswersByCategory(answeredArray);
    };

    fetchAnswers();
  }, []);

  const organizeAnswersByCategory = (answeredArray) => {
    // Filter answers for the specific group
    const filteredAnswers = answeredArray.filter(
      (answer) => answer.partyId === group.id
    );
    const categorizedAnswers = {};
    const answerCountByTheme = {};

    filteredAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        const categoryName = question.category;
        const userAnswer = question.answers.find(
          (a) => a.partyId === answer.partyId
        );

        if (!categorizedAnswers[categoryName]) {
          categorizedAnswers[categoryName] = [];
          answerCountByTheme[categoryName] = { answered: 0, total: 0 };
        }
        if (!answerCountByTheme[categoryName].total) {
          // Count total questions per theme only once
          answerCountByTheme[categoryName].total = questions.filter(
            (q) => q.category === categoryName
          ).length;
        }
        categorizedAnswers[categoryName].push({
          question: question.question,
          answerText: userAnswer ? userAnswer.text : "Answer not found",
        });
        answerCountByTheme[categoryName].answered++;
      }
    });

    // Calculate the percentage for each theme
    const themePercentageCalculated = Object.keys(answerCountByTheme).reduce(
      (acc, themeId) => {
        const { answered, total } = answerCountByTheme[themeId];
        const percentage = total > 0 ? (answered / total) * 100 : 0;
        acc[themeId] = percentage.toFixed(0); // Rounds the percentage
        return acc;
      },
      {}
    );

    setOrganizedAnswers(categorizedAnswers);
    setThemePercentage(themePercentageCalculated);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader handleClose={handleClose(navigation)} title={group.name} />
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <Image
          source={group.imageUrl}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            alignSelf: "center",
            marginBottom: 10,
          }}
        />
      </View>

      <CustomText
        style={{
          color: "white",
          fontSize: 22,
          alignSelf: "center",
          marginVertical: 10,
          marginHorizontal: 30,
          textAlign: "center",
        }}
      >
        {group.fullname}
      </CustomText>

      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(organizedAnswers).map((category, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <CustomText style={{ fontSize: 18, color: "white" }}>
                {getTheme(locale.userLocale).find((theme) => theme.id === parseInt(category))?.emoji}{" "}
                {getTheme(locale.userLocale).find((theme) => theme.id === parseInt(category))?.name}
              </CustomText>
              <View
                style={{
                  backgroundColor: getTheme(locale.userLocale).find(
                    (theme) => theme.id === parseInt(category)
                  )?.mainColor,
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                  borderRadius: 8,
                  marginLeft: 5,
                }}
              >
                <CustomText style={{ color: "white" }}>
                  {themePercentage[category]}%
                </CustomText>
              </View>
            </View>
            {organizedAnswers[category].map((item, answerIndex) => (
              <View
                key={answerIndex}
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              >
                <CustomText style={{ fontSize: 16, color: "#5354E8" }}>
                  {item.question}
                </CustomText>
                <CustomText style={{ fontSize: 14, color: "gray" }}>
                  {item.answerText}
                </CustomText>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

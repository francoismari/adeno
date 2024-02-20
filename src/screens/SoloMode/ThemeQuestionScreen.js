import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import questions from "../../../assets/data/solo/questions_fr";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import themes from "../../../assets/data/themes";
import { BlurView } from "expo-blur";
import CenteredThemeHeader from "../../components/CenteredThemeHeader";
import { Feather } from "@expo/vector-icons";
import { useUser } from "../../context/userContext";
import questionsByLocale from "../../../assets/data/solo/questionsByLocale";
import questions_en from "../../../assets/data/solo/questions_en";
import QuestionHeader from "../../components/Solo/QuestionHeader";

export default function ThemeQuestionScreen({ navigation, route }) {
  const { locale } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questions, setQuestions] = useState(questions_en);

  useEffect(() => {
    // Select questions set based on the current locale, defaulting to English if not found
    const selectedQuestions =
      questionsByLocale[locale.userLocale] || questions_en;
    setQuestions(selectedQuestions);
  }, [locale]);

  const { themeId } = route.params;

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const answered = await AsyncStorage.getItem("answeredQuestions");
    const answeredArray = answered ? JSON.parse(answered) : [];
    setAnsweredQuestions(answeredArray);
    loadRandomUnansweredQuestionForTheme(answeredArray, themeId);
  };

  const loadRandomUnansweredQuestionForTheme = (answeredArray, themeId) => {
    const themeQuestions = questions.filter(
      (question) => question.category === themeId
    );
    const unansweredQuestionIndices = themeQuestions
      .map((_, index) => index)
      .filter(
        (index) =>
          !answeredArray.find((a) => a.questionId === themeQuestions[index].id)
      );

    if (unansweredQuestionIndices.length > 0) {
      const randomIndex =
        unansweredQuestionIndices[
          Math.floor(Math.random() * unansweredQuestionIndices.length)
        ];
      setCurrentQuestionIndex(randomIndex);
    } else {
      setCurrentQuestionIndex(null); // No more questions for the theme or all answered
    }
  };

  const handleAnswer = async (questionId, partyId) => {
    const newAnswer = { questionId, partyId, categoryId: themeId };
    const updatedAnsweredQuestions = [...answeredQuestions, newAnswer];

    console.log(newAnswer);

    await AsyncStorage.setItem(
      "answeredQuestions",
      JSON.stringify(updatedAnsweredQuestions)
    );

    setAnsweredQuestions(updatedAnsweredQuestions);
    loadRandomUnansweredQuestionForTheme(updatedAnsweredQuestions, themeId);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const themeDetails = themes.find((theme) => theme.id === themeId);

  const handleShowContext = () => {
    navigation.navigate("QuestionContext", {
      context: questions.filter((question) => question.category === themeId)[
        currentQuestionIndex
      ].learnMore,
    });
  };

  return (
    <BackgroundWrapper>
      <CenteredThemeHeader theme={themeDetails} handleGoBack={handleGoBack} />
      {currentQuestionIndex !== null ? (
        <>
          <QuestionHeader
            question={
              questions.filter((question) => question.category === themeId)[
                currentQuestionIndex
              ].question
            }
            handleShowContext={handleShowContext}
          />

          <FlatList
            data={
              questions.filter((question) => question.category === themeId)[
                currentQuestionIndex
              ].answers
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  width: "100%",
                  borderRadius: 10,
                  backgroundColor: "white",
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  marginBottom: 10,
                }}
                onPress={() =>
                  handleAnswer(
                    questions.filter(
                      (question) => question.category === themeId
                    )[currentQuestionIndex].id,
                    item.partyId
                  )
                }
              >
                <CustomText
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    // fontWeight: "500",
                  }}
                >
                  {item.text}
                </CustomText>
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          />
        </>
      ) : (
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
            Tu as répondu à toutes les questions pour ce thème
          </CustomText>
        </View>
      )}
    </BackgroundWrapper>
  );
}

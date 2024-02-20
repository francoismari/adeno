import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../components/BackgroundWrapper";

import questionsFR from "../../../assets/data/solo/questions_fr";
import questionsEN from "../../../assets/data/solo/questions_en";
import questionsBG from "../../../assets/data/solo/questions_bg";

import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import shuffleArray from "../../utils/shuffleArray";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import themes from "../../../assets/data/themes";
import { useUser } from "../../context/userContext";
import i18n from "../../languages/i18n";
import questionsByLocale from "../../../assets/data/solo/questionsByLocale";
import questions_en from "../../../assets/data/solo/questions_en";
import QuestionHeader from "../../components/Solo/QuestionHeader";

export default function RandomQuestionScreen({ navigation }) {
  const { locale } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questions, setQuestions] = useState(questions_en);

  // Mapping of locale codes to question sets

  useEffect(() => {
    // Select questions set based on the current locale, defaulting to English if not found
    const selectedQuestions =
      questionsByLocale[locale.userLocale] || questions_en;
    setQuestions(selectedQuestions);
  }, [locale]);

  // Load the initial unanswered question.
  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const answered = await AsyncStorage.getItem("answeredQuestions");
    const answeredArray = answered ? JSON.parse(answered) : [];
    setAnsweredQuestions(answeredArray);

    loadRandomUnansweredQuestion(answeredArray);
  };

  const loadRandomUnansweredQuestion = (answeredArray) => {
    const unansweredQuestionIndices = questions
      .map((_, index) => index)
      .filter(
        (index) =>
          !answeredArray.find((a) => a.questionId === questions[index].id)
      );

    if (unansweredQuestionIndices.length > 0) {
      const randomIndex =
        unansweredQuestionIndices[
          Math.floor(Math.random() * unansweredQuestionIndices.length)
        ];
      setCurrentQuestionIndex(randomIndex);
    } else {
      setCurrentQuestionIndex(null); // No more questions or all answered
    }
  };

  const handleAnswer = async (questionId, partyId, categoryId) => {
    const newAnswer = { questionId, partyId, categoryId };
    const updatedAnsweredQuestions = [...answeredQuestions, newAnswer];

    await AsyncStorage.setItem(
      "answeredQuestions",
      JSON.stringify(updatedAnsweredQuestions)
    );

    // Set the answered questions state and immediately load another question.
    setAnsweredQuestions(updatedAnsweredQuestions);
    loadRandomUnansweredQuestion(updatedAnsweredQuestions);
  };

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleShowContext = () => {
    navigation.navigate("QuestionContext", {
      context: questions[currentQuestionIndex].learnMore,
    });
  };

  const themeDetails = themes.find(
    (theme) => theme.id === questions[currentQuestionIndex]?.category
  );

  return (
    <BackgroundWrapper>
      <CenteredHeader
        title={i18n.t("randomQuestionScreen.title")}
        handleGoBack={handleGoBack}
      />
      <View>
        {currentQuestionIndex !== null ? (
          <>
            <QuestionHeader
              themeDetails={themeDetails}
              question={questions[currentQuestionIndex].question}
              handleShowContext={handleShowContext}
            />

            <FlatList
              data={shuffleArray(questions[currentQuestionIndex].answers)}
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
                      questions[currentQuestionIndex].id,
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
                paddingBottom: 400,
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
            <CustomText style={{ fontSize: 40, marginBottom: 10 }}>
              🥳
            </CustomText>
            <CustomText
              style={{
                fontSize: 25,
                color: "white",
                textAlign: "center",
                marginHorizontal: 20,
              }}
            >
              Tu as répondu à toutes les questions !
            </CustomText>
          </View>
        )}
      </View>
    </BackgroundWrapper>
  );
}

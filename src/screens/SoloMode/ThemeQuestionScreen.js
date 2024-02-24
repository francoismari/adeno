import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CustomText from "../../components/CustomText";
import CenteredThemeHeader from "../../components/CenteredThemeHeader";
import { useUser } from "../../context/userContext";
import questionsByLocale from "../../../assets/data/solo/questionsByLocale";
import questions_en from "../../../assets/data/solo/questions_en";
import QuestionHeader from "../../components/Solo/QuestionHeader";
import getTheme from "../../../assets/data/themes/getTheme";
import FinishedScreen from "../../components/Solo/FinishedScreen";
import { auth, db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ThemeQuestionScreen({ navigation, route }) {
  const { user, locale } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questions, setQuestions] = useState(questions_en);

  useEffect(() => {
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
    if (user?.responses) {
      const studyResponseRef = collection(db, "studyResponses"); // Reference to the 'studyResponses' collection

      const response = {
        questionId,
        answerId: partyId,
        userId: auth.currentUser.uid,
      };

      try {
        await addDoc(studyResponseRef, response);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    // Update answeredQuestions state and load the next question
    const newAnswer = { questionId, partyId, categoryId: route.params.themeId };
    const updatedAnsweredQuestions = [...answeredQuestions, newAnswer];

    await AsyncStorage.setItem(
      "answeredQuestions",
      JSON.stringify(updatedAnsweredQuestions)
    );

    setAnsweredQuestions(updatedAnsweredQuestions);
    loadRandomUnansweredQuestionForTheme(
      updatedAnsweredQuestions,
      route.params.themeId
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const themeDetails = getTheme(locale.userLocale).find(
    (theme) => theme.id === themeId
  );

  const handleShowContext = () => {
    navigation.navigate("QuestionContext", {
      context: questions.filter((question) => question.category === themeId)[
        currentQuestionIndex
      ].learnMore,
      sources: questions.filter((question) => question.category === themeId)[
        currentQuestionIndex
      ].sources,
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
        <FinishedScreen />
      )}
    </BackgroundWrapper>
  );
}

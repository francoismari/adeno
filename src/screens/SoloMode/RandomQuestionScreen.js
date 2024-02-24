import React, { useState, useEffect } from "react";
import { View, Pressable, FlatList, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../components/BackgroundWrapper";

import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import shuffleArray from "../../utils/shuffleArray";
import { useUser } from "../../context/userContext";
import i18n from "../../languages/i18n";
import questionsByLocale from "../../../assets/data/solo/questionsByLocale";
import questions_en from "../../../assets/data/solo/questions_en";
import QuestionHeader from "../../components/Solo/QuestionHeader";
import getTheme from "../../../assets/data/themes/getTheme";
import FinishedScreen from "../../components/Solo/FinishedScreen";
import { auth, db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function RandomQuestionScreen({ navigation }) {
  const { user, locale } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [questions, setQuestions] = useState(questions_en);

  useEffect(() => {
    const selectedQuestions =
      questionsByLocale[locale.userLocale] || questions_en;
    setQuestions(selectedQuestions);
  }, [locale]);

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

  // const handleAnswer = async (questionId, partyId, categoryId) => {
  //   const newAnswer = { questionId, partyId, categoryId };
  //   const updatedAnsweredQuestions = [...answeredQuestions, newAnswer];

  //   await AsyncStorage.setItem(
  //     "answeredQuestions",
  //     JSON.stringify(updatedAnsweredQuestions)
  //   );

  //   // Set the answered questions state and immediately load another question.
  //   setAnsweredQuestions(updatedAnsweredQuestions);
  //   loadRandomUnansweredQuestion(updatedAnsweredQuestions);
  // };

  const handleAnswer = async (questionId, partyId, categoryId) => {
    if (user?.responses) {
      const studyResponseRef = collection(db, "studyResponses");

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

    // Proceed with storing the answer locally as before
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
    navigation.goBack();
  };

  const handleShowContext = () => {
    navigation.navigate("QuestionContext", {
      context: questions[currentQuestionIndex].learnMore,
      sources: questions[currentQuestionIndex].sources,
    });
  };

  const themeDetails = getTheme(locale.userLocale).find(
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
          <FinishedScreen />
        )}
      </View>
    </BackgroundWrapper>
  );
}

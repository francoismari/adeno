import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import questions from "../../../assets/data/solo/questions";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";

export default function RandomQuestionScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

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

  const handleAnswer = async (questionId, answerId) => {
    const newAnswer = { questionId, answerId };
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

  return (
    <BackgroundWrapper>
      <CenteredHeader title="Aléatoire" handleGoBack={handleGoBack} />
      <View>
        {/* <Text>
          {answeredQuestions.length}/{questions.length}
        </Text> */}
        {currentQuestionIndex !== null ? (
          <View style={{ marginHorizontal: 20 }}>
            <FlatList
              data={questions[currentQuestionIndex].answers}
              ListHeaderComponent={() => (
                <CustomText
                  style={{
                    fontSize: 30,
                    color: "white",
                    textAlign: "center",
                    marginBottom: 15,
                  }}
                >
                  {questions[currentQuestionIndex].question}
                </CustomText>
              )}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    backgroundColor: "white",
                    padding: 15,
                    marginBottom: 15,
                  }}
                  onPress={() =>
                    handleAnswer(
                      questions[currentQuestionIndex].id,
                      item.partyId
                    )
                  }
                >
                  <CustomText style={{ fontSize: 20 }}>{item.text}</CustomText>
                </Pressable>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 150 }}
            />
          </View>
        ) : (
          <Text>No more questions or load error</Text>
        )}
      </View>
    </BackgroundWrapper>
  );
}

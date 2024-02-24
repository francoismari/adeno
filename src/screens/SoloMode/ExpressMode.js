import { View, Text, Pressable, FlatList, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CenteredHeader from "../../components/CenteredHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import shuffleArray from "../../utils/shuffleArray";
import questions_en from "../../../assets/data/solo/questions_en";
import { useUser } from "../../context/userContext";
import questionsByLocale from "../../../assets/data/solo/questionsByLocale";
import QuestionHeader from "../../components/Solo/QuestionHeader";
import i18n from "../../languages/i18n";
import { auth, db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ExpressMode() {
  const { user, locale } = useUser();

  const navigation = useNavigation();

  const [isReady, setIsReady] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [expressQuestions, setExpressQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      // Select questions set based on the current locale, defaulting to English if not found
      const selectedQuestions =
        questionsByLocale[locale.userLocale] || questions_en;

      const filteredQuestions = selectedQuestions
        .filter((q) => q.express)
        .sort(() => Math.random() - 0.5);

      setExpressQuestions(filteredQuestions);
      setCurrentQuestion(filteredQuestions[0]);
    };

    loadQuestions();
  }, [locale]);

  const handleAnswer = async (questionId, partyId, categoryId) => {
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

    const newAnswer = { questionId, partyId, categoryId };
    const updatedAnsweredQuestions = [...answeredQuestions, newAnswer];
    await AsyncStorage.setItem(
      "answeredQuestions",
      JSON.stringify(updatedAnsweredQuestions)
    );
    setAnsweredQuestions(updatedAnsweredQuestions);

    const nextIndex =
      expressQuestions.findIndex((q) => q === currentQuestion) + 1;
    if (nextIndex < expressQuestions.length) {
      setCurrentQuestion(expressQuestions[nextIndex]);
    } else {
      onFinish();
    }
  };

  const onFinish = () => {
    navigation.navigate("ExpressResults");
  };

  const handleStartGame = async () => {
    await AsyncStorage.removeItem("answeredQuestions");

    setIsReady(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader
        title={i18n.t("expressMode.title")}
        handleGoBack={handleGoBack}
      />

      {isReady ? (
        <ExpressScreen
          navigation={navigation}
          data={currentQuestion.answers}
          handleAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          totalQuestions={expressQuestions.length}
          currentQuestionIndex={expressQuestions.indexOf(currentQuestion) + 1} // +1 because array indexes start at 0
        />
      ) : (
        <RulesScreen handleStartGame={handleStartGame} />
      )}
    </BackgroundWrapper>
  );
}

const RulesScreen = ({ handleStartGame }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          padding: 15,
          borderRadius: 20,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "FrancoisOne",
            fontSize: 20,
            lineHeight: 25,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {i18n.t("expressMode.cardTitle")}
        </Text>
        <Text
          style={{
            fontFamily: "FrancoisOne",
            fontSize: 17,
            lineHeight: 20,
            marginTop: 10,
            color: "gray",
            textAlign: "center",
          }}
        >
          ⚠️ {i18n.t("expressMode.warningText")}
        </Text>
      </View>

      <StartButton handleStartGame={handleStartGame} />
    </>
  );
};

const ExpressScreen = ({
  navigation,
  handleAnswer,
  currentQuestion,
  totalQuestions,
  currentQuestionIndex,
}) => {
  const shuffledAnswers = currentQuestion
    ? shuffleArray([...currentQuestion.answers])
    : [];

  const handleShowContext = () => {
    navigation.navigate("QuestionContext", {
      context: currentQuestion.learnMore,
      sources: currentQuestion.sources,
    });
  };

  const progressAnim = useRef(new Animated.Value(0)).current;
  const targetWidth = (currentQuestionIndex / totalQuestions) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: targetWidth,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex, targetWidth, progressAnim]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            height: 10,
            backgroundColor: "white",
            borderRadius: 10,
            marginRight: 10,
            width: "88%",
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"], // Interpolate width from 0% to 100%
              }),
              backgroundColor: "#3031B3",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      {currentQuestion && (
        <>
          <QuestionHeader
            question={currentQuestion.question}
            handleShowContext={handleShowContext}
          />

          <FlatList
            data={shuffledAnswers}
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
                    currentQuestion.id,
                    item.partyId,
                    currentQuestion.category
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
              paddingBottom: 300,
            }}
          />
        </>
      )}
    </View>
  );
};

const StartButton = ({ handleStartGame }) => {
  return (
    <Pressable
      onPress={handleStartGame}
      style={{
        position: "absolute",
        bottom: 90,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText
        style={{ fontSize: 27, fontFamily: "FrancoisOne", color: "#182D7C" }}
      >
        {i18n.t("expressMode.letsGoText")}
      </CustomText>
    </Pressable>
  );
};

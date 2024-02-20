import { View, Text, Pressable, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import BackButton from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CenteredHeader from "../../components/CenteredHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import shuffleArray from "../../utils/shuffleArray";
import questions_en from "../../../assets/data/solo/questions_en";
import { useUser } from "../../context/userContext";
import questionsByLocale from "../../../assets/data/solo/questionsByLocale";
import QuestionHeader from "../../components/Solo/QuestionHeader";

export default function ExpressMode() {
  const { locale } = useUser();

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
      <CenteredHeader title={"Mode express"} handleGoBack={handleGoBack} />

      {isReady ? (
        <ExpressScreen
          navigation={navigation}
          data={currentQuestion.answers}
          handleAnswer={handleAnswer}
          currentQuestion={currentQuestion}
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
            fontSize: 25,
            fontFamily: "FrancoisOne",
            alignSelf: "center",
          }}
        >
          ÉCRAN À REVOIR
        </Text>

        <Text
          style={{
            fontFamily: "FrancoisOne",
            fontSize: 20,
            lineHeight: 25,
            marginTop: 10,
          }}
        >
          🧑‍💼 Trouve la tête de liste qui te correspond
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
          ⚠️ Attention : pour des résultats plus fiables et des questions sur
          des sujets plus précis, utilise le mode classique !
        </Text>
      </View>

      <StartButton handleStartGame={handleStartGame} />
    </>
  );
};

const ExpressScreen = ({ navigation, handleAnswer, currentQuestion }) => {
  const shuffledAnswers = currentQuestion
    ? shuffleArray([...currentQuestion.answers])
    : [];

  const handleShowContext = () => {
    navigation.navigate("QuestionContext", {
      context: currentQuestion.learnMore,
    });
  };

  return (
    <View>
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
              paddingBottom: 50,
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
        C'est parti
      </CustomText>
    </Pressable>
  );
};

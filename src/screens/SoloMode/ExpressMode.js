import { View, Text, Pressable, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import BackButton from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CenteredHeader from "../../components/CenteredHeader";
import questions from "../../../assets/data/solo/questions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ExpressMode() {
  const navigation = useNavigation();

  const [isReady, setIsReady] = useState(false);
  const [timer, setTimer] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [expressQuestions, setExpressQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const filteredQuestions = questions
      .filter((q) => q.express)
      .sort(() => Math.random() - 0.5);
    setExpressQuestions(filteredQuestions);
    setCurrentQuestion(filteredQuestions[0]);
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      onFinish();
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = async (questionId, partyId) => {
    const newAnswer = { questionId, partyId };
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
          timer={timer}
          // question={questions[currentQuestionIndex]}
          // handleAnswer={handleAnswer}
          // useJoker={useJoker}
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
          Les règles
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontFamily: "FrancoisOne",
            fontSize: 15,
            lineHeight: 17,
            color: "gray",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          Le mode express te permet de trouver ta tête de liste en 60 secondes
          chrono !
        </Text>

        <Text
          style={{
            fontFamily: "FrancoisOne",
            fontSize: 20,
            lineHeight: 25,
            marginTop: 10,
          }}
        >
          ⏱️ 60 secondes pour répondre à un maximum de questions
        </Text>
        {/* <Text
          style={{
            fontFamily: "FrancoisOne",
            fontSize: 20,
            lineHeight: 25,
            marginTop: 10,
          }}
        >
          🃏 3 jokers si tu ne sais pas répondre
        </Text> */}
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

const ExpressScreen = ({
  timer,
  question,
  handleAnswer,
  data,
  currentQuestion,
}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 100,
          fontFamily: "FrancoisOne",
          color: "white",
          textAlign: "center",
        }}
      >
        {timer}
      </Text>

      {currentQuestion && (
        <>
          <FlatList
            data={currentQuestion.answers}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <CustomText
                style={{
                  fontSize: 24,
                  color: "white",
                  textAlign: "center",
                  margin: 20,
                }}
              >
                {currentQuestion.question}
              </CustomText>
            )}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  width: "100%",
                  borderRadius: 20,
                  backgroundColor: "white",
                  padding: 15,
                  marginBottom: 20,
                }}
                onPress={() => handleAnswer(currentQuestion.id, item.partyId)}
              >
                <CustomText style={{ fontSize: 20 }}>{item.text}</CustomText>
              </Pressable>
            )}
            contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 250 }}
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

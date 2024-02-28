import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/CustomText";
import { useUser } from "../../context/userContext";
import multiplayerQuestionsByLocale from "../../../assets/data/multiplayer/getMultiplayerQuestions";
import i18n from "../../languages/i18n";
import ProgressBar from "../../components/Multiplayer/ProgressBar";
import ChoicesButton from "../../components/Multiplayer/ChoicesButton";
import getTheme from "../../../assets/data/themes/getTheme";

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const QuestionsScreen = ({ route }) => {
  const { players, time } = route.params;
  const { locale } = useUser();
  const navigation = useNavigation();

  const totalQuestions = (() => {
    if (players.length >= 2 && players.length <= 4) {
      return 30;
    } else if (players.length > 4 && players.length <= 10) {
      return Math.min(players.length * 7, 50);
    } else if (players.length === 10) {
      return 50;
    }
    return 20; // Fallback for scenarios not covered
  })();

  const [questions, setQuestions] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timer, setTimer] = useState(time);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const loadQuestions = () => {
      const selectedQuestions =
        multiplayerQuestionsByLocale[locale.userLocale] ||
        multiplayerQuestionsByLocale["en"];
      setQuestions(shuffleArray(selectedQuestions));
    };
    loadQuestions();
  }, [locale]);

  useEffect(() => {
    if (timer === 0 || usedQuestions.size >= totalQuestions) {
      nextQuestion();
    }
  }, [timer, usedQuestions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const nextQuestion = () => {
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);

    // Reset timer for next question
    setTimer(time);

    // If all questions have been used, allow repeat for new cycle
    if (usedQuestions.size === questions.length) {
      setUsedQuestions(new Set()); // Optional: Reset if you want to start fresh after all questions have been used
    }
  };

  const handleResponse = (response) => {
    const currentPlayer = players[currentPlayerIndex].pseudo;
    // Select a question that hasn't been used yet for any player
    let nextQuestionIndex = questions.findIndex(
      (_, index) => !usedQuestions.has(index)
    );
    if (nextQuestionIndex === -1) {
      // If all questions were used, allow repeats
      nextQuestionIndex = 0; // Or implement logic to start over or select randomly
    }

    setUsedQuestions((prev) => new Set(prev.add(nextQuestionIndex))); // Mark the question as used

    setResponses((prev) => ({
      ...prev,
      [currentPlayer]: [...(prev[currentPlayer] || []), response],
    }));

    // Move to the next question/player
    nextQuestion();
  };

  const handleCompletion = () => {
    // Logic to handle completion, e.g., navigate to results page
    navigation.navigate("MultiplayerResults", { responses });
  };

  // Call handleCompletion when totalAsked questions reaches totalQuestions
  useEffect(() => {
    if (Array.from(usedQuestions).length >= totalQuestions) {
      handleCompletion();
    }
  }, [usedQuestions, totalQuestions]);

  // Prevent rendering before questions are loaded
  if (questions.length === 0) {
    return <BackgroundWrapper />;
  }

  const currentQuestionIndex =
    Array.from(usedQuestions)[usedQuestions.size - 1] || 0;
  const question = questions[currentQuestionIndex];
  const theme = getTheme(locale.userLocale).find(
    (t) => t.id === question?.theme
  );
  const currentPlayer = players[currentPlayerIndex].pseudo;

  const handleQuitGame = () => {
    Alert.alert(i18n.t("multiplayerOnePhoneGame.alert.quitPartyTitle"), null, [
      {
        text: i18n.t("multiplayerOnePhoneGame.alert.cancel"),
        style: "cancel",
      },
      {
        text: i18n.t("multiplayerOnePhoneGame.alert.quit"),
        style: "default",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };

  return (
    <BackgroundWrapper bottom>
      <BackButton handleGoBack={handleQuitGame} />
      <View style={{ alignSelf: "center" }}>
        <CustomText
          style={{
            // marginTop: 25,
            color: "white",
            fontSize: 20,
            fontFamily: "FrancoisOne",
            textAlign: "center",
          }}
        >
          {timer} {i18n.t("multiplayerOnePhoneGame.seconds")}
        </CustomText>

        <ProgressBar timer={timer} totalTime={time} />

        <View style={{ marginTop: Dimensions.get("screen").height * 0.06 }}>
          <View style={{ alignSelf: "center" }}>
            {theme && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginBottom: 18,
                  backgroundColor: theme.mainColor,
                }}
              >
                <CustomText style={{ fontSize: 19, marginRight: 5 }}>
                  {theme.emoji}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 17,
                    color: "white",
                    fontFamily: "FrancoisOne",
                  }}
                >
                  {theme.name}
                </CustomText>
              </View>
            )}
          </View>

          <Text
            style={{
              fontFamily: "FrancoisOne",
              fontSize: Dimensions.get("screen").width * 0.08,
              // fontSize: 35,
              lineHeight: 40,
              marginHorizontal: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            <Text style={{ color: "#E8C51D" }}>{currentPlayer}</Text>,{" "}
            {question.text.charAt(0).toLowerCase() + question.text.slice(1)}
          </Text>
        </View>
      </View>
      {/* <Text style={{ color: "white" }}>{questionNumberDisplay}</Text> */}
      {/* <Text style={styles.timerText}>Time left: {timer}s</Text> */}
      <ChoicesButton question={question} handleResponse={handleResponse} />
    </BackgroundWrapper>
  );
};

export default QuestionsScreen;

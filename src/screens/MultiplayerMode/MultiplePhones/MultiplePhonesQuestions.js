import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../../firebaseConfig";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import CustomText from "../../../components/CustomText";
import i18n from "../../../languages/i18n";
import { useUser } from "../../../context/userContext";
import multiplayerQuestionsByLocale from "../../../../assets/data/multiplayer/getMultiplayerQuestions";
import ProgressBar from "../../../components/Multiplayer/ProgressBar";
import getTheme from "../../../../assets/data/themes/getTheme";

const MultiplePhonesQuestions = ({ route, navigation }) => {
  const { roomCode } = route.params;

  const { locale } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isWaitingForOthers, setIsWaitingForOthers] = useState(false);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomCode);

    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const numberOfPlayers = data.players.length;
        const totalQuestions = (() => {
          if (numberOfPlayers >= 2 && numberOfPlayers <= 4) {
            return 30;
          } else if (numberOfPlayers > 4 && numberOfPlayers < 10) {
            return Math.min(numberOfPlayers * 7, 50);
          } else if (numberOfPlayers === 10) {
            return 50;
          }
          return 0;
        })();

        const selectedQuestions =
          multiplayerQuestionsByLocale[locale.userLocale] ||
          multiplayerQuestionsByLocale["en"];

        setQuestions(selectedQuestions.slice(0, totalQuestions));

        const allUsersFinished =
          data.players.length === data.completedUsers.length;

        if (allUsersFinished) {
          navigation.navigate("MultiplePhonesResults", { roomCode });
        } else {
          const currentUserFinished = data.completedUsers.includes(
            auth.currentUser.uid
          );
          if (currentUserFinished) {
            setIsWaitingForOthers(true);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [roomCode, navigation]);

  useEffect(() => {
    let timer = null;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      handleAnswer("timeout");
    }
    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestionIndex]);

  const handleAnswer = async (stance, groupIds = []) => {
    const responsesRef = doc(
      db,
      `rooms/${roomCode}/responses`,
      `${auth.currentUser.uid}_${currentQuestionIndex}`
    );
    try {
      await setDoc(responsesRef, {
        userId: auth.currentUser.uid,
        questionId: currentQuestionIndex,
        stance: stance,
      });
    } catch (error) {
      console.error("Error saving response: ", error);
      Alert.alert("Error saving response");
    }

    // last question
    if (currentQuestionIndex === questions.length - 1) {
      const roomRef = doc(db, "rooms", roomCode);
      try {
        await updateDoc(roomRef, {
          completedUsers: arrayUnion(auth.currentUser.uid),
        });
        setIsWaitingForOthers(true);
      } catch (error) {
        console.error("Error marking user as completed: ", error);
      }
    } else {
      // next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    }
  };

  const theme = questions[currentQuestionIndex]
    ? getTheme(locale.userLocale).find(
        (t) => t.id === questions[currentQuestionIndex].theme
      )
    : null;

  return questions[currentQuestionIndex] ? (
    <BackgroundWrapper bottom>
      {/* <BackButton /> */}
      {isWaitingForOthers ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <CustomText
            style={{
              fontSize: 40,
              transform: [{ rotate: "-4deg" }],
              marginBottom: 10,
            }}
          >
            ⏳
          </CustomText>
          <CustomText
            style={{ color: "white", fontSize: 25, textAlign: "center" }}
          >
            {i18n.t("gameQuestionsScreen.waitingForPlayersTitle")}
          </CustomText>
          <CustomText
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              marginTop: 10,
            }}
          >
            {i18n.t("gameQuestionsScreen.waitingForPlayersSubtitle")}
          </CustomText>
        </View>
      ) : (
        questions[currentQuestionIndex] && (
          <>
            <View>
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
                  {timeLeft} seconde{timeLeft > 1 && "s"}
                </CustomText>

                <ProgressBar timer={timeLeft} totalTime={10} />

                <View
                  style={{ marginTop: Dimensions.get("screen").height * 0.08 }}
                >
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
                </View>
              </View>
              <CustomText
                style={{
                  fontFamily: "FrancoisOne",
                  fontSize: 35,
                  lineHeight: 40,
                  marginHorizontal: 20,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {questions[currentQuestionIndex].text}
              </CustomText>

              {/* <Text style={styles.timer}>Time left: {timeLeft}s</Text> */}
            </View>
            <View
              style={{ position: "absolute", bottom: 40, alignSelf: "center" }}
            >
              {Object.entries(questions[currentQuestionIndex].choices).map(
                ([choice, groupIds]) => (
                  <TouchableOpacity
                    key={choice}
                    onPress={() => handleAnswer(choice, groupIds)}
                    style={styles.choiceButton}
                  >
                    <CustomText style={{ fontSize: 30 }}>
                      {choice === "for" ? "👍 " : ""}
                      {choice === "indifferent" ? "🤷 " : ""}
                      {choice === "against" ? "👎 " : ""}
                    </CustomText>
                    <CustomText
                      style={{ fontFamily: "FrancoisOne", fontSize: 30 }}
                    >
                      {choice === "for" &&
                        i18n.t("multiplayerOnePhoneGame.for")}
                      {choice === "indifferent" &&
                        i18n.t("multiplayerOnePhoneGame.indifferent")}
                      {choice === "against" &&
                        i18n.t("multiplayerOnePhoneGame.against")}
                    </CustomText>
                  </TouchableOpacity>
                )
              )}
            </View>
          </>
        )
      )}
    </BackgroundWrapper>
  ) : (
    <BackgroundWrapper bottom>
      <ActivityIndicator size={"large"} color={"white"} />
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  question: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    marginHorizontal: 20,
  },
  choiceButton: {
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    paddingVertical: 17,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 18,
    borderRadius: 20,
  },
  choiceText: {
    fontSize: 20,
    textAlign: "center",
  },
  timer: {
    marginTop: 20,
    fontSize: 18,
    color: "white",
  },
});

export default MultiplePhonesQuestions;

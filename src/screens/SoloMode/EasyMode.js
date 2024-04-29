import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, Alert, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import BackButton from "../../components/BackButton";
import CustomText from "../../components/CustomText";
import { useUser } from "../../context/userContext";
import multiplayerQuestionsByLocale from "../../../assets/data/multiplayer/getMultiplayerQuestions";
import ChoicesButton from "../../components/Multiplayer/ChoicesButton";
import getTheme from "../../../assets/data/themes/getTheme";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

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

const EasyMode = () => {
  const { locale } = useUser();
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const selectedQuestions =
        multiplayerQuestionsByLocale[locale.userLocale] ||
        multiplayerQuestionsByLocale["en"];
      const shuffledQuestions = shuffleArray([...selectedQuestions]).slice(
        0,
        25
      );
      setQuestions(shuffledQuestions);
    };
    loadQuestions();
  }, [locale]);

  const handleResponse = async (response) => {
    setResponses((prevResponses) => [...prevResponses, response]);

    try {
      const questionId = questions[currentQuestionIndex].id;

      await addDoc(collection(db, "easyModeResults"), {
        questionId: questionId,
        answer: response,
        locale: locale.userLocale,
        timestamp: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await AsyncStorage.setItem(
        "easyModeAnsweredQuestions",
        JSON.stringify(responses)
      );
      navigation.navigate("EasyModeResults");
    }
  };

  if (questions.length === 0) {
    return <BackgroundWrapper />;
  }

  const question = questions[currentQuestionIndex];
  const theme = getTheme(locale.userLocale).find(
    (t) => t.id === question?.theme
  );

  const handleQuitGame = () => {
    Alert.alert(
      "Quitter le mode facile",
      "Es-tu sûr de vouloir quitter le mode facile ? Tes réponses seront quand même enregistrées.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Quitter",
          style: "default",
          onPress: () => navigation.navigate("Home"),
        },
      ]
    );
  };

  return (
    <BackgroundWrapper bottom>
      <BackButton handleGoBack={handleQuitGame} />
      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />

      <View style={{ alignSelf: "center" }}>
        <View style={{ marginTop: Dimensions.get("screen").height * 0.06 }}>
          {theme && (
            <View style={{ alignSelf: "center" }}>
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
            </View>
          )}

          <Text
            style={{
              fontFamily: "FrancoisOne",
              fontSize: Dimensions.get("screen").width * 0.08,
              lineHeight: 40,
              marginHorizontal: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            {question.text}
          </Text>
        </View>
      </View>
      <ChoicesButton question={question} handleResponse={handleResponse} />
    </BackgroundWrapper>
  );
};

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const targetWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100; // +1 because index starts from 0

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: targetWidth,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex, targetWidth, progressAnim]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 20,
        width: "100%", // Ensure it's full width
        paddingHorizontal: 20, // Add some padding
      }}
    >
      <View
        style={{
          height: 10,
          backgroundColor: "#E0E0E0",
          borderRadius: 10,
          flex: 1, // Take full width
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: "#3031B3",
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default EasyMode;

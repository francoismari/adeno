import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { Entypo } from "@expo/vector-icons";

const questions = [
  {
    text: "Faut-il intervenir militairement pour les droits de l'homme à l'étranger ?",
    choices: {
      Pour: [1, 4, 7],
      Contre: [5, 9, 10],
    },
  },
  {
    text: "Interdirais-tu le port du voile islamique dans les espaces publics ?",
    choices: {
      Pour: [5, 6, 9],
      Contre: [2, 3, 4],
    },
  },
  {
    text: "Exclurais-tu les pays économiquement faibles de la zone euro ?",
    choices: {
      Pour: [5, 6, 9],
      Contre: [1, 2, 3, 4, 7, 10],
    },
  },
  {
    text: "Devrait-on augmenter les dépenses en aide sociale ?",
    choices: {
      Pour: [2, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Doit-on renforcer les mesures contre le changement climatique ?",
    choices: {
      Pour: [3, 4, 7, 10],
      Contre: [5, 6, 9],
    },
  },
  {
    text: "Faut-il limiter l'immigration hors UE ?",
    choices: {
      Pour: [5, 6, 9],
      Contre: [1, 2, 3, 4, 7, 10],
    },
  },
  {
    text: "L'UE doit-elle booster son budget de défense et sécurité ?",
    choices: {
      Pour: [1, 5, 6, 9],
      Contre: [2, 3, 4, 7, 10],
    },
  },
  {
    text: "Pour ou contre une politique fiscale commune dans l'UE ?",
    choices: {
      Pour: [1, 3, 7, 10],
      Contre: [2, 5, 6, 9],
    },
  },
  {
    text: "Devrait-on miser sur le nucléaire comme alternative aux fossiles ?",
    choices: {
      Pour: [1, 3, 6, 9],
      Contre: [2, 4, 5, 7, 10],
    },
  },
  {
    text: "Es-tu pour des normes plus strictes sur les données numériques ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "L'UE doit-elle soutenir davantage les entreprises locales ?",
    choices: {
      Pour: [1, 2, 4, 7, 10],
      Contre: [3, 5, 6, 9],
    },
  },
  {
    text: "Es-tu pour l'interdiction du plastique à usage unique ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Une politique commune de logement social est-elle nécessaire ?",
    choices: {
      Pour: [2, 4, 7, 10],
      Contre: [1, 3, 5, 6, 9],
    },
  },
  {
    text: "Interdirais-tu les voitures à essence d'ici 2030 ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Faut-il un revenu minimum garanti pour tous dans l'UE ?",
    choices: {
      Pour: [2, 4, 7, 10],
      Contre: [1, 3, 5, 6, 9],
    },
  },
  {
    text: "Doit-on abolir toute censure sur internet, même extrémiste ?",
    choices: {
      Pour: [3, 8, 9],
      Contre: [1, 2, 4, 5, 6, 7, 10],
    },
  },
  {
    text: "Es-tu pour la subvention de l'agriculture bio ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Pour ou contre un quota de femmes dans les conseils d'administration ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "L'UE doit-elle exiger plus de transparence sur le financement des partis ?",
    choices: {
      Pour: [1, 2, 3, 4, 7, 10],
      Contre: [5, 6, 9],
    },
  },
  {
    text: "Doit-on imposer une taxe carbone pour financer l'écologie ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Faut-il plus investir dans la recherche des technologies vertes ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Es-tu pour une neutralité d'internet, garantissant un accès égal ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "L'UE doit-elle renforcer ses lois sur l'asile et accueillir plus de réfugiés ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Pour ou contre une régulation commune de la cryptomonnaie ?",
    choices: {
      Pour: [1, 3, 4, 7],
      Contre: [2, 5, 6, 9, 10],
    },
  },
  {
    text: "Doit-on créer un réseau de santé publique européen ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "L'UE devrait-elle financer des bourses d'études pour favoriser l'éducation ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
  {
    text: "Faut-il des quotas obligatoires pour les énergies renouvelables ?",
    choices: {
      Pour: [2, 3, 4, 7, 10],
      Contre: [1, 5, 6, 9],
    },
  },
];

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const QuestionsScreen = ({ route }) => {
  const { players } = route.params;
  const navigation = useNavigation();

  const totalQuestions = 20; // Total questions per game
  const [totalAsked, setTotalAsked] = useState(0); // Total questions asked so far
  const [playerQuestions, setPlayerQuestions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [responses, setResponses] = useState({});

  const handleCompletion = () => {
    console.log("Final responses:", responses); // Add this line for debugging
    navigation.navigate("MultiplayerResults", { responses });
  };

  useEffect(() => {
    if (timer === 0) {
      nextQuestion(); // Move to the next player/question
    }
  }, [timer]);

  useEffect(() => {
    if (totalAsked >= totalQuestions) {
      handleCompletion();
    }
  }, [totalAsked, totalQuestions]);

  useEffect(() => {
    const initPlayerQuestions = {};
    players.forEach((player, index) => {
      initPlayerQuestions[index] = shuffleArray([...questions]);
    });
    setPlayerQuestions(initPlayerQuestions);
  }, [players]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prev) => prev - 1);
  //   }, 1000);

  //   if (timer === 0) {
  //     clearInterval(interval);
  //     nextQuestion(); // Move to the next player/question
  //   }

  //   return () => clearInterval(interval);
  // }, [timer]);

  const nextQuestion = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const nextQuestionIndex =
      nextPlayerIndex === 0 ? currentQuestionIndex + 1 : currentQuestionIndex;

    setCurrentPlayerIndex(nextPlayerIndex);
    setCurrentQuestionIndex(nextQuestionIndex);
    setTimer(10);

    // Update the count of total questions asked after changing the question/player
    setTotalAsked((prev) => prev + 1);
  };

  if (
    !playerQuestions[currentPlayerIndex] ||
    !playerQuestions[currentPlayerIndex][currentQuestionIndex] ||
    totalAsked >= totalQuestions
  ) {
    // Prevent rendering before questions are loaded or if the game is completed
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading questions or game completed...</Text>
      </View>
    );
  }

  const handleResponse = (partyIDs) => {
    const currentPlayer = players[currentPlayerIndex].pseudo;
    setResponses((prev) => ({
      ...prev,
      [currentPlayer]: [...(prev[currentPlayer] || []), partyIDs], // Add as an array
    }));

    nextQuestion();
  };

  const handleQuitGame = () => {
    Alert.alert("Es-tu sûr de vouloir quitter la partie ?", null, [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Quitter",
        style: "default",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };

  const currentPlayer = players[currentPlayerIndex].pseudo;
  const question = playerQuestions[currentPlayerIndex][currentQuestionIndex];
  const questionNumberDisplay = `Question ${totalAsked + 1}/${totalQuestions}`;

  return (
    <BackgroundWrapper>
      <TouchableOpacity
        onPress={handleQuitGame}
        style={{
          zIndex: 100,
          position: "absolute",
          top: 70,
          left: 20,
          // width: 40,
          // height: 40,
          // backgroundColor: "white",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="chevron-thin-left" size={30} color="white" />
      </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        <Text
          style={{
            marginTop: 25,
            color: "white",
            fontSize: 20,
            fontFamily: "FrancoisOne",
            textAlign: "center",
          }}
        >
          {timer} seconde{timer > 1 && "s"}
        </Text>

        <ProgressBar timer={timer} totalTime={10} />

        <Text
          style={{
            marginTop: Dimensions.get("screen").height * 0.1,
            fontFamily: "FrancoisOne",
            fontSize: 35,
            lineHeight: 40,
            marginHorizontal: 30,
            color: "white",
            textAlign: "center",
          }}
        >
          <Text style={{ color: "#E8C51D" }}>{currentPlayer}</Text>,{" "}
          {question.text}
        </Text>
      </View>
      <Text style={{ color: "white" }}>{questionNumberDisplay}</Text>
      {/* <Text style={styles.timerText}>Time left: {timer}s</Text> */}
      <View style={{ marginTop: 46 }}>
        {Object.entries(question.choices).map(([choice, partyIDs]) => (
          <Pressable
            key={choice}
            onPress={() => handleResponse(partyIDs)}
            style={{
              width: Dimensions.get("screen").width * 0.8,
              backgroundColor: "white",
              paddingVertical: 17,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 18,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "FrancoisOne", fontSize: 36 }}>
              {choice}
            </Text>
          </Pressable>
        ))}
      </View>
    </BackgroundWrapper>
  );
};

const ProgressBar = ({ timer, totalTime }) => {
  const animatedWidth = useRef(new Animated.Value(100)).current; // Ref for animated width

  useEffect(() => {
    // Calculate the width percentage and animate the change
    const widthPercentage = Math.max(
      0,
      Math.min(100, (timer / totalTime) * 100)
    );

    Animated.timing(animatedWidth, {
      toValue: widthPercentage,
      duration: 1000, // Duration of the animation
      useNativeDriver: false, // Width change cannot be animated using native driver
    }).start();
  }, [timer, totalTime]);

  return (
    <View
      style={{
        width: Dimensions.get("screen").width * 0.9,
        padding: 4,
        backgroundColor: "#101A40",
        borderRadius: 50,
        alignSelf: "center",
        marginTop: 14,
      }}
    >
      <Animated.View
        style={{
          width: animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"], // Interpolate width from the animated value
          }),
          height: 26,
          backgroundColor: "#FFFFFF",
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export default QuestionsScreen;

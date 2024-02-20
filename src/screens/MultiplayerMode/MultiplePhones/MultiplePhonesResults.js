import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import CustomText from "../../../components/CustomText";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import questions from "../../../../assets/data/multiplayer/questions_fr";
import MultiplayerResultCard from "../../../components/Multiplayer/MultiplayerResultCard";
import ResultsHeader from "../../../components/Multiplayer/ResultsHeader";
import ResultsFooter from "../../../components/Multiplayer/ResultsFooter";
import i18n from "../../../languages/i18n";
import getGroups from "../../../../assets/data/files/groups/getGroups";
import { useUser } from "../../../context/userContext";
import ResultList from "../../../components/Multiplayer/ResultList";

const MultiplePhonesResults = ({ route }) => {
  const { roomCode } = route.params;

  const { locale } = useUser();

  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [playerPseudos, setPlayerPseudos] = useState({}); // New state to hold player pseudos

  // Fetch player pseudos when component mounts
  useEffect(() => {
    const fetchPlayerPseudos = async () => {
      const roomRef = doc(db, `rooms/${roomCode}`);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const roomData = roomSnap.data();
        const pseudos = {};
        roomData.players.forEach((player) => {
          pseudos[player.uid] = player.pseudo; // Assuming each player object has a uid and a pseudo
        });
        setPlayerPseudos(pseudos);
      } else {
        console.log("No such document!");
      }
    };

    fetchPlayerPseudos();
  }, [roomCode]);

  useEffect(() => {
    const fetchAndCalculateResults = async () => {
      const responsesRef = collection(db, `rooms/${roomCode}/responses`);
      const querySnapshot = await getDocs(responsesRef);

      let responses = {}; // Structure: { userId: { questionId: stance, ... }, ... }
      querySnapshot.forEach((doc) => {
        const { userId, questionId, stance } = doc.data();
        if (!responses[userId]) responses[userId] = {};
        responses[userId][questionId] = stance;
      });

      const calculatedResults = calculateResults(responses);
      setResults(Object.values(calculatedResults));
    };

    if (Object.keys(playerPseudos).length > 0) {
      fetchAndCalculateResults();
    }
  }, [playerPseudos, roomCode]);

  const calculateResults = (responses) => {
    let playerScores = {}; // Adjusted structure: { userId: { groupId: count, ... }, ... }

    Object.keys(responses).forEach((userId) => {
      const userResponses = responses[userId];
      if (!playerScores[userId]) playerScores[userId] = {};

      Object.entries(userResponses).forEach(([questionId, stance]) => {
        const chosenGroups = questions[parseInt(questionId)].choices[stance];
        chosenGroups.forEach((groupId) => {
          if (!playerScores[userId][groupId]) playerScores[userId][groupId] = 0;
          playerScores[userId][groupId] += 1;
        });
      });
    });

    return calculateFinalResultsWithDetails(playerScores);
  };

  const calculateFinalResultsWithDetails = (playerScores) => {
    let results = {};

    Object.keys(playerScores).forEach((userId) => {
      const scores = playerScores[userId];
      const totalResponses = Object.values(scores).reduce(
        (acc, val) => acc + val,
        0
      );
      const topGroup = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );
      const topScore = scores[topGroup];
      const matchingPercentage = ((topScore / totalResponses) * 100).toFixed(2);
      const pseudo = playerPseudos[userId] || "Unknown";

      console.log("top group: ", topGroup);

      const groups = getGroups(locale.userLocale);

      results[userId] = {
        groupMembers: pseudo,
        partyDetails: groups.filter((group) => group.id == topGroup)[0],
        matchingPercentage,
      };
    });

    return results;
  };

  const handleRestart = () => {
    navigation.navigate("MultiplePhones");
  };

  return (
    <BackgroundWrapper>
      <ResultsHeader />

      <ResultList results={results} />

      <ResultsFooter handleRestart={handleRestart} />
    </BackgroundWrapper>
  );
};

export default MultiplePhonesResults;

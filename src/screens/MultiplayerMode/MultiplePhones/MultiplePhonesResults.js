import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import CustomText from "../../../components/CustomText";
import { BlurView } from "expo-blur";
import MultiplayerResultCard from "../../../components/Multiplayer/MultiplayerResultCard";
import { useNavigation } from "@react-navigation/native";
import questions from "../../../../assets/data/multiplayer/questions_fr";
import ResultsHeader from "../../../components/Multiplayer/ResultsHeader";
import ResultsFooter from "../../../components/Multiplayer/ResultsFooter";
import i18n from "../../../languages/i18n";
import getGroups from "../../../../assets/data/files/groups/getGroups";
import { useUser } from "../../../context/userContext";
import { Entypo } from "@expo/vector-icons";

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

      // Sort the groups by score in descending order and take the top 3
      const topGroups = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      const groups = getGroups(locale.userLocale);

      // Map topGroups to include group details and matching percentage
      const topGroupsDetails = topGroups.map(([groupId, score]) => {
        const matchingPercentage = ((score / totalResponses) * 100).toFixed(2);
        return {
          groupId,
          partyDetails: groups.filter((group) => group.id == groupId)[0],
          matchingPercentage,
        };
      });

      const pseudo = playerPseudos[userId] || "Unknown";

      results[userId] = {
        groupMembers: pseudo,
        topGroups: topGroupsDetails,
      };
    });

    return results;
  };

  const handleRestart = () => {
    navigation.navigate("MultiplePhones");
  };

  console.log("MAIN RESULTS:", results[0]);

  return (
    <BackgroundWrapper>
      <ResultsHeader />

      <ResultList results={results} />

      <ResultsFooter handleRestart={handleRestart} />
    </BackgroundWrapper>
  );
};

function ResultList({ results }) {
  console.log("RESULTS:", results);

  const scrollViewRef = useRef();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextPress = () => {
    const nextCardPosition =
      (Dimensions.get("window").width * 0.9 + 40) * (currentCardIndex + 1);
    scrollViewRef.current.scrollTo({ x: nextCardPosition, animated: true });
    setCurrentCardIndex(currentCardIndex + 1);
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {results.map((result, index) => {
          console.log("RESULT INDIVIDUAL: ", result);
          return (
            <MultiplayerResultCard
              result={result.topGroups}
              player={result.groupMembers}
            />
          );
        })}
      </ScrollView>

      <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
        <CustomText style={{ fontSize: 18, color: "white" }}>
          {i18n.t("multiplayerResults.seeNext")}
        </CustomText>
        <Entypo name="chevron-right" size={30} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 150 },
  nextButton: {
    position: "absolute",
    bottom: Platform.OS == "android" ? 150 : 180,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: "#FAD41F",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default MultiplePhonesResults;

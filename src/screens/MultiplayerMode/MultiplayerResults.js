import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import mockParties from "../../../assets/mockParties";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";

const MultiplayerResults = ({ route }) => {
  const { responses } = route.params;
  const navigation = useNavigation();

  const calculateResults = () => {
    let playerScores = {};
    let finalResults = {};
    let allocatedParties = {};

    // Calculate individual scores for each player
    Object.keys(responses).forEach((player) => {
      playerScores[player] = responses[player].flat().reduce((acc, partyID) => {
        acc[partyID] = (acc[partyID] || 0) + 1;
        return acc;
      }, {});
    });

    // Sort players by their maximum score in descending order
    let sortedPlayers = Object.keys(playerScores).sort((a, b) => {
      let maxScoreA = Math.max(...Object.values(playerScores[a]));
      let maxScoreB = Math.max(...Object.values(playerScores[b]));
      return maxScoreB - maxScoreA;
    });

    sortedPlayers.forEach((player) => {
      let scores = playerScores[player];
      let sortedParties = Object.keys(scores).sort(
        (a, b) => scores[b] - scores[a]
      );

      for (let partyID of sortedParties) {
        // Assign party if not already taken or if player has a higher score
        if (
          !allocatedParties[partyID] ||
          scores[partyID] > allocatedParties[partyID].score
        ) {
          // Update final results for the player
          finalResults[player] = {
            isGroup: false,
            groupMembers: player,
            partyDetails: mockParties[partyID] || {
              name: "No clear preference",
              adjective: "No clear preference",
              explanation: "Pas d'explication",
              color: "#000000",
              emoji: "❓",
              mockCandidatePicUrl: "https://example.com/default.jpg",
              mockCandidateName: "Unknown",
            },
            matchingPercentage: (
              (scores[partyID] / responses[player].flat().length) *
              100
            ).toFixed(2),
          };
          allocatedParties[partyID] = {
            score: scores[partyID],
            player: player,
          };
          break;
        }
      }
    });

    // Group players with the same highest score for a list
    Object.keys(allocatedParties).forEach((partyID) => {
      let playersWithSameTopScore = sortedPlayers.filter(
        (player) =>
          finalResults[player] &&
          finalResults[player].partyDetails.name === mockParties[partyID].name
      );

      if (playersWithSameTopScore.length > 1) {
        playersWithSameTopScore.forEach((player) => {
          finalResults[player] = {
            ...finalResults[player],
            isGroup: true,
            groupMembers: playersWithSameTopScore.join(" & "),
          };
        });
      }
    });

    // Convert finalResults to an array and sort by matching percentage
    let sortedFinalResultsArray = Object.entries(finalResults).sort((a, b) => {
      return b[1].matchingPercentage - a[1].matchingPercentage;
    });

    // Convert sorted array back to object
    let sortedFinalResults = {};
    sortedFinalResultsArray.forEach(([player, result]) => {
      sortedFinalResults[player] = result;
    });

    return sortedFinalResults;
  };

  const results = calculateResults();

  return (
    <BackgroundWrapper style={styles.container}>
      <CustomText
        style={{
          fontFamily: "FrancoisOne",
          textAlign: "center",
          fontSize: 40,
          marginTop: 20,
          color: "white",
          marginBottom: 14,
        }}
      >
        Les résultats
      </CustomText>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(results).map(([player, result]) => (
          <ResultCard key={player} player={player} result={result} />
        ))}
      </ScrollView>
      <BlurView
        style={{
          width: "100%",
          borderRadius: 20,
          alignSelf: "center",
          paddingHorizontal: 26,
          paddingTop: 15,
          paddingBottom: 40,
          borderBlockColor: 20,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {/* <BlurView> */}
        <Pressable
          onPress={() => navigation.navigate("SetupMultiplayer")}
          style={{
            width: "100%",
            backgroundColor: "#1F3480",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            // paddingVertical: 5,
            borderRadius: 20,
            borderWidth: 4,
            borderColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 27,
              paddingVertical: 10,
              fontFamily: "FrancoisOne",
              color: "white",
            }}
          >
            Recommencer
          </Text>
        </Pressable>
      </BlurView>
    </BackgroundWrapper>
  );
};

const ResultCard = ({ player, result }) => {
  const navigation = useNavigation();

  const isGroup =
    result.groupMembers && result.groupMembers.split(" & ").length > 1;
  const adjective = isGroup
    ? `${result.partyDetails.pluralAdjective}`
    : `${result.partyDetails.adjective}`;

  const displayText = isGroup
    ? `, vous êtes les + ${adjective}`
    : `, tu es le + ${adjective}`;

  const handleSeeDetails = () => {
    navigation.navigate("MultiplayerResultsDetails", { result });
  };

  return (
    <View
      style={{
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        marginBottom: 14,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontFamily: "FrancoisOne",
          lineHeight: 27,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#E8C51D" }}>
          {result.groupMembers}
        </Text>
        {/* {isGroup ? (
          result.groupMembers
        ) : (
          <Text style={{ color: "#E8C51D" }}>{result.groupMembers}</Text>
        )} */}
        <Text>{displayText}</Text>
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 11,
          marginRight: 40,
        }}
      >
        <View style={{ flexDirection: "row", position: "relative" }}>
          <Image
            style={{
              width: 60,
              height: 60,
              backgroundColor: "white",
              borderRadius: 30,
              zIndex: 100,
            }}
            source={{ uri: result.partyDetails.mockCandidatePicUrl }}
          />
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: result.partyDetails.color,
              borderRadius: 30,
              position: "absolute", // Position the second circle absolutely
              left: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{ fontSize: 31, transform: [{ rotate: "5deg" }] }}
            >
              {result.partyDetails.emoji}
            </CustomText>
          </View>
        </View>

        <CustomText
          style={{ zIndex: 100, marginTop: -18, fontSize: 35, marginLeft: 40 }}
        >
          🫶
        </CustomText>
      </View>

      <CustomText
        style={{
          fontFamily: "FrancoisOne",
          fontSize: 17,
          textAlign: "center",
          marginHorizontal: 40,
          lineHeight: 20,
          marginTop: 5,
        }}
      >
        {isGroup ? "Vous matchez" : "Tu matches"} à{" "}
        {Math.round(result.matchingPercentage)}% avec la liste de{" "}
        {result.partyDetails.mockCandidateName}
      </CustomText>
      <CustomText
        style={{
          fontSize: 16,
          color: "#9B9B9B",
          fontFamily: "FrancoisOne",
          lineHeight: 18,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {result.partyDetails.explaination}
      </CustomText>

      <TouchableOpacity onPress={handleSeeDetails}>
        <CustomText
          style={{
            textTransform: "uppercase",
            fontSize: 16,
            fontFamily: "FrancoisOne",
            color: "#294AC0",
            marginTop: 5,
          }}
        >
          Voir pourquoi
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultCard: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
  },
  playerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    color: "#555",
  },
});

export default MultiplayerResults;

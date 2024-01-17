import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import mockParties from "../../../assets/mockParties";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";

const MultiplayerResults = ({ route }) => {
  const { responses } = route.params;
  const navigation = useNavigation();

  const calculateResults = () => {
    let partyScores = {};
    let playerResults = {};

    // Calculate individual scores
    Object.keys(responses).forEach((player) => {
      let tally = {};
      responses[player].forEach((response) => {
        response.forEach((partyID) => {
          tally[partyID] = (tally[partyID] || 0) + 1;
        });
      });

      let maxScore = Math.max(...Object.values(tally));
      let maxParties = Object.keys(tally).filter(
        (partyID) => tally[partyID] === maxScore
      );
      playerResults[player] = { maxParties, maxScore };
    });

    // Group players by party and score
    Object.keys(playerResults).forEach((player) => {
      playerResults[player].maxParties.forEach((partyID) => {
        if (!partyScores[partyID]) {
          partyScores[partyID] = {};
        }
        if (!partyScores[partyID][playerResults[player].maxScore]) {
          partyScores[partyID][playerResults[player].maxScore] = [];
        }
        partyScores[partyID][playerResults[player].maxScore].push(player);
      });
    });

    // Determine final results
    let finalResults = {};
    Object.keys(partyScores).forEach((partyID) => {
      Object.values(partyScores[partyID]).forEach((playersWithSameScore) => {
        playersWithSameScore.forEach((player) => {
          let partyDetails = mockParties[partyID] || {
            name: "No clear preference",
            adjective: "No clear preference",
            explaination: "Pas d'explication",
            color: "#000000",
            emoji: "❓",
            mockCandidatePicUrl: "https://example.com/default.jpg",
            mockCandidateName: "Unknown",
          };

          finalResults[player] = {
            isGroup: playersWithSameScore.length > 1,
            groupMembers: playersWithSameScore.join(" & "),
            partyDetails: partyDetails,
            matchingPercentage: (
              (playerResults[player].maxScore / responses[player].length) *
              100
            ).toFixed(2),
          };
        });
      });
    });

    return finalResults;
  };

  const results = calculateResults();

  return (
    <BackgroundWrapper style={styles.container}>
      <Text
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
      </Text>
      <ScrollView>
        {Object.entries(results).map(([player, result]) => (
          <ResultCard key={player} player={player} result={result} />
        ))}
      </ScrollView>
      {/* <BlurView
        style={{
          width: "100%",
          borderRadius: 20,
          alignSelf: "center",
          paddingHorizontal: 26,
          paddingTop: 26,
          paddingBottom: 40,
          borderBlockColor: 20,
        }}
      > */}
      <Pressable
        onPress={() => navigation.navigate("SetupMultiplayer")}
        style={{
          position: "absolute",
          bottom: 40,
          width: "90%",
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
      {/* </BlurView> */}
    </BackgroundWrapper>
  );
};

const ResultCard = ({ player, result }) => {
  const isGroup =
    result.groupMembers && result.groupMembers.split(" & ").length > 1;
  const adjective = isGroup
    ? `${result.partyDetails.pluralAdjective}`
    : `${result.partyDetails.adjective}`;

  const displayText = isGroup
    ? `, vous êtes les plus ${adjective}`
    : `, tu es le plus ${adjective}`;

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
        <Text style={{ color: "#E8C51D" }}>{result.groupMembers}</Text>
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
            <Text style={{ fontSize: 24 }}>{result.partyDetails.emoji}</Text>
          </View>
        </View>

        <Text style={{ marginTop: -18, fontSize: 35, marginLeft: 40 }}>🫶</Text>
      </View>

      <Text
        style={{
          fontFamily: "FrancoisOne",
          fontSize: 17,
          textAlign: "center",
          marginHorizontal: 40,
          lineHeight: 20,
          marginTop: 5,
        }}
      >
        {isGroup ? 'Vous matchez' : 'Tu matches'} à {Math.round(result.matchingPercentage)}% avec la liste de{" "}
        {result.partyDetails.mockCandidateName}
      </Text>
      <Text
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
      </Text>
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

// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Pressable,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
// } from "react-native";
// import { BlurView } from "expo-blur";
// // import mockParties from "../../../assets/mockParties";
// import BackgroundWrapper from "../../components/BackgroundWrapper";
// import { useNavigation } from "@react-navigation/native";
// import CustomText from "../../components/CustomText";
// import { Entypo } from "@expo/vector-icons";
// import MultiplayerResultCard from "../../components/Multiplayer/MultiplayerResultCard";
// import getGroups from "../../../assets/data/files/groups/getGroups";
// import { useUser } from "../../context/userContext";
// import ResultsHeader from "../../components/Multiplayer/ResultsHeader";
// import ResultsFooter from "../../components/Multiplayer/ResultsFooter";
// import i18n from "../../languages/i18n";
// import ResultList from "../../components/Multiplayer/ResultList";

// const MultiplayerResults = ({ route }) => {
//   const { responses } = route.params;
//   const navigation = useNavigation();

//   const { locale } = useUser();

//   const calculateResults = () => {
//     let playerScores = {};
//     let finalResults = {};
//     let allocatedParties = {};

//     Object.keys(responses).forEach((player) => {
//       playerScores[player] = responses[player].flat().reduce((acc, partyID) => {
//         acc[partyID] = (acc[partyID] || 0) + 1;
//         return acc;
//       }, {});
//     });

//     let sortedPlayers = Object.keys(playerScores).sort((a, b) => {
//       let maxScoreA = Math.max(...Object.values(playerScores[a]));
//       let maxScoreB = Math.max(...Object.values(playerScores[b]));
//       return maxScoreB - maxScoreA;
//     });

//     sortedPlayers.forEach((player) => {
//       let scores = playerScores[player];
//       let sortedParties = Object.keys(scores).sort(
//         (a, b) => scores[b] - scores[a]
//       );

//       for (let partyID of sortedParties) {
//         if (
//           !allocatedParties[partyID] ||
//           scores[partyID] > allocatedParties[partyID].score
//         ) {
//           const partyDetails = getGroups(locale.userLocale).find(
//             (party) => party.id.toString() === partyID
//           ); // Find the party object by its ID
//           finalResults[player] = {
//             isGroup: false,
//             groupMembers: player,
//             partyDetails: partyDetails || {
//               name: "No clear preference",
//               adjective: "No clear preference",
//               explaination: "Pas d'explication",
//               color: "#000000",
//               emoji: "❓",
//               imageUrl: { uri: "https://example.com/default.jpg" },
//             },
//             matchingPercentage: (
//               (scores[partyID] / responses[player].flat().length) *
//               100
//             ).toFixed(2),
//           };
//           allocatedParties[partyID] = {
//             score: scores[partyID],
//             player: player,
//           };
//           break;
//         }
//       }
//     });

//     Object.keys(allocatedParties).forEach((partyID) => {
//       let playersWithSameTopScore = sortedPlayers.filter(
//         (player) =>
//           finalResults[player] &&
//           finalResults[player].partyDetails.id.toString() === partyID
//       );

//       if (playersWithSameTopScore.length > 1) {
//         playersWithSameTopScore.forEach((player) => {
//           finalResults[player] = {
//             ...finalResults[player],
//             isGroup: true,
//             groupMembers: playersWithSameTopScore.join(" & "),
//           };
//         });
//       }
//     });

//     let sortedFinalResultsArray = Object.entries(finalResults).sort(
//       (a, b) => b[1].matchingPercentage - a[1].matchingPercentage
//     );

//     let sortedFinalResults = {};
//     sortedFinalResultsArray.forEach(([player, result]) => {
//       sortedFinalResults[player] = result;
//     });

//     return sortedFinalResults;
//   };

//   const handleRestart = () => {
//     navigation.navigate("SetupMultiplayer");
//   };

//   const results = calculateResults();

//   return (
//     <BackgroundWrapper style={styles.container}>
//       <ResultsHeader />
//       <ResultList results={results} />

//       <ResultsFooter handleRestart={handleRestart} />
//     </BackgroundWrapper>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default MultiplayerResults;

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import { Entypo } from "@expo/vector-icons";
import MultiplayerResultCard from "../../components/Multiplayer/MultiplayerResultCard";
import getGroups from "../../../assets/data/files/groups/getGroups";
import { useUser } from "../../context/userContext";
import ResultsHeader from "../../components/Multiplayer/ResultsHeader";
import ResultsFooter from "../../components/Multiplayer/ResultsFooter";
import i18n from "../../languages/i18n";
import ResultList from "../../components/Multiplayer/ResultList";

const MultiplayerResults = ({ route }) => {
  const { responses } = route.params;
  const navigation = useNavigation();
  const { locale } = useUser();

  const calculateResults = () => {
    let playerScores = {};
    let finalResults = {};

    // Calculate scores for each player
    Object.keys(responses).forEach((player) => {
      playerScores[player] = responses[player].flat().reduce((acc, partyID) => {
        acc[partyID] = (acc[partyID] || 0) + 1;
        return acc;
      }, {});
    });

    // Determine top 3 results for each player
    Object.keys(playerScores).forEach((player) => {
      let scores = playerScores[player];
      let sortedParties = Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 3); // Get top 3 parties

      finalResults[player] = sortedParties.map((partyID) => {
        const partyDetails = getGroups(locale.userLocale).find(
          (party) => party.id.toString() === partyID
        ) || {
          name: "No clear preference",
          adjective: "No clear preference",
          explaination: "Pas d'explication",
          color: "#000000",
          emoji: "❓",
          imageUrl: { uri: "https://example.com/default.jpg" },
        };

        return {
          partyDetails,
          matchingPercentage: (
            (scores[partyID] / responses[player].flat().length) *
            100
          ).toFixed(2),
        };
      });
    });

    return finalResults;
  };

  const handleRestart = () => {
    navigation.navigate("SetupMultiplayer");
  };

  const results = calculateResults();

  return (
    <BackgroundWrapper style={styles.container}>
      <ResultsHeader />
      <ResultList results={results} />
      <ResultsFooter handleRestart={handleRestart} />
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MultiplayerResults;

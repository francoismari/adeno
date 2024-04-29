import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import { useUser } from "../../context/userContext";
import getGroups from "../../../assets/data/files/groups/getGroups";
import i18n from "../../languages/i18n";
import CenteredHeader from "../../components/CenteredHeader";
import getCandidate from "../../../assets/data/files/topList/getTopList";

const EasyModeResults = () => {
  const [responses, setResponses] = useState([]);
  const navigation = useNavigation();
  const { locale } = useUser();

  useEffect(() => {
    const loadResponses = async () => {
      const storedResponses = await AsyncStorage.getItem(
        "easyModeAnsweredQuestions"
      );
      if (storedResponses) {
        console.log("USER ANSWERS :", JSON.parse(storedResponses));

        setResponses(JSON.parse(storedResponses));
      }
    };

    loadResponses();
  }, []);

  //   const calculateResults = () => {
  //     let scores = responses.reduce((acc, partyID) => {
  //       // Ensure partyID is treated as a single ID
  //       // This is crucial if responses somehow contain concatenated IDs
  //       const ids = partyID.toString().split(","); // Split any concatenated IDs
  //       ids.forEach((id) => {
  //         acc[id] = (acc[id] || 0) + 1; // Increment the count for each individual ID
  //       });
  //       return acc;
  //     }, {});

  //     // Find the party ID with the highest score
  //     let topPartyID = null;
  //     let maxCount = 0;
  //     Object.entries(scores).forEach(([id, count]) => {
  //       if (count > maxCount) {
  //         topPartyID = id; // Update topPartyID with the current ID
  //         maxCount = count; // Update maxCount to the current highest count
  //       }
  //     });

  //     console.log("TOP PARTY ID:", topPartyID);

  //     // Ensure there's a fallback if no ID was found or if there's no preference
  //     const partyDetails = getGroups(locale.userLocale).find(
  //       (party) => party.id.toString() === topPartyID
  //     ) || {
  //       name: "No clear preference",
  //       adjective: "No clear preference",
  //       explanation: "Pas d'explication",
  //       color: "#000000",
  //       emoji: "❓",
  //       imageUrl: { uri: "https://example.com/default.jpg" },
  //     };

  //     return {
  //       partyDetails,
  //       matchingPercentage: topPartyID
  //         ? ((maxCount / responses.length) * 100).toFixed(2)
  //         : "0", // Calculate percentage based on the count of the top party ID
  //     };
  //   };

  const calculateResults = () => {
    let scores = {};
    let totalSelections = 0; // Keep track of the total number of individual selections

    responses.forEach((response) => {
      // Assuming response is an array of IDs
      response.forEach((id) => {
        scores[id] = (scores[id] || 0) + 1;
        totalSelections += 1; // Increment total selections for each ID encountered
      });
    });

    // Find the party ID with the highest score
    let topPartyID = null;
    let maxCount = 0;
    Object.entries(scores).forEach(([id, count]) => {
      if (count > maxCount) {
        topPartyID = id; // Update topPartyID with the current ID
        maxCount = count; // Update maxCount to the current highest count
      }
    });

    console.log("TOP PARTY ID:", topPartyID);

    // Ensure there's a fallback if no ID was found or if there's no preference
    const partyDetails = getGroups(locale.userLocale).find(
      (party) => party.id.toString() === topPartyID
    ) || {
      name: "No clear preference",
      adjective: "No clear preference",
      explanation: "Pas d'explication",
      color: "#000000",
      emoji: "❓",
      imageUrl: { uri: "https://example.com/default.jpg" },
    };

    return {
      partyDetails,
      matchingPercentage: topPartyID
        ? ((maxCount / totalSelections) * 100).toFixed(2) // Use totalSelections as the denominator
        : "0",
    };
  };

  const result = calculateResults();

  const handleNavigateToClassicMode = () => {
    navigation.navigate("ClassicMode");
  };

  const listCandidates = result.partyDetails
    ? getCandidate(locale.userLocale).filter(
        (candidate) => candidate.group === result.partyDetails.id
      )
    : [];

  console.log(listCandidates);

  return (
    <BackgroundWrapper>
      <CenteredHeader
        handleGoBack={() => navigation.navigate("Home")}
        title={i18n.t("expressResults.title")}
      />

      <View style={{ flex: 1, marginTop: 20 }}>
        <View>
          {result.partyDetails.name === "No clear preference" ? (
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 50 }}>🤷</Text>
            </View>
          ) : (
            <Image
              source={result.partyDetails.imageUrl}
              style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 100,
              }}
              resizeMode={"cover"}
            />
          )}
          <Text
            style={{
              position: "absolute",
              fontSize: 30,
              top: -20,
              // right: -15,
              alignSelf: "center",
              transform: [{ rotate: "-4deg" }],
            }}
          >
            {result.partyDetails.emoji}
          </Text>
          <View
            style={{
              position: "absolute",
              bottom: -20,
              backgroundColor: "#F5D020",
              alignSelf: "center",
              transform: [{ rotate: "-2deg" }],
              paddingVertical: 2,
              paddingHorizontal: 10,
              borderRadius: 15,
            }}
          >
            <CustomText style={{ fontSize: 18, textAlign: "center" }}>
              {result.partyDetails.name} -{" "}
              {Math.round(result.matchingPercentage)}%
            </CustomText>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -65,
              // backgroundColor: "#F5D020",
              alignSelf: "center",
              transform: [{ rotate: "-2deg" }],
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
            }}
          >
            <CustomText
              style={{
                color: "white",
                fontSize: 20,
                textTransform: "capitalize",
              }}
            >
              {result.partyDetails.fullname}
            </CustomText>
          </View>
        </View>

        {result.partyDetails.name !== "No clear preference" ? (
          <View
            style={{
              // position: "absolute",
              // top: 280,
              alignSelf: "center",
              marginBottom: 15,
              backgroundColor: "#4344C8",
              marginHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 15,
              marginTop: 80,
            }}
          >
            {locale.userLocale == "fr" && listCandidates && (
              <>
                <View style={{ alignSelf: "center" }}>
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 5,
                      alignSelf: "flex-start",
                      transform: [{ rotate: "-2deg" }],
                      borderRadius: 5,
                      marginVertical: 5,
                    }}
                  >
                    <CustomText
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        color: "#8080E0",

                        // alignSelf: "flex-start",
                      }}
                    >
                      {listCandidates.length > 1 ? "Mes" : "Ma"} tête
                      {listCandidates.length > 1 && "s"} de liste
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginVertical: 20,
                  }}
                >
                  {listCandidates.map((candidate, index) => {
                    return (
                      <View
                        style={{
                          marginRight:
                            index == 0 && listCandidates.length > 1 ? 15 : 0,
                        }}
                      >
                        <Image
                          source={{ uri: candidate.pictureUri }}
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            alignSelf: "center",
                          }}
                        />
                        <CustomText
                          style={{
                            textAlign: "center",
                            color: "white",
                            marginTop: 10,
                          }}
                        >
                          {candidate.firstname + "\n" + candidate.lastname}
                        </CustomText>
                      </View>
                    );
                  })}
                </View>
              </>
            )}

            <View style={{ alignSelf: "center" }}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 5,
                  alignSelf: "flex-start",
                  transform: [{ rotate: "-2deg" }],
                  borderRadius: 5,
                  marginVertical: 5,
                }}
              >
                <CustomText
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: "#8080E0",

                    // alignSelf: "flex-start",
                  }}
                >
                  {i18n.t("expressResults.inSummaryTitle")}
                </CustomText>
              </View>
            </View>
            <CustomText
              style={{
                textAlign: "center",
                marginHorizontal: 20,
                color: "white",
                marginTop: 5,
              }}
            >
              {result.partyDetails.explaination}
            </CustomText>
          </View>
        ) : null}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleNavigateToClassicMode}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            backgroundColor: "#4344D0",
            paddingHorizontal: 17,
            paddingVertical: 12,
            borderRadius: 15,
          }}
        >
          <CustomText
            style={{ color: "white", textAlign: "center", fontSize: 20 }}
          >
            {i18n.t("expressResults.continueWithClassicMode")}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <CustomText
            style={{ color: "white", textAlign: "center", fontSize: 20 }}
          >
            {i18n.t("expressResults.goBack")}
          </CustomText>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    alignItems: "center",
  },
  partyName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  matchingPercentage: {
    fontSize: 18,
    color: "#666",
  },
  restartButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EasyModeResults;

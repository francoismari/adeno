import {
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MainHeader from "../components/MainHeader";
import CardWrapper from "../components/CardWrapper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../languages/i18n";
import getGroups from "../../assets/data/files/groups/getGroups";
import { useUser } from "../context/userContext";
import getCandidate from "../../assets/data/files/topList/getTopList";

export default function Home() {
  const { locale } = useUser();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [favoriteGroups, setFavoriteGroups] = useState(null);
  const [favoriteGroup, setFavoriteGroup] = useState(null);
  const [isEasyMode, setIsEasyMode] = useState(false);

  const modes = [
    {
      id: 1,
      title: i18n.t("home.multiplayerCard.title"),
      description: i18n.t("home.multiplayerCard.subtitle"),
      playText: i18n.t("home.startButtonText"),
      mainColor: "#FBD51F",
      secondColor: "#F5D020",
      onPressStart: () => navigation.navigate("SetupMultiplayer"),
    },
    {
      id: 2,
      title: i18n.t("home.soloCard.title"),
      description: i18n.t("home.soloCard.subtitle"),
      playText: i18n.t("home.startButtonText"),
      mainColor: "#DB3366",
      secondColor: "#B50D40",
      onPressStart: () => navigation.navigate("SelectSoloMode"),
    },
  ];

  useEffect(() => {
    calculateFavoriteGroup();
  }, [isFocused]);

  console.log(favoriteGroups);

  const calculateFavoriteGroup = async () => {
    // First, check for classic mode answers
    const answered = await AsyncStorage.getItem("answeredQuestions");
    const answeredQuestions = answered ? JSON.parse(answered) : null;

    if (answeredQuestions && answeredQuestions.length > 0) {
      console.log("mode avancé");
      setIsEasyMode(false); // Correctly set isEasyMode to false when classic mode answers exist
      calculateResults(answeredQuestions);
      return;
    }

    // Then, check for easy mode answers only if no classic mode answers are found
    const easyModeAnswers = await AsyncStorage.getItem(
      "easyModeAnsweredQuestions"
    );
    if (easyModeAnswers) {
      const responses = JSON.parse(easyModeAnswers);
      setIsEasyMode(true); // Ensure this is only set to true if easy mode answers are being used
      calculateTopResult(responses);
    } else {
      // If no answers are found in either mode, ensure isEasyMode is reset appropriately
      setIsEasyMode(false);
      // Also reset favorite groups as no data is available
      setFavoriteGroups(null);
      setFavoriteGroup(null);
    }
  };

  const calculateResults = (answeredQuestions) => {
    if (answeredQuestions.length === 0) {
      console.log("aucune réponse");
      setFavoriteGroups([]);
      setFavoriteGroup(null);
      return;
    }

    let tally = {};
    // Corrected to use 'partyId' instead of 'answerId'
    answeredQuestions.forEach(({ partyId }) => {
      tally[partyId] = (tally[partyId] || 0) + 1;
    });

    const totalAnswers = answeredQuestions.length;
    const results = getGroups(locale.userLocale)
      .map((group) => ({
        ...group,
        // Correct calculation of percentage
        percentage: ((tally[group.id] || 0) / totalAnswers) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    setFavoriteGroups(results);
    setFavoriteGroup(results[0]);
  };

  const calculateTopResult = (responses) => {
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

    setFavoriteGroup({
      ...partyDetails,
      percentage: topPartyID
        ? ((maxCount / totalSelections) * 100).toFixed(2) // Use totalSelections as the denominator
        : "0",
    });
  };

  return (
    <BackgroundWrapper>
      <MainHeader title={i18n.t("home.title")} emoji={"🎲"} />
      <FlatList
        data={modes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LevelContainer level={item} />}
        ListFooterComponent={() => (
          <UserHeadList
            navigation={navigation}
            favoriteGroup={favoriteGroup}
            favoriteGroups={favoriteGroups}
            isEasyMode={isEasyMode}
            locale={locale}
          />
        )}
        contentContainerStyle={styles.mainList}
        showsVerticalScrollIndicator={false}
      />
    </BackgroundWrapper>
  );
}

const LevelContainer = ({ level }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.levelContainer,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={level.onPressStart}
        style={[
          styles.levelPressable,
          {
            borderColor: level.mainColor,
          },
        ]}
      >
        <View
          style={[
            styles.levelTitleContainer,
            { backgroundColor: level.mainColor },
          ]}
        >
          <CustomText style={styles.levelTitle}>{level.title}</CustomText>
        </View>

        <CustomText
          style={[styles.levelDescription, { color: level.mainColor }]}
        >
          {level.description}
        </CustomText>

        <StartButton playText={level.playText} color={level.secondColor} />
      </Pressable>
    </Animated.View>
  );
};

const StartButton = ({ playText, color }) => {
  return (
    <View
      style={[
        styles.startButtonContainer,
        {
          backgroundColor: color,
        },
      ]}
    >
      <CustomText style={styles.startButtonText}>{playText}</CustomText>
    </View>
  );
};

const UserHeadList = ({
  navigation,
  favoriteGroup,
  favoriteGroups,
  isEasyMode,
  locale,
}) => {
  const handleSeeResults = () => {
    navigation.navigate("UserResults", { favoriteGroups });
  };

  const handleOpenSoloMode = () => {
    navigation.navigate("SelectSoloMode");
  };

  const listCandidates = favoriteGroup
    ? getCandidate(locale.userLocale).filter(
        (candidate) => candidate.group === favoriteGroup.id
      )
    : [];

  console.log(isEasyMode);

  return (
    <CardWrapper title={i18n.t("home.headListCard.title")} color={"#5354E8"}>
      {favoriteGroup ? (
        <>
          <View style={styles.favoriteGroupContainer}>
            <TouchableOpacity
              onPress={!isEasyMode ? handleSeeResults : null}
              style={styles.favoriteGroupImage}
            >
              <Image
                source={favoriteGroup.imageUrl}
                style={styles.favoriteGroupImage}
              />
            </TouchableOpacity>
            <View style={styles.favoriteGroupEmojiContainer}>
              <CustomText style={{ fontSize: 35 }}>
                {favoriteGroup.emoji}
              </CustomText>
            </View>
          </View>

          {locale.userLocale == "fr" && listCandidates ? (
            <View style={styles.listContainer}>
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
                      color: "#5354E0",

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
                  marginVertical: 10,
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
                          marginTop: 10,
                        }}
                      >
                        {candidate.firstname + "\n" + candidate.lastname}
                      </CustomText>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={[styles.listContainer, { flexDirection: "row" }]}>
              <View style={styles.listNotAvailableIcon}>
                <CustomText style={{ fontSize: 20 }}>⏳</CustomText>
              </View>
              <View style={{ flexShrink: 1, marginLeft: 10 }}>
                <CustomText style={{ fontSize: 15 }}>
                  {i18n.t("home.headListCard.listNotAvailableTitle")}
                </CustomText>
                <CustomText style={{ fontSize: 12, color: "gray" }}>
                  {i18n.t("home.headListCard.listNotAvailableSubtitle")}
                </CustomText>
              </View>
            </View>
          )}

          <View style={styles.favoriteGroupNameContainer}>
            <CustomText style={styles.favoriteGroupNameText}>
              {favoriteGroup.name}
            </CustomText>
            <CustomText style={{ marginHorizontal: 10, fontSize: 30 }}>
              🫶
            </CustomText>
            <CustomText style={styles.favoriteGroupPercentageText}>
              {Math.round(favoriteGroup.percentage)}%
            </CustomText>
          </View>

          <CustomText style={styles.favoriteGroupFullNameText}>
            {favoriteGroup.fullname}
          </CustomText>

          <CustomText style={styles.favoriteGroupExplanationText}>
            {favoriteGroup.explaination}
          </CustomText>
          {!isEasyMode ? (
            <TouchableOpacity
              onPress={handleSeeResults}
              style={styles.seeAllResultsButton}
            >
              <CustomText style={styles.seeAllResultsText}>
                {i18n.t("home.headListCard.seeAllResultsText")}
              </CustomText>
            </TouchableOpacity>
          ) : (
            <>
              <View style={{ alignSelf: "center" }}>
                <View
                  style={{
                    alignSelf: "flex-start",
                    padding: 6,
                    backgroundColor: "#5354D8",
                    transform: [{ rotate: "-2deg" }],
                    marginBottom: 10,
                    borderRadius: 7,
                  }}
                >
                  <CustomText style={{ color: "white" }}>
                    {i18n.t("home.headListCard.easyModeWarning.title")}
                  </CustomText>
                </View>
              </View>
              <CustomText
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  marginHorizontal: 40,
                  color: "gray",
                }}
              >
                {i18n.t("home.headListCard.easyModeWarning.description")}
              </CustomText>
            </>
          )}
        </>
      ) : (
        <View style={styles.noResultContainer}>
          <CustomText style={styles.noResultText}>
            {i18n.t("home.headListCard.noResultText")}
          </CustomText>
          <TouchableOpacity
            onPress={handleOpenSoloMode}
            style={styles.startButton}
          >
            <StartButton
              playText={i18n.t("home.headListCard.startButtonText")}
              color={"#294AC0"}
            />
          </TouchableOpacity>
        </View>
      )}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  mainList: { paddingBottom: 140 },
  levelContainer: { marginHorizontal: 20, marginTop: 20, marginBottom: 20 },
  levelPressable: {
    backgroundColor: "white",
    borderWidth: 3,
    paddingTop: 26,
    borderRadius: 26,
  },
  levelTitleContainer: {
    marginTop: -40,
    alignSelf: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    transform: [{ rotate: "-1deg" }],
  },
  levelTitle: { fontSize: 20, color: "white", fontFamily: "FrancoisOne" },
  levelDescription: {
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 30,
    fontFamily: "FrancoisOne",
    lineHeight: 20,
    fontSize: 17,
    marginTop: 15,
  },
  startButtonContainer: {
    width: "150",
    paddingHorizontal: 30,
    paddingVertical: 6,
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 12,
  },
  startButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 17,
    fontFamily: "FrancoisOne",
  },
  favoriteGroupContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 10,
  },
  favoriteGroupImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 89,
    height: 89,
    borderRadius: 50,
    zIndex: 10,
    borderWidth: 0.5,
    borderColor: "lightgray",
  },
  favoriteGroupEmojiContainer: {
    zIndex: 10,
    width: 74,
    height: 74,
    position: "absolute",
    transform: [{ rotate: "8deg" }],
    top: 20,
    right: -40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: "#F2F2F2",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  listNotAvailableIcon: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "8deg" }],
  },
  favoriteGroupNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  favoriteGroupNameText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "FrancoisOne",
  },
  favoriteGroupPercentageText: {
    fontSize: 25,
  },
  favoriteGroupFullNameText: {
    color: "gray",
    alignSelf: "center",
    marginBottom: 10,
  },
  favoriteGroupExplanationText: {
    fontSize: 14,
    fontFamily: "FrancoisOne",
    lineHeight: 15,
    color: "#9B9B9B",
    marginTop: 5,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  seeAllResultsButton: {
    marginBottom: 17,
    marginTop: 10,
  },
  seeAllResultsText: {
    fontFamily: "FrancoisOne",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#5354E8",
    fontSize: 16,
  },
  noResultContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultText: {
    fontSize: 17,
    marginHorizontal: 20,
    textAlign: "center",
  },
  startButton: {
    marginTop: 10,
  },
});

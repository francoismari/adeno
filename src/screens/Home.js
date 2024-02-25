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

export default function Home() {
  const { locale } = useUser();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [favoriteGroups, setFavoriteGroups] = useState(null);
  const [favoriteGroup, setFavoriteGroup] = useState(null);

  const modes = [
    {
      id: 1,
      title: i18n.t("home.multiplayerCard.title"),
      description: i18n.t("home.multiplayerCard.subtitle"),
      playText: i18n.t("home.startButtonText"),
      mainColor: "#FBD51F",
      secondColor: "#F5D020",
      onPressStart: () => navigation.navigate("SelectMultiplayerMode"),
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

  const calculateFavoriteGroup = async () => {
    const answered = await AsyncStorage.getItem("answeredQuestions");
    const answeredQuestions = answered ? JSON.parse(answered) : [];

    // console.log(answeredQuestions);

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

    await AsyncStorage.setItem("groupResults", JSON.stringify(results));
    setFavoriteGroups(results);
    setFavoriteGroup(results[0]);
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

const UserHeadList = ({ navigation, favoriteGroup, favoriteGroups }) => {
  const handleSeeResults = () => {
    navigation.navigate("UserResults", { favoriteGroups });
  };

  const handleOpenSoloMode = () => {
    navigation.navigate("SelectSoloMode");
  };

  return (
    <CardWrapper title={i18n.t("home.headListCard.title")} color={"#5354E8"}>
      {favoriteGroup ? (
        <>
          <View style={styles.favoriteGroupContainer}>
            <TouchableOpacity
              onPress={handleSeeResults}
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

          <View style={styles.listNotAvailableContainer}>
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
          <TouchableOpacity
            onPress={handleSeeResults}
            style={styles.seeAllResultsButton}
          >
            <CustomText style={styles.seeAllResultsText}>
              {i18n.t("home.headListCard.seeAllResultsText")}
            </CustomText>
          </TouchableOpacity>
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
  listNotAvailableContainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: "#F2F2F2",
    flexDirection: "row",
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

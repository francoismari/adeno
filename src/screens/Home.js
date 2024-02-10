import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Animated,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MainHeader from "../components/MainHeader";
import CardWrapper from "../components/CardWrapper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import groups from "../../assets/data/files/groups";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [favoriteGroups, setFavoriteGroups] = useState(null);
  const [favoriteGroup, setFavoriteGroup] = useState(null);

  const modes = [
    {
      id: 1,
      title: "Mode solo 🎯",
      description: "2 modes & 100 questions pour trouver ta tête de liste !",
      playText: "Commencer",
      mainColor: "#DB3366",
      secondColor: "#B50D40",
      onPressStart: () => navigation.navigate("SelectSoloMode"),
    },
    {
      id: 2,
      title: "Mode multijoueur 🎮",
      description: "Commence une partie et challenge tes potes !",
      playText: "Commencer",
      mainColor: "#FBD620",
      secondColor: "#D9B815",
      onPressStart: () => navigation.navigate("SelectMultiplayerMode"),
    },
  ];

  useEffect(() => {
    calculateFavoriteGroup();
  }, [isFocused]);

  const calculateFavoriteGroup = async () => {
    const answered = await AsyncStorage.getItem("answeredQuestions");
    const answeredQuestions = answered ? JSON.parse(answered) : [];

    console.log(answeredQuestions);

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
    const results = groups
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

  // console.log(favoriteGroup);

  return (
    <BackgroundWrapper>
      <MainHeader title={"Joue & apprends"} emoji={"🎲"} />
      <FlatList
        data={modes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LevelContainer level={item} />}
        ListFooterComponent={() => (
          <UserHeadList
            favoriteGroup={favoriteGroup}
            favoriteGroups={favoriteGroups}
          />
        )}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      />
    </BackgroundWrapper>
  );
}

const LevelContainer = ({ level }) => {
  console.log("LEVEL : ", level);

  // Animated value for scaling
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Function to scale up
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9, // Scale to 110%
      useNativeDriver: true,
    }).start();
  };

  // Function to scale down
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to 100%
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={level.onPressStart}
        style={{
          backgroundColor: "white",
          borderWidth: 3,
          borderColor: level.mainColor,
          paddingTop: 26,
          borderRadius: 26,
        }}
      >
        <View
          style={{
            marginTop: -40,
            alignSelf: "center",
            backgroundColor: level.mainColor,
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 10,
            transform: [{ rotate: "-1deg" }],
          }}
        >
          <CustomText
            style={{ fontSize: 20, color: "white", fontFamily: "FrancoisOne" }}
          >
            {level.title}
          </CustomText>
        </View>

        <CustomText
          style={{
            alignSelf: "center",
            textAlign: "center",
            marginHorizontal: 60,
            fontFamily: "FrancoisOne",
            lineHeight: 20,
            fontSize: 17,
            color: level.mainColor,
            marginTop: 15,
          }}
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
      style={{
        width: "150",
        paddingHorizontal: 30,
        paddingVertical: 6,
        alignSelf: "center",
        backgroundColor: color,
        borderRadius: 12,
        marginBottom: 16,
        marginTop: 12,
      }}
    >
      <CustomText
        style={{
          color: "white",
          textTransform: "uppercase",
          fontSize: 17,
          fontFamily: "FrancoisOne",
        }}
      >
        {playText}
      </CustomText>
    </View>
  );
};

const UserHeadList = ({ favoriteGroup, favoriteGroups }) => {
  const navigation = useNavigation();

  console.log(favoriteGroups);

  const handleSeeResults = () => {
    navigation.navigate("UserResults", { favoriteGroups });
  };

  const handleOpenSoloMode = () => {
    navigation.navigate("SelectSoloMode");
  };

  return (
    <CardWrapper title={"Ma tête de liste 🇪🇺"} color={"#6380E4"}>
      {favoriteGroup ? (
        <>
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={{
                uri: favoriteGroup.imageUrl,
              }}
              style={{
                width: 89,
                height: 89,
                borderRadius: 50,
                // backgroundColor: "red",
                zIndex: 10,
              }}
            />
            <View
              style={{
                zIndex: 10,
                width: 74,
                height: 74,
                // backgroundColor: "#228B22",
                position: "absolute",
                transform: [{ rotate: "8deg" }],
                top: 20,
                right: -40,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomText style={{ fontSize: 35 }}>
                {favoriteGroup.emoji}
              </CustomText>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginHorizontal: 15,
              backgroundColor: "#F2F2F2",
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
              borderRadius: 10,
              marginTop: 15,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "8deg" }],
              }}
            >
              <CustomText style={{ fontSize: 20 }}>⏳</CustomText>
            </View>
            <View style={{ flexShrink: 1, marginLeft: 10 }}>
              <CustomText style={{ fontSize: 15 }}>
                Ta tête de liste n'est pas encore disponible...
              </CustomText>
              <CustomText style={{ fontSize: 12, color: "gray" }}>
                Tu seras alerté(e) quand ton parti aura annoncé sa tête de liste
                dans ton pays !
              </CustomText>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 5,
            }}
          >
            <CustomText
              style={{
                textAlign: "center",
                fontSize: 25,
                fontFamily: "FrancoisOne",
              }}
            >
              {favoriteGroup.name}
            </CustomText>
            <CustomText style={{ marginHorizontal: 10, fontSize: 30 }}>
              🫶
            </CustomText>
            <CustomText style={{ fontSize: 25 }}>
              {Math.round(favoriteGroup.percentage)}%
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: 14,
              fontFamily: "FrancoisOne",
              lineHeight: 15,
              color: "#9B9B9B",
              marginTop: 5,
              textAlign: "center",
              marginHorizontal: 20,
            }}
          >
            {favoriteGroup.explaination}
          </CustomText>
          <TouchableOpacity
            onPress={handleSeeResults}
            style={{ marginBottom: 17, marginTop: 10 }}
          >
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#294AC0",
                fontSize: 16,
              }}
            >
              Voir tous mes résultats
            </CustomText>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomText
            style={{ fontSize: 17, marginHorizontal: 20, textAlign: "center" }}
          >
            Lance le mode solo pour découvrir ta tête de liste !
          </CustomText>
          <TouchableOpacity
            onPress={handleOpenSoloMode}
            style={{ marginTop: 10 }}
          >
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#294AC0",
                fontSize: 16,
              }}
            >
              C'est parti !
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </CardWrapper>
  );
};

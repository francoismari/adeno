import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import getGroups from "../../../assets/data/files/groups/getGroups";
import { useUser } from "../../context/userContext";

export default function ExpressResults({ navigation }) {
  const [favoriteGroups, setFavoriteGroups] = useState(null);
  const [favoriteGroup, setFavoriteGroup] = useState(null);

  const { locale } = useUser();

  //   console.log(favoriteGroups);

  useEffect(() => {
    calculateFavoriteGroup();
  }, []);

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

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleNavigateToClassicMode = () => {
    navigation.navigate("ClassicMode");
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} title={"Mon résultat"} />
      {favoriteGroups && (
        <View style={{ flex: 1, marginTop: 80 }}>
          <ImageBackground
            source={favoriteGroups[0].imageUrl}
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            resizeMode={"cover"}
            imageStyle={{
              // height: 200,
              // width: 200,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                position: "absolute",
                fontSize: 40,
                top: -30,
                // right: -15,
                alignSelf: "center",
                transform: [{ rotate: "-4deg" }],
              }}
            >
              {favoriteGroups[0].emoji}
            </Text>
            <View
              style={{
                position: "absolute",
                bottom: -25,
                backgroundColor: "#F5D020",
                alignSelf: "center",
                transform: [{ rotate: "-2deg" }],
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 15,
              }}
            >
              <CustomText style={{ fontSize: 20 }}>
                {favoriteGroups[0].name} -{" "}
                {Math.round(favoriteGroups[0].percentage)}%
              </CustomText>
            </View>
          </ImageBackground>
          <View
            style={{
              position: "absolute",
              top: 250,
              alignSelf: "center",
              marginBottom: 15,
              backgroundColor: "#8080E0",
              marginHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 15,
            }}
          >
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
                  En bref
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
              {favoriteGroups[0].explaination}
            </CustomText>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 40,
              alignSelf: "center",
            }}
          >
            <Pressable
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
                Continuer avec le mode classique
              </CustomText>
            </Pressable>
            <Pressable onPress={handleGoBack}>
              <CustomText
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
                Retour
              </CustomText>
            </Pressable>
          </View>
        </View>
      )}
    </BackgroundWrapper>
  );
}

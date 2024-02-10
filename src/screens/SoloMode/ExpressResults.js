import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import CenteredHeader from "../../components/CenteredHeader";
import { useIsFocused } from "@react-navigation/native";
import groups from "../../../assets/data/files/groups";
import CustomText from "../../components/CustomText";

export default function ExpressResults({ navigation }) {
  const [favoriteGroups, setFavoriteGroups] = useState(null);
  const [favoriteGroup, setFavoriteGroup] = useState(null);

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

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} title={"Mes résultats"} />
      {favoriteGroups && (
        <FlatList
          data={favoriteGroups.slice(3, 8)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Podium results={favoriteGroups.slice(0, 3)} />}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 20,
                marginBottom: 10,
                padding: 15,
                borderRadius: 15,
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  alignSelf: "center",
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <CustomText style={{ fontSize: 20 }}>{item.name}</CustomText>
                <CustomText style={{ fontSize: 20, marginHorizontal: 10 }}>
                  🫶
                </CustomText>
                <CustomText style={{ fontSize: 20 }}>
                  {Math.round(item.percentage)}%
                </CustomText>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </BackgroundWrapper>
  );
}

const Podium = ({ results }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginHorizontal: 38,
        marginTop: 50,
        marginBottom: 20,
      }}
    >
      <PodiumItem rank={2} item={results[1]} />
      <PodiumItem rank={1} item={results[0]} />
      <PodiumItem rank={3} item={results[2]} />
    </View>
  );
};

const PodiumItem = ({ rank, item }) => {
  return (
    <View
      style={{
        backgroundColor: "#D9D9D9",
        width: 57,
        height: rank == 1 ? 99 : 82,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <HeadPodium rank={rank} item={item} />
      <CustomText
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 5,
          fontFamily: "FrancoisOne",
          fontSize: 22,
        }}
      >
        {rank}
      </CustomText>
    </View>
  );
};

const HeadPodium = ({ rank, item }) => {
  return (
    <Image
      source={{
        uri: item.imageUrl,
      }}
      style={{
        marginTop: -40,
        alignSelf: "center",
        // backgroundColor: "yellow",
        borderWidth: 4,
        borderColor:
          rank == 1
            ? "#D6B61B"
            : rank == 2
            ? "#D9D9D9"
            : rank == 3
            ? "#D6751B"
            : null,
        width: 80,
        height: 80,
        borderRadius: 40,
      }}
    />
  );
};

import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MainHeader from "../components/MainHeader";
import CardWrapper from "../components/CardWrapper";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const modes = [
    {
      id: 1,
      title: "Mode solo 🎯",
      description: "5 niveaux & 100 questions pour trouver ta tête de liste !",
      playText: "Commencer",
      mainColor: "#DB3366",
      secondColor: "#B50D40",
    },
    {
      id: 2,
      title: "Mode multijoueur 🎮",
      description: "5 niveaux & 100 questions pour trouver ta tête de liste !",
      playText: "Commencer",
      mainColor: "#FBD620",
      secondColor: "#D9B815",
      onPressStart: () => navigation.navigate("SetupMultiplayer"),
    },
  ];

  return (
    <BackgroundWrapper>
      <MainHeader title={"Joue & apprends"} emoji={"🎲"} />
      <FlatList
        data={modes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LevelContainer level={item} />}
        ListFooterComponent={() => <UserHeadList />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </BackgroundWrapper>
  );
}

const LevelContainer = ({ level }) => {
  console.log("LEVEL : ", level);

  return (
    <Pressable
      onPress={level.onPressStart}
      style={{
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: level.mainColor,
        marginHorizontal: 20,
        paddingTop: 26,
        borderRadius: 26,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: -18,
          backgroundColor: level.mainColor,
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 10,
          transform: [{ rotate: "-1.01deg" }],
        }}
      >
        <Text
          style={{ fontSize: 20, color: "white", fontFamily: "FrancoisOne" }}
        >
          {level.title}
        </Text>
      </View>

      <Text
        style={{
          alignSelf: "center",
          textAlign: "center",
          marginHorizontal: 60,
          fontFamily: "FrancoisOne",
          lineHeight: 20,
          fontSize: 17,
          color: level.mainColor,
          marginTop: 5,
        }}
      >
        {level.description}
      </Text>

      <StartButton playText={level.playText} color={level.secondColor} />
    </Pressable>
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
      <Text
        style={{
          color: "white",
          textTransform: "uppercase",
          fontSize: 17,
          fontFamily: "FrancoisOne",
        }}
      >
        {playText}
      </Text>
    </View>
  );
};

const UserHeadList = () => {
  return (
    <CardWrapper title={"Ma tête de liste 🇪🇺"} color={"#6380E4"}>
      <View style={{ alignSelf: "center", justifyContent: "center" }}>
        <View
          style={{
            width: 89,
            height: 89,
            borderRadius: 50,
            backgroundColor: "red",
            zIndex: 10,
          }}
        ></View>
        <View
          style={{
            width: 74,
            height: 74,
            backgroundColor: "green",
            position: "absolute",
            right: -50,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>🍃</Text>
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontFamily: "FrancoisOne",
          marginTop: 10,
        }}
      >
        Yannick Jadot
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "FrancoisOne",
          lineHeight: 15,
          color: "#9B9B9B",
          marginTop: 5,
          textAlign: "center",
        }}
      >
        Tu prônes davantage l’écologie avant la croissance économique et les
        mesures de libre échange.
      </Text>
      <TouchableOpacity style={{ marginBottom: 17, marginTop: 10 }}>
        <Text
          style={{
            fontFamily: "FrancoisOne",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#294AC0",
            fontSize: 16,
          }}
        >
          Voir tous mes résultats
        </Text>
      </TouchableOpacity>
    </CardWrapper>
  );
};

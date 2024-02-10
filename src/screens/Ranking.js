import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MainHeader from "../components/MainHeader";
import CardWrapper from "../components/CardWrapper";
import CustomText from "../components/CustomText";

export default function Ranking() {
  return (
    <BackgroundWrapper>
      <MainHeader title={"Le classement"} emoji={"🏅"} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <CardWrapper title={"En France 🇫🇷"} color={"#DB3366"}>
          <Podium />
          <TouchableOpacity style={{ marginBottom: 17, marginTop: 10 }}>
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#DB3366",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Voir tous les résultats
            </CustomText>
          </TouchableOpacity>
        </CardWrapper>

        <CardWrapper title={"En Europe 🇪🇺"} color={"#6380E4"}>
          <Podium />

          <TouchableOpacity style={{ marginBottom: 17, marginTop: 10 }}>
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#6380E4",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Voir tous les résultats
            </CustomText>
          </TouchableOpacity>
        </CardWrapper>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const Podium = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginHorizontal: 38,
        marginTop: 50,
      }}
    >
      <PodiumItem rank={2} />
      <PodiumItem rank={1} />
      <PodiumItem rank={3} />
    </View>
  );
};

const PodiumItem = ({ rank }) => {
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
      <HeadPodium rank={rank} />
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

const HeadPodium = ({ rank }) => {
  return (
    <Image
      source={{
        uri: "https://media.lesechos.com/api/v1/images/view/65a592e9f416550960116449/1280x720/01002159704592-web-tete.jpg",
      }}
      style={{
        marginTop: -40,
        alignSelf: "center",
        backgroundColor: "yellow",
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
  },
  podium: {
    width: 60,
    height: 200,
    borderWidth: 4,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    position: "absolute",
    top: 10,
  },
  ring: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
});

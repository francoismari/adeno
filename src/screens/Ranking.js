import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MainHeader from "../components/MainHeader";
import CardWrapper from "../components/CardWrapper";

export default function Ranking() {
  return (
    <BackgroundWrapper>
      <MainHeader title={"Le classement"} emoji={"🏅"} />
      <ScrollView>
        <CardWrapper title={"En France 🇫🇷"} color={"#DB3366"}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          ></View>
          <TouchableOpacity style={{ marginBottom: 17, marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#DB3366",
                fontSize: 16,
              }}
            >
              Voir tous les résultats
            </Text>
          </TouchableOpacity>
        </CardWrapper>

        <CardWrapper title={"En Europe 🇪🇺"} color={"#6380E4"}>
          <TouchableOpacity style={{ marginBottom: 17, marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#6380E4",
                fontSize: 16,
              }}
            >
              Voir tous les résultats
            </Text>
          </TouchableOpacity>
        </CardWrapper>
      </ScrollView>
    </BackgroundWrapper>
  );
}

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

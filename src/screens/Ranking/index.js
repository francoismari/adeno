import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import MainHeader from "../../components/MainHeader";
import CardWrapper from "../../components/CardWrapper";
import CustomText from "../../components/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../context/userContext";
import i18n from "../../languages/i18n";
import getCountries from "../../../assets/data/files/countries";

export default function Ranking() {
  const { locale } = useUser();

  const [translatedCountries, setTranslatedCountries] = useState([]);

  useEffect(() => {
    setTranslatedCountries(getCountries());
  }, [locale]);

  const userCountry = translatedCountries.find(
    (country) => country.code === locale.userLocale
  );

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: `Install Adeno on the ${
          Platform.OS === "ios" ? "App Store" : "Google Play"
        } and get your results for the 2024 European elections! https://linktr.ee/adeno.eu`,
      });
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Erreur lors du partage d'Adeno, veuillez réessayer."
      );
    }
  };

  console.log("USER COUTNRY:  ", userCountry);

  return (
    <BackgroundWrapper>
      <MainHeader title={i18n.t("ranking.title")} emoji={"🏅"} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <CardWrapper
          title={`${i18n.t("ranking.userCountryCard.title")} ${
            userCountry ? userCountry.name + " " + userCountry.emoji : ""
          }`}
          color={"#DB3366"}
        >
          <Podium />
          <View style={{ marginTop: -125 }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#FAD41F",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "8deg" }],
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <CustomText style={{ fontSize: 22 }}>
                {locale.userLocale == "uk" || locale.userLocale == "en"
                  ? "🤪"
                  : "⏳"}
              </CustomText>
            </View>
            <CustomText
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: 10,
                marginBottom: 15,
                marginHorizontal: 20,
              }}
            >
              {locale.userLocale == "uk" || locale.userLocale == "en"
                ? "Come back to EU and you'll know"
                : "Le classement dans ton pays sera bientôt disponible ! Partage Adeno à tes amis pour que celui-ci soit le plus représentatif 😎"}
            </CustomText>

            <TouchableOpacity
              onPress={() => handleShareApp()}
              style={{ marginBottom: 17, marginTop: 10 }}
            >
              <CustomText
                style={{
                  fontFamily: "FrancoisOne",
                  textTransform: "uppercase",
                  textAlign: "center",
                  color: "#3C3DAC",
                  fontSize: 16,
                  // marginTop: 10,
                }}
              >
                {i18n.t("ranking.shareAppText")}
              </CustomText>
            </TouchableOpacity>
          </View>
        </CardWrapper>

        <CardWrapper
          title={`${i18n.t("ranking.europeCard.title")} 🇪🇺`}
          color={"#5354E8"}
        >
          <Podium />
          <View style={{ marginTop: -125 }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#FAD41F",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "8deg" }],
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <CustomText style={{ fontSize: 22 }}>
                {locale.userLocale == "uk" || locale.userLocale == "en"
                  ? "🤪"
                  : "⏳"}
              </CustomText>
            </View>
            <CustomText
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: 10,
                marginBottom: 15,
                marginHorizontal: 20,
              }}
            >
              {locale.userLocale == "uk" || locale.userLocale == "en"
                ? "Come back to EU and you'll know"
                : "Le classement européen global sera bientôt disponible ! Partage Adeno à tes amis pour que celui-ci soit le plus représentatif 😎"}
            </CustomText>
          </View>

          <TouchableOpacity
            onPress={() => handleShareApp()}
            style={{ marginBottom: 17, marginTop: 10 }}
          >
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                textTransform: "uppercase",
                textAlign: "center",
                color: "#3C3DAC",
                fontSize: 16,
                // marginTop: 10,
              }}
            >
              {i18n.t("ranking.shareAppText")}
            </CustomText>
          </TouchableOpacity>
        </CardWrapper>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const Podium = () => {
  return (
    <>
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
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          height: 200,
          width: "100%",
          marginTop: -100,
          // zIndex
        }}
      />
    </>
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
      {/* <CustomText
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 5,
          fontFamily: "FrancoisOne",
          fontSize: 22,
        }}
      >
        {rank}
      </CustomText> */}
    </View>
  );
};

const HeadPodium = ({ rank }) => {
  return (
    <View
      style={{
        marginTop: -40,
        alignSelf: "center",
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          rank == 1
            ? "#D6B61B"
            : rank == 2
            ? "#D9D9D9"
            : rank == 3
            ? "#D6751B"
            : null,
      }}
    >
      <CustomText style={{ fontSize: 25, color: "white" }}>{rank}</CustomText>
    </View>
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

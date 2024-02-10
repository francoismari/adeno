import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import MainHeader from "../../components/MainHeader";
import CustomText from "../../components/CustomText";
import { useNavigation } from "@react-navigation/native";
import filesThemes from "../../../assets/data/files/filesThemes";

export default function Discover() {
  const navigation = useNavigation();

  const handleShowAllFiles = () => {
    navigation.navigate("AllFiles");
  };

  const handleGoToTheme = (theme) => {
    navigation.navigate("ThemeFiles", { theme });
  };

  const handleOpenNews = () => {
    Linking.openURL("https://www.youtube.com/@levieuxcontinent2400");
  };

  return (
    <BackgroundWrapper>
      <MainHeader title={"Découvre l’UE"} emoji={"🇪🇺"} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "white",
            borderWidth: 3,
            borderColor: "#6380E4",
            paddingTop: 26,
            borderRadius: 26,
          }}
        >
          <View
            style={{
              marginTop: -40,
              alignSelf: "center",
              backgroundColor: "#6380E4",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 10,
              transform: [{ rotate: "-1deg" }],
            }}
          >
            <CustomText
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "FrancoisOne",
              }}
            >
              Les institutions 🇪🇺
            </CustomText>
          </View>

          <CustomText
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginHorizontal: 30,
              fontFamily: "FrancoisOne",
              lineHeight: 20,
              fontSize: 17,
              color: "#9B9B9B",
              marginTop: 15,
            }}
          >
            Découvrez les institutions européennes et leur fonctionnement !
          </CustomText>

          {filesThemes.slice(0, 3).map((theme, index) => (
            <TouchableOpacity
              onPress={() => handleGoToTheme(theme)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 14,
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#D1D1D1",
                marginTop: 10,
              }}
            >
              <CustomText
                style={{ fontSize: 25, transform: [{ rotate: "-6deg" }] }}
              >
                {theme.emoji}
              </CustomText>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <CustomText
                  style={{
                    fontSize: 21,
                    fontFamily: "FrancoisOne",
                  }}
                >
                  {theme.title}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 16,
                    fontFamily: "FrancoisOne",
                    color: "gray",
                    flexShrink: 1,
                  }}
                >
                  {theme.description}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={handleShowAllFiles}>
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                fontSize: 16,
                alignSelf: "center",
                marginVertical: 12,
                textTransform: "uppercase",
                color: "#6380E4",
              }}
            >
              Tout afficher
            </CustomText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            marginBottom: 20,
            backgroundColor: "white",
            borderWidth: 3,
            borderColor: "#FBD620",
            paddingTop: 26,
            borderRadius: 26,
          }}
        >
          <View
            style={{
              marginTop: -40,
              alignSelf: "center",
              backgroundColor: "#FBD620",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 10,
              transform: [{ rotate: "-1deg" }],
            }}
          >
            <CustomText
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "FrancoisOne",
              }}
            >
              Engage-toi ✊
            </CustomText>
          </View>

          <CustomText
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginHorizontal: 30,
              fontFamily: "FrancoisOne",
              lineHeight: 20,
              fontSize: 17,
              color: "#9B9B9B",
              marginTop: 15,
            }}
          >
            Découvre d'autres moyens de faire entendre ta voix
          </CustomText>

          <TouchableOpacity>
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                fontSize: 16,
                alignSelf: "center",
                marginVertical: 12,
                textTransform: "uppercase",
                color: "#FBD620",
              }}
            >
              Rejoindre
            </CustomText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            marginBottom: 20,
            backgroundColor: "white",
            borderWidth: 3,
            borderColor: "#DB3366",
            paddingTop: 26,
            borderRadius: 26,
          }}
        >
          <View
            style={{
              marginTop: -40,
              alignSelf: "center",
              backgroundColor: "#DB3366",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 10,
              transform: [{ rotate: "-1deg" }],
            }}
          >
            <CustomText
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "FrancoisOne",
              }}
            >
              Informe-toi 🗞️
            </CustomText>
          </View>

          {/* <CustomText
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginHorizontal: 30,
              fontFamily: "FrancoisOne",
              lineHeight: 20,
              fontSize: 17,
              color: "#9B9B9B",
              marginTop: 15,
            }}
          >
            Découvre de nouveaux médias, plus jeunes, pour t'informer sur
            l'Europe et l'actualité.
          </CustomText> */}

          <Image
            source={require("../../../assets/images/le-vieux-continent.jpg")}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              alignSelf: "center",
              marginTop: 15,
              marginBottom: 10,
            }}
          />

          <CustomText style={{ marginHorizontal: 15, color: "gray" }}>
            Le Vieux Continent est un média en ligne dont l'objectif est
            d’informer, et de diffuser la question européenne dans le débat
            public. Nous sommes présents sur YouTube, TikTok et Instagram.{"\n"}
            À cet effet, nous réalisons différents formats tels que des
            interviews, micro-trottoirs, décryptages d’actualité, débats,
            toujours autour de sujets européens. À partir d’avril 2024, nous
            couvrirons les élections européennes en France de très près.
          </CustomText>

          <TouchableOpacity onPress={handleOpenNews}>
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                fontSize: 16,
                alignSelf: "center",
                marginVertical: 12,
                textTransform: "uppercase",
                color: "#DB3366",
              }}
            >
              Découvrir
            </CustomText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 12,
            marginBottom: 20,
            backgroundColor: "white",
            borderWidth: 3,
            borderColor: "#8970FB",
            paddingTop: 26,
            borderRadius: 26,
          }}
        >
          <View
            style={{
              marginTop: -40,
              alignSelf: "center",
              backgroundColor: "#8970FB",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 10,
              transform: [{ rotate: "-1deg" }],
            }}
          >
            <CustomText
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: "FrancoisOne",
              }}
            >
              Nos partenaires
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

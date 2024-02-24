import {
  View,
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
import partners from "../../../assets/data/partners";
import i18n from "../../languages/i18n";
import { useUser } from "../../context/userContext";
import getFilesThemes from "../../../assets/data/files/getFilesThemes";

export default function Discover() {
  const navigation = useNavigation();

  const { locale } = useUser();

  i18n.locale = locale.userLocale;

  const handleShowAllFiles = () => {
    navigation.navigate("AllFiles");
  };

  const handleGoToTheme = (theme) => {
    navigation.navigate("ThemeFiles", { theme });
  };

  const handleOpenNews = () => {
    Linking.openURL("https://www.youtube.com/@levieuxcontinent2400");
  };

  const filesThemes = getFilesThemes(locale.userLocale);

  const sortedPartners = partners.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <BackgroundWrapper>
      <MainHeader title={i18n.t("discoverEU.title")} emoji={"🇪🇺"} />

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
            borderColor: "#3C3DAC",
            paddingTop: 26,
            borderRadius: 26,
          }}
        >
          <View
            style={{
              marginTop: -40,
              alignSelf: "center",
              backgroundColor: "#5354E8",
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
              {i18n.t("discoverEU.institutionsCard.title")}
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
            {i18n.t("discoverEU.institutionsCard.subtitle")}
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
                color: "#3C3DAC",
              }}
            >
              {i18n.t("discoverEU.institutionsCard.showAllText")}
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
            borderColor: "#FBD51F",
            paddingTop: 26,
            borderRadius: 26,
          }}
        >
          <View
            style={{
              marginTop: -40,
              alignSelf: "center",
              backgroundColor: "#FBD51F",
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
              {i18n.t("discoverEU.commitCard.title")}
            </CustomText>
          </View>

          <Image
            source={require("../../../assets/images/les-engages.jpg")}
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
            {i18n.t("discoverEU.commitCard.text")}
          </CustomText>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.helloasso.com/associations/association-les-engages/adhesions/les-engages-adhesion-2023-2024"
              )
            }
          >
            <CustomText
              style={{
                fontFamily: "FrancoisOne",
                fontSize: 16,
                alignSelf: "center",
                marginVertical: 12,
                textTransform: "uppercase",
                color: "#F5D020",
              }}
            >
              {i18n.t("discoverEU.commitCard.joinButtonText")}
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
              {i18n.t("discoverEU.informCard.title")}
            </CustomText>
          </View>

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
            {i18n.t("discoverEU.informCard.text")}
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
              {i18n.t("discoverEU.informCard.joinButtonText")}
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
              {i18n.t("discoverEU.partnerCard.title")}
            </CustomText>
          </View>

          <View style={{ marginHorizontal: 15 }}>
            {sortedPartners.map((partner, index) => (
              <TouchableOpacity
                onPress={() => Linking.openURL(partner.link)}
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={partner.image}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  resizeMode={"cover"}
                />
                <CustomText style={{ fontSize: 15, marginLeft: 10 }}>
                  {partner.name}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

import React, { useRef } from "react";
import { View, Dimensions, TouchableOpacity, Image, Share } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import i18n from "../../languages/i18n";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import ViewShot from "react-native-view-shot"; // Import ViewShot
import * as Sharing from "expo-sharing"; // Import Sharing from expo-sharing

export default function ShareResults({ navigation, route }) {
  const { favoriteGroups } = route.params;
  const viewShotRef = useRef(); // Create a ref for ViewShot

  const handleClose = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    const uri = await viewShotRef.current.capture(); // Capture the view shot
    try {
      await Sharing.shareAsync(uri); // Use expo-sharing to share the image
    } catch (error) {
      console.error("Error sharing the image", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader handleClose={handleClose} title={""} />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: -Dimensions.get("screen").height * 0.1,
        }}
      >
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
          <View
            style={{
              height: Dimensions.get("screen").height * 0.5,
              width: Dimensions.get("screen").height * 0.4,
              backgroundColor: "white",
              alignSelf: "center",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                // marginBottom: 10,
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  transform: [{ rotate: "-4deg" }],
                }}
                source={require("../../../assets/icon.png")}
              />
              <CustomText
                style={{ color: "#5354E8", fontSize: 17, marginLeft: 10 }}
              >
                {i18n.t("allUserResults.withAdeno")}
              </CustomText>
            </View>
            <Image
              source={favoriteGroups[0].imageUrl}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                alignSelf: "center",
                marginBottom: 10,
                borderWidth: 1,
                borderColor: "lightgray",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#F5D020",
                transform: [{ rotate: "-2deg" }],
                marginTop: -60,
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <CustomText style={{ fontSize: 18, color: "white" }}>
                {favoriteGroups[0].name} -{" "}
                {Math.round(favoriteGroups[0].percentage)}%
              </CustomText>
            </View>

            <View
              style={{
                alignSelf: "center",
                marginBottom: 15,
                backgroundColor: "#8080E0",
                marginHorizontal: 10,
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
                      fontSize: 15,
                      color: "#8080E0",

                      // alignSelf: "flex-start",
                    }}
                  >
                    {i18n.t("allUserResults.inSummaryTitle")}
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
          </View>
        </ViewShot>

        <TouchableOpacity
          onPress={handleShare} // Add onPress event to handle sharing
          style={{
            backgroundColor: "#7879ED",
            padding: 20,
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          <Feather name="share" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

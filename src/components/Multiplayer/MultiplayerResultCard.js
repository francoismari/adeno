import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import i18n from "../../languages/i18n";

const MultiplayerResultCard = ({ result }) => {

  console.log(result);

  return (
    <View
      style={{
        width: Dimensions.get("screen").width * 0.9,
        height: 320,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        marginBottom: 14,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontFamily: "FrancoisOne",
          lineHeight: 27,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#E8C51D" }}>
          {result.groupMembers}, {i18n.t("multiplayerResults.youAreTheMost")}{" "}
          {result.partyDetails?.adjective}
        </Text>
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 11,
          marginRight: 35,
        }}
      >
        <View style={{ flexDirection: "row", position: "relative" }}>
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                backgroundColor: "white",
                borderRadius: 30,
                zIndex: 100,
              }}
              source={result.partyDetails?.imageUrl}
            />
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: result.partyDetails?.color,
              borderRadius: 30,
              position: "absolute", // Position the second circle absolutely
              left: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{ fontSize: 31, transform: [{ rotate: "5deg" }] }}
            >
              {result.partyDetails?.emoji}
            </CustomText>
          </View>
        </View>

        <CustomText
          style={{ zIndex: 100, marginTop: -18, fontSize: 35, marginLeft: 35 }}
        >
          🫶
        </CustomText>
      </View>

      <CustomText
        style={{
          fontFamily: "FrancoisOne",
          fontSize: 17,
          textAlign: "center",
          marginHorizontal: 40,
          lineHeight: 20,
          marginTop: 5,
        }}
      >
        {i18n.t("multiplayerResults.youMatch")}{" "}
        {Math.round(result.matchingPercentage)}%{" "}
        {i18n.t("multiplayerResults.withList")} {result.partyDetails?.fullname}
      </CustomText>
      <CustomText
        style={{
          fontSize: 16,
          color: "#9B9B9B",
          fontFamily: "FrancoisOne",
          lineHeight: 18,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {result.partyDetails?.explaination}
      </CustomText>
    </View>
  );
};

export default MultiplayerResultCard;

import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import i18n from "../../languages/i18n";

const MultiplayerResultCard = ({ result, player }) => {
  console.log(result);
  console.log(player);

  return (
    <View
      style={{
        width: Dimensions.get("screen").width * 0.9,
        height: 450,
        padding: 15,
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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            {player}, {i18n.t("multiplayerResults.youAreTheMost")}{" "}
            {result[0].partyDetails?.adjective}
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
                source={result[0].partyDetails?.imageUrl}
              />
            </View>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: result[0].partyDetails?.color,
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
                {result[0].partyDetails?.emoji}
              </CustomText>
            </View>
          </View>

          <CustomText
            style={{
              zIndex: 100,
              marginTop: -18,
              fontSize: 35,
              marginLeft: 35,
            }}
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
          {Math.round(result[0].matchingPercentage)}%{" "}
          {i18n.t("multiplayerResults.withList")}{" "}
          {result[0].partyDetails?.fullname}
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
          {result[0].partyDetails?.explaination}
        </CustomText>
      </View>

      <View style={{ marginTop: 20 }}>
        {result.slice(1, 3).map((resultDetails, index) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
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
                  source={resultDetails.partyDetails?.imageUrl}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: -10,
                    zIndex: 1000,
                    alignSelf: "center",
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    backgroundColor: "#F4D54E",
                    borderRadius: 5,
                  }}
                >
                  <CustomText style={{ fontSize: 12 }}>#{index + 2}</CustomText>
                </View>
              </View>
              <View style={{ marginLeft: 15 }}>
                <CustomText style={{ fontSize: 18 }}>
                  {resultDetails.partyDetails.fullname}
                </CustomText>
                <CustomText>{resultDetails.matchingPercentage}%</CustomText>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default MultiplayerResultCard;

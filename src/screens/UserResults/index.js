import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import CustomText from "../../components/CustomText";
import { useNavigation } from "@react-navigation/native";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import i18n from "../../languages/i18n";
import { handleClose } from "../../utils/navigationUtils";

export default function UserResults({ route }) {
  const navigation = useNavigation();
  const { favoriteGroups } = route.params;

  const showDetailedResults = (group) => {
    navigation.navigate("GroupResultsDetails", { group });
  };

  const handleShareResults = () => {
    navigation.navigate("ShareResults", { favoriteGroups });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader
        handleClose={handleClose(navigation)}
        title={i18n.t("allUserResults.title")}
      />

      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 10,
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
        <CustomText style={{ color: "white", fontSize: 17, marginLeft: 10 }}>
          {i18n.t("allUserResults.withAdeno")}
        </CustomText>
      </View>

      <FlatList
        data={favoriteGroups.slice(3, 8)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Podium results={favoriteGroups.slice(0, 3)} />
            <View
              style={{
                alignSelf: "center",
                marginBottom: 15,
                backgroundColor: "#8080E0",
                marginHorizontal: 20,
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
                      fontSize: 18,
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
            <TouchableOpacity
              onPress={handleShareResults}
              style={{
                alignSelf: "center",
                padding: 10,
                backgroundColor: "#4546D3",
                marginBottom: 15,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="share" size={18} color="white" />
              <CustomText
                style={{ fontSize: 15, color: "white", marginLeft: 5 }}
              >
                {i18n.t("allUserResults.shareMyResults")}
              </CustomText>
            </TouchableOpacity>
          </>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 20,
              marginBottom: 10,
              padding: 15,
              borderRadius: 15,
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
                source={item.imageUrl}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  alignSelf: "center",
                  marginBottom: 10,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "#F5D020",
                transform: [{ rotate: "-2deg" }],
                marginTop: -20,
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <CustomText style={{ fontSize: 18, color: "white" }}>
                {item.name} - {Math.round(item.percentage)}%
              </CustomText>
            </View>

            <CustomText style={{ textAlign: "center", marginTop: 10 }}>
              {item.fullname}
            </CustomText>

            <TouchableOpacity onPress={() => showDetailedResults(item)}>
              <CustomText
                style={{
                  color: "gray",
                  textAlign: "center",
                  marginTop: 15,
                  textTransform: "uppercase",
                }}
              >
                {i18n.t("allUserResults.seeMoreText")}
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const Podium = ({ results }) => {
  return (
    <View
      style={{
        marginTop: 50,
        marginBottom: 20,
        position: "relative", // Ensure the parent View has a relative positioning
      }}
    >
      <View
        style={{
          marginHorizontal: 38,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <PodiumItem rank={2} item={results[1]} />
        <PodiumItem rank={1} item={results[0]} />
        <PodiumItem rank={3} item={results[2]} />
      </View>
      <LinearGradient
        style={{
          zIndex: -1,
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        colors={["transparent", "#4243F9"]} // Start with transparent and end with purple
        start={{ x: 0, y: 0 }} // Start the gradient from the bottom
        end={{ x: 0, y: 1 }} // End the gradient towards the top
      />
    </View>
  );
};

const PodiumItem = ({ rank, item }) => {
  const navigation = useNavigation();

  const showDetailedResults = (group) => {
    navigation.navigate("GroupResultsDetails", { group });
  };

  return (
    <Pressable
      onPress={() => showDetailedResults(item)}
      style={{
        backgroundColor: "white",
        width: 57,
        height: rank == 1 ? 99 : 82,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
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
      <HeadPodium rank={rank} item={item} />
      <View
        style={{
          alignSelf: "center",
          paddingVertical: 3,
          paddingHorizontal: 5,
          backgroundColor:
            rank == 1
              ? "#D6B61B"
              : rank == 2
              ? "#D9D9D9"
              : rank == 3
              ? "#D6751B"
              : null,
          marginTop: -20,
          borderRadius: 10,
          transform: [{ rotate: "-2deg" }],
        }}
      >
        <CustomText>{Math.round(item.percentage)}%</CustomText>
      </View>
      <CustomText
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 0,
          fontFamily: "FrancoisOne",
          fontSize: 20,
        }}
      >
        {rank}
      </CustomText>
    </Pressable>
  );
};

const HeadPodium = ({ rank, item }) => {
  return (
    <Image
      source={item.imageUrl}
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

import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import CustomText from "../components/CustomText";
import CloseButton from "../components/CloseButton";
import { useNavigation } from "@react-navigation/native";
import CenteredHeader from "../components/CenteredHeader";
import CenteredTitleHeader from "../components/CenteredTitleHeader";
import { LinearGradient } from "expo-linear-gradient";

export default function UserResults({ route }) {
  const navigation = useNavigation();
  const { favoriteGroups } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader handleClose={handleClose} title={"Mes résultats"} />
      <FlatList
        data={favoriteGroups.slice(3, 8)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Podium results={favoriteGroups.slice(0, 3)} />}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 20,
              marginBottom: 10,
              padding: 15,
              borderRadius: 15,
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                alignSelf: "center",
                marginBottom: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <CustomText style={{ fontSize: 20 }}>{item.name}</CustomText>
              <CustomText style={{ fontSize: 20, marginHorizontal: 10 }}>
                🫶
              </CustomText>
              <CustomText style={{ fontSize: 20 }}>
                {Math.round(item.percentage)}%
              </CustomText>
            </View>
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
  return (
    <View
      style={{
        backgroundColor: "#D9D9D9",
        width: 57,
        height: rank == 1 ? 99 : 82,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
      }}
    >
      <HeadPodium rank={rank} item={item} />
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

const HeadPodium = ({ rank, item }) => {
  return (
    <Image
      source={{
        uri: item.imageUrl,
      }}
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

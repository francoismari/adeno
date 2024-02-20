import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import MultiplayerResultCard from "./MultiplayerResultCard";
import i18n from "../../languages/i18n";
import CustomText from "../CustomText";
import { Entypo } from "@expo/vector-icons";

export default function ResultList({ results }) {
  const scrollViewRef = useRef();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextPress = () => {
    const nextCardPosition =
      (Dimensions.get("window").width * 0.9 + 40) * (currentCardIndex + 1);
    scrollViewRef.current.scrollTo({ x: nextCardPosition, animated: true });
    setCurrentCardIndex(currentCardIndex + 1);
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {Object.entries(results).map(([player, result]) => (
          <MultiplayerResultCard result={result} />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleNextPress}
        style={{
          position: "absolute",
          bottom: 300, // Adjust this value as needed to position the button correctly
          // width: 80,
          // height: 80,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 50,
          backgroundColor: "#FAD41F", // Example button color
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }} // Define this style according to your app's design
      >
        <CustomText style={{ fontSize: 18, color: "white" }}>
          {i18n.t("multiplayerResults.seeNext")}
        </CustomText>
        <Entypo name="chevron-right" size={30} color="white" />
      </TouchableOpacity>
    </>
  );
}

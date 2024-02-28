import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
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
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {Object.entries(results).map(([player, resultsArray]) => (
          <MultiplayerResultCard result={resultsArray} player={player} />
        ))}
      </ScrollView>

      <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
        <CustomText style={{ fontSize: 18, color: "white" }}>
          {i18n.t("multiplayerResults.seeNext")}
        </CustomText>
        <Entypo name="chevron-right" size={30} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 150 },
  nextButton: {
    position: "absolute",
    bottom: Platform.OS == "android" ? 150 : 180,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: "#FAD41F",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

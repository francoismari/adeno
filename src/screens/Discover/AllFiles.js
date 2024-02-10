import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import filesThemes from "../../../assets/data/files/filesThemes";

export default function AllFiles({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToTheme = (theme) => {
    navigation.navigate("ThemeFiles", { theme });
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader
        handleGoBack={handleGoBack}
        title={"Les fiches"}
        subtitle={"Pour tout comprendre sur l'Union Européenne !"}
      />

      <FlatList
        data={filesThemes}
        renderItem={({ item }) => (
          <ThemeCard theme={item} handleGoToTheme={handleGoToTheme} />
        )}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContentContainer}
      />
    </BackgroundWrapper>
  );
}

const ThemeCard = ({ theme, handleGoToTheme }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleGoToTheme(theme)}
    >
      <CustomText style={styles.emoji}>{theme.emoji}</CustomText>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <CustomText style={styles.title}>{theme.title}</CustomText>
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
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    // borderWidth: 1,
    backgroundColor: "white",
    marginTop: 12,
  },
  emoji: {
    fontSize: 30,
    transform: [{ rotate: "-6deg" }],
  },
  title: {
    fontSize: 21,
    fontFamily: "FrancoisOne",
  },
  listContentContainer: {
    paddingBottom: 40,
  },
});

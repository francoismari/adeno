import React from "react";
import { View, Text, FlatList } from "react-native";
import countries from "../../../assets/data/files/countries";
import groups from "../../../assets/data/files/groups";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import figures from "../../../assets/data/files/figures";
import CustomText from "../../components/CustomText";

const ThemeFiles = ({ navigation, route }) => {
  const { theme } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Function to select the right data based on themeId
  const fetchDataForTheme = (id) => {
    switch (id) {
      case 1:
        return countries;
      case 2:
        return groups;
      case 4:
        return figures;
      default:
        return [];
    }
  };

  const data = fetchDataForTheme(theme.id);

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} title={theme.title} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => `theme-item-${index}`}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              padding: 10,
              marginHorizontal: 20,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
            }}
          >
            <CustomText
              style={{ fontSize: 27, transform: [{ rotate: "-4deg" }] }}
            >
              {item?.emoji}
            </CustomText>
            <CustomText style={{ fontSize: 22, marginLeft: 12 }}>
              {item.name}
            </CustomText>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </BackgroundWrapper>
  );
};

export default ThemeFiles;

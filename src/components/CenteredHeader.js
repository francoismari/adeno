import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import React from "react";
import BackButton from "./BackButton";
import CustomText from "./CustomText";

export default function CenteredHeader({ handleGoBack, title, subtitle }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.backButtonContainer}>
        <BackButton handleGoBack={handleGoBack} />
      </View>
      <View style={styles.titleContainer}>
        <CustomText
          style={[
            styles.title,
            {
              fontSize: subtitle ? 30 : 40,
              paddingTop: subtitle ? 20 : Platform.OS == "android" ? 30 : 0,
            },
          ]}
        >
          {title}
        </CustomText>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 85, // Adjust the height as needed
    paddingBottom: 10
  },
  backButtonContainer: {
    flex: 1,
    height: "100%", // Ensures the button aligns with the header's height
    justifyContent: "center", // Centers the button vertically
  },
  titleContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontFamily: "FrancoisOne",
    color: "white",
  },
  subtitle: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontFamily: "FrancoisOne",
    marginTop: -5,
  },
});

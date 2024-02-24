import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import Start from "./Start";
import Tutorial from "./Tutorial";
import CustomText from "../../components/CustomText";
import NextButton from "../../components/NextButton";
import i18n from "../../languages/i18n";

const translations = [
  "Willkommen auf", // German
  "Welcome on", // English
  "Bienvenue sur", // French
  "Bienvenido en", // Spanish
  "Benvenuto su", // Italian
  "Bem-vindo ao", // Portuguese
  "Velkommen til", // Danish
  "Tervetuloa", // Finnish
  "Välkommen till", // Swedish
  "Vítejte na", // Czech
  "Witamy w", // Polish
  "Laipni lūdzam", // Latvian
  "Sveiki atvykę į", // Lithuanian
  "Tere tulemast", // Estonian
  "Καλωσόρισμα στο", // Greek
  "Добре дошли в", // Bulgarian
  "Bun venit la", // Romanian
  "Üdvözöljük a", // Hungarian
  "Dobrodošli na", // Croatian
  "Vitajte na", // Slovak
  "Merħba", // Maltese
  "Welkom bij", // Dutch
  "Welkom op", // Belgian
];

const colors = {
  main: "#BAAB4F",
  secondary: "#CEC482",
};

const { width } = Dimensions.get("window"); // Get the screen width

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Define the animated value

  useEffect(() => {
    // Adjust the fadeAnim based on currentPage to hide the Next button on the last page
    const targetOpacity = currentPage < 2 ? 1 : 0; // Hide on last page
    Animated.timing(fadeAnim, {
      toValue: targetOpacity,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const pageNum = Math.floor(contentOffset.x / viewSize);
    setCurrentPage(pageNum);
  };

  const handleNextButton = () => {
    if (currentPage < 2) {
      // Adjust this to reflect the index of the last page
      scrollViewRef.current.scrollTo({
        x: (currentPage + 1) * width,
        animated: true,
      });
    }
  };

  return (
    <BackgroundWrapper style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // for smooth scrolling experience
        style={styles.container}
      >
        <FirstPage />
        <View style={{ width }}>
          <Tutorial />
        </View>
        <View style={{ width }}>
          <Start />
        </View>
      </ScrollView>

      {/* Adjust the visibility of the NextButton based on currentPage */}
      {currentPage < 2 && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <NextButton onPress={handleNextButton} />
        </Animated.View>
      )}
    </BackgroundWrapper>
  );
}

const FirstPage = () => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Controls the fade

  useEffect(() => {
    const animate = () => {
      // Start with fading out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // Fade out duration
        useNativeDriver: true,
      }).start(() => {
        // Change the translation at the point of being fully faded out
        setIndex((prevIndex) => (prevIndex + 1) % translations.length);

        // Then fade in with new translation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500, // Fade in duration
          useNativeDriver: true,
        }).start();
      });
    };

    const interval = setInterval(animate, 2000); // Adjust timing as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[styles.page, { width }]}>
      <View
        style={{
          justifyContent: "center", // Center vertically in the available space
          alignItems: "center", // Center horizontally
        }}
      >
        <Animated.Text
          style={{
            fontSize: 40,
            color: "white",
            opacity: fadeAnim, // Apply the animated opacity
            textAlign: "center", // Ensure text itself is centered
            fontFamily: "FrancoisOne",
          }}
        >
          {translations[index]}
        </Animated.Text>
      </View>
      <CustomText
        style={{
          fontFamily: "FrancoisOne",
          fontSize: 42,
          color: "white",
          marginTop: -10,
          textAlign: "center",
        }}
      >
        Adeno
      </CustomText>

      <CustomText
        style={{
          fontSize: 20,
          textAlign: "center",
          fontFamily: "FrancoisOne",
          color: "white",
          marginTop: 5,
          marginBottom: 10,
          marginHorizontal: 20,
        }}
      >
        {i18n.t("onboarding.firstScreen.subtitle")}
      </CustomText>

      <View style={{ width: "85%", alignSelf: "center", marginTop: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 52,
              width: 52,
              backgroundColor: "#FBD51F",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <CustomText
              style={{ fontSize: 30, transform: [{ rotate: "-10deg" }] }}
            >
              🎮
            </CustomText>
          </View>
          <CustomText
            style={{
              marginLeft: 20,
              color: "white",
              fontFamily: "FrancoisOne",
              fontSize: 20,
              width: "80%",
            }}
          >
            {i18n.t("onboarding.firstScreen.firstRow")}
          </CustomText>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <View
            style={{
              height: 52,
              width: 52,
              backgroundColor: "#FBD51F",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <CustomText
              style={{ fontSize: 30, transform: [{ rotate: "-10deg" }] }}
            >
              🎯
            </CustomText>
          </View>
          <CustomText
            style={{
              marginLeft: 20,
              color: "white",
              fontFamily: "FrancoisOne",
              fontSize: 20,
              width: "85%",
            }}
          >
            {i18n.t("onboarding.firstScreen.secondRow")}
          </CustomText>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <View
            style={{
              height: 52,
              width: 52,
              backgroundColor: "#FBD51F",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <CustomText
              style={{ fontSize: 30, transform: [{ rotate: "-10deg" }] }}
            >
              🇪🇺
            </CustomText>
          </View>
          <CustomText
            style={{
              marginLeft: 20,
              color: "white",
              fontFamily: "FrancoisOne",
              fontSize: 20,
              width: "85%",
            }}
          >
            {i18n.t("onboarding.firstScreen.thirdRow")}
          </CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Important for horizontal paging
    backgroundColor: colors.mainBgColor,
  },
  page: {
    padding: 20,
    marginTop: Dimensions.get("screen").height * 0.08,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "DM-Serif",
    color: colors.main,
    lineHeight: 35,
  },
  description: {
    fontSize: 18,
    fontFamily: "FT-Regular",
    color: colors.secondary,
    marginTop: 5,
    // textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

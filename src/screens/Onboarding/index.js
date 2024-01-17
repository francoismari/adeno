import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Start from "./Start";

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
    // When currentPage changes, animate the fadeAnim
    if (currentPage === 4) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 70,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [currentPage]);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const viewSize = event.nativeEvent.layoutMeasurement.width;

    // Calculate current page
    const pageNum = Math.floor(contentOffset.x / viewSize);
    setCurrentPage(pageNum);
  };

  const handleNextButton = () => {
    if (currentPage < 2) {
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

        {/* <FifthPage /> */}
        <View style={{ width }}>
          <Start />
        </View>
      </ScrollView>
      {/* {currentPage < 5 && ( */}
      <Animated.View
        style={{ opacity: fadeAnim }}
        pointerEvents={currentPage === 1 ? "none" : "auto"}
      >
        <NextButton onPress={handleNextButton} />
      </Animated.View>
      {/* )} */}
    </BackgroundWrapper>
  );
}

const NextButton = ({ onPress, ...props }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const renderDottedCircle = (radius, dots, dotSize) => {
    const angleStep = (2 * Math.PI) / dots;

    return (
      <View
        style={{
          width: 2 * radius,
          height: 2 * radius,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* {Array.from({ length: dots }).map((_, index) => {
          const angle = index * angleStep;
          const x = radius + radius * Math.cos(angle) - dotSize / 2;
          const y = radius + radius * Math.sin(angle) - dotSize / 2;
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                top: y,
                left: x,
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: "#ddd",
              }}
            />
          );
        })} */}
        <AntDesign name="arrowright" size={35} color={"white"} />
      </View>
    );
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        {...props}
        style={[
          {
            position: "absolute",
            bottom: 10, // Adjust as needed
            height: 80,
            width: 80,
            alignSelf: "center",
            padding: 10,
            borderRadius: 45,
            backgroundColor: "#233D97",
            justifyContent: "center",
            alignItems: "center",

            transform: [{ scale: scaleAnim }],

            borderWidth: 1,
            borderColor: "#ddd",
            // padding: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },
        ]}
      >
        {renderDottedCircle(34, 30, 1)}
      </Animated.View>
    </Pressable>
  );
};

const FirstPage = () => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setIndex((prevIndex) => (prevIndex + 1) % translations.length);
        }
      });
    };

    animate();
    const interval = setInterval(animate, 4000); // 2 seconds for fade out and in, then 2 seconds pause

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <SafeAreaView style={[styles.page, { width }]}>
      <Text
        style={{
          fontSize: 30,
          //   fontFamily: "FT-Medium",
          color: colors.secondary,
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        <Animated.Text
          style={[
            { fontFamily: "FrancoisOne", fontSize: 40, color: "white" },
            { opacity: fadeAnim },
          ]}
        >
          {translations[index]}
        </Animated.Text>
        {/* {i18n.t("onboardingScreen.firstScreen.mainTitle")} */}
      </Text>
      <Text
        style={{
          fontFamily: "FrancoisOne",
          fontSize: 42,
          color: "white",
          marginTop: -10,
          textAlign: "center",
        }}
      >
        Adeno
      </Text>

      <Text
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
        L'app pour te faire voter aux élections européennes de 2024 !
      </Text>
      {/* <Text style={styles.description}>
          Discover your next favorite outfit.
        </Text> */}
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
    marginTop: Dimensions.get("screen").height * 0.15,
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

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
import CustomText from "../../components/CustomText";
import NextButton from "../../components/NextButton";

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
    if (currentPage === 1) {
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

// const NextButton = ({ onPress, ...props }) => {
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   const handlePressIn = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0.9,
//       duration: 100,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 100,
//       useNativeDriver: true,
//     }).start();
//   };

//   const renderDottedCircle = (radius, dots, dotSize) => {
//     const angleStep = (2 * Math.PI) / dots;

//     return (
//       <View
//         style={{
//           width: 2 * radius,
//           height: 2 * radius,
//           position: "relative",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <AntDesign name="arrowright" size={35} color={"white"} />
//       </View>
//     );
//   };

//   return (
//     <Pressable
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//       onPress={onPress}
//     >
//       <Animated.View
//         {...props}
//         style={[
//           {
//             position: "absolute",
//             bottom: 60,
//             height: 80,
//             width: 80,
//             alignSelf: "center",
//             padding: 10,
//             borderRadius: 45,
//             backgroundColor: "#233D97",
//             justifyContent: "center",
//             alignItems: "center",

//             transform: [{ scale: scaleAnim }],

//             borderWidth: 1,
//             borderColor: "#ddd",
//             // padding: 5,
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 2,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,

//             elevation: 5,
//           },
//         ]}
//       >
//         {renderDottedCircle(34, 30, 1)}
//       </Animated.View>
//     </Pressable>
//   );
// };

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
        L'app pour te faire voter aux élections européennes de 2024 !
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
            Le premier jeu de soirée pour t'intéresser à la politique
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
            Trouve ta tête de liste avec le mode solo et découvre le classement
            global !
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
            Disponible dans les 27 pays de l'UE, et traduite en 23 langues
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

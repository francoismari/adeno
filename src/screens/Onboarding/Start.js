import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../components/CustomText";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useUser } from "../../context/userContext";
import i18n from "../../languages/i18n";

export default function Start() {
  const navigation = useNavigation();

  const { setUser } = useUser();

  const handlePress = async () => {
    await AsyncStorage.setItem("isSetUp", "true");

    const { user } = await signInAnonymously(auth);
    setUser(user);

    navigation.navigate("Navigator");
  };

  const handleOpenPrivacyCharter = () => {
    navigation.navigate("PrivacyCharter");
  };

  const handleOpenTransparencyCharter = () => {
    navigation.navigate("TransparencyCharter");
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      {/* <Image
        source={require("../../../assets/images/images-icons/start-image-icon.png")}
        style={{ height: 150, width: 150, marginTop: 20 }}
      /> */}
      <CustomText style={{ fontSize: 40, marginTop: 20 }}>🔐</CustomText>
      <CustomText
        style={{
          fontSize: 30,
          fontFamily: "FrancoisOne",
          color: "white",
          textAlign: "center",
          fontWeight: "300",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        {i18n.t("onboarding.thirdScreen.title")}
      </CustomText>
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View>
          <CustomText
            style={{
              fontSize: 20,
              fontFamily: "FrancoisOne",
              color: "#E8C51D",
              lineHeight: 20,
            }}
          >
            {i18n.t("onboarding.thirdScreen.firstRow.title")}
          </CustomText>
        </View>
        <CustomText style={{ color: "white", fontSize: 15, marginTop: 5 }}>
          {i18n.t("onboarding.thirdScreen.firstRow.description")}
        </CustomText>
        <TouchableOpacity
          onPress={() => handleOpenPrivacyCharter()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#5354E8",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <CustomText style={{ fontSize: 15, color: "white" }}>
            {i18n.t("onboarding.thirdScreen.firstRow.readChart")}
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 25 }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "FrancoisOne",
              color: "#E8C51D",
              lineHeight: 20,
            }}
          >
            {i18n.t("onboarding.thirdScreen.secondRow.title")}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "FrancoisOne",
            color: "white",
            marginTop: 5,
          }}
        >
          {i18n.t("onboarding.thirdScreen.secondRow.description")}
        </Text>

        <TouchableOpacity
          onPress={() => handleOpenTransparencyCharter()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#5354E8",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <CustomText style={{ fontSize: 15, color: "white" }}>
            {i18n.t("onboarding.thirdScreen.secondRow.readChart")}
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", bottom: 50, marginHorizontal: 25 }}>
        <StartButton onPress={handlePress} />
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "FrancoisOne",
              textAlign: "center",
              fontWeight: "500",
              color: "white",
              marginTop: 15,
              lineHeight: 15,
            }}
          >
            {i18n.t("onboarding.thirdScreen.footerText")}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "FrancoisOne",
            color: "white",
            fontSize: 15,
            textAlign: "center",
            marginTop: 5,
          }}
        >
          {i18n.t("onboarding.thirdScreen.psText")}
        </Text>
      </View>

      {/* <Text style={styles.description}>
        Discover your next favorite outfit.
      </Text> */}
    </SafeAreaView>
  );
}

const StartButton = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: "#3536E4",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText
        style={{
          fontSize: 20,
          //   textTransform: "uppercase",
          fontFamily: "FrancoisOne",
          color: "white",
        }}
      >
        {i18n.t("onboarding.thirdScreen.startButton")}
      </CustomText>
    </Pressable>
  );
};

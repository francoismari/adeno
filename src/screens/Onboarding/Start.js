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

export default function Start() {
  const navigation = useNavigation();

  const { setUser } = useUser();

  const handlePress = async () => {
    await AsyncStorage.setItem("isSetUp", "true");

    const { user } = await signInAnonymously(auth);
    setUser(user);

    navigation.navigate("Navigator");
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
        Avant de commencer...
        {/* {i18n.t("onboardingScreen.firstScreen.mainTitle")} */}
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
            Nous ne collectons aucune donnée personnelle.
          </CustomText>
        </View>
        <CustomText style={{ color: "white", fontSize: 15, marginTop: 5 }}>
          Toutes les données utilisées dans l'app sont anonymes, et sont limités
          au strict nécessaire pour le bon fonctionnement de l'app !
        </CustomText>
        <TouchableOpacity
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
            Lire notre charte sur la vie privée
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
            Adeno est apartisane, neutre, et transparente.
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
          Toutes les données utilisées dans l'app sont anonymes, et sont limités
          au strict nécessaire pour le bon fonctionnement de l'app !
        </Text>

        <TouchableOpacity
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
            Lire notre charte sur la transparence
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
            Adeno est un projet citoyen, créé par une équipe de bénévoles, sans
            vocation lucrative, qui n'a pour objectif que d'aller te faire voter
            !
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
          PS : nous sommes open-source ✌️
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
        C'est parti !
      </CustomText>
    </Pressable>
  );
};

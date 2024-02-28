import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import CenteredHeader from "../../components/CenteredHeader";
import CustomText from "../../components/CustomText";
import { Feather } from "@expo/vector-icons";

export default function File({ navigation, route }) {
  const { name, text, source } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <CenteredHeader handleGoBack={handleGoBack} title={""} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
      >
        <CustomText style={{ color: "white", fontSize: 30, marginBottom: 10 }}>
          {name}
        </CustomText>
        <Text style={{ color: "white", fontSize: 20 }}>{text}</Text>

        {source && (
          <TouchableOpacity
            onPress={() => Linking.openURL(source)}
            style={{
              width: "100%",
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../assets/images/partners/toute-l-europe.png")}
                style={{ width: 50, height: 50, borderRadius: 20 }}
              />
              <CustomText style={{ fontSize: 17, marginLeft: 10 }}>
                Voir sur Toute l'Europe
              </CustomText>
            </View>
            <Feather name="external-link" size={24} />
          </TouchableOpacity>
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
}

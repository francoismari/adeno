import { View, Text } from "react-native";
import React from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MainHeader from "../components/MainHeader";

export default function Discover() {
  return (
    <BackgroundWrapper>
      <MainHeader title={"Découvre l’UE"} emoji={"🇪🇺"} />
    </BackgroundWrapper>
  );
}

import { View, Text, Platform } from "react-native";
import React from "react";
import CloseButton from "./CloseButton";
import CustomText from "./CustomText";

export default function CenteredTitleHeader({ handleClose, title }) {
  return (
    <>
      <CloseButton handleClose={handleClose} />

      <CustomText
        style={{
          textAlign: "center",
          color: "white",
          fontFamily: "FrancoisOne",
          fontSize: 40,
          marginTop: Platform.OS === "android" ? 30 : 20,
          marginBottom: 10,
        }}
      >
        {title}
      </CustomText>
    </>
  );
}

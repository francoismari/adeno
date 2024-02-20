import React from "react";
import CustomText from "../CustomText";
import i18n from "../../languages/i18n";

export default function ResultsHeader() {
  return (
    <CustomText
      style={{
        fontFamily: "FrancoisOne",
        textAlign: "center",
        fontSize: 40,
        marginTop: 20,
        color: "white",
        marginBottom: 14,
      }}
    >
      {i18n.t("multiplayerResults.title")}
    </CustomText>
  );
}

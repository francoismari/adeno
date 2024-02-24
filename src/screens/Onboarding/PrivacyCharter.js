import { View, Text, ScrollView } from "react-native";
import React from "react";
import CenteredTitleHeader from "../../components/CenteredTitleHeader";
import CustomText from "../../components/CustomText";

export default function PrivacyCharter({ navigation }) {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#5354E8" }}>
      <CenteredTitleHeader title={""} handleClose={handleClose} />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <CustomText style={{ color: "white" }}>
          Adeno Confidentiality and Anonymity Commitment Charter
          {"\n\n"}
          Introduction
          {"\n\n"}
          Adeno, in its commitment to promoting youth participation in the 2024
          European elections, is dedicated to respecting the anonymity and
          confidentiality of its users. We understand the importance of the
          trust our users place in us and are committed to protecting their
          privacy. This charter details our approach to the collection and use
          of information within our application, with a focus on our study on
          the electoral engagement of young Europeans.
          {"\n\n"}
          Commitment to Anonymity
          {"\n\n"}
          Adeno is designed in such a way that no element that could directly or
          indirectly identify our users is collected. Our goal is to provide a
          secure platform where users can freely explore their political
          affinities without leaving an identifiable trace. By navigating on
          Adeno, users can be assured that their use remains private and
          untraceable.
          {"\n\n"}
          The Major Study of Young Europeans
          {"\n\n"}
          In parallel to our interactive features, Adeno conducts a major study
          aimed at better understanding the electoral engagement of young
          Europeans. This initiative, supervised by a scientific council
          composed of intellectuals, researchers, and professors, is based on
          volunteerism and aims to enrich knowledge about the motivations and
          barriers to electoral participation.
          {"\n\n"}
          Study Framework Participants
          {"\n\n"}
          in this study are invited to answer a questionnaire about their voting
          intention, their electoral participation history, and the reasons
          influencing their choice to vote or not. It is important to emphasize
          that only solo mode interaction is concerned by this study, thus
          allowing an analysis focused on individual reflections without
          external influence.
          {"\n\n"}
          Principle of Anonymity
          {"\n\n"}
          The responses provided in the context of this study are treated with
          the highest level of anonymity. No result is associated with an
          identifiable person. The goal is to ensure total protection of
          participants' privacy while contributing to meaningful research on
          voting trends among young Europeans.
          {"\n\n"}
          Conclusion
          {"\n\n"}
          Adeno positions itself as a responsible and committed actor in
          promoting civic engagement, while ensuring the protection of the
          anonymity and confidentiality of its users. Our approach, through the
          major study of young Europeans, is to contribute to the scientific and
          social dialogue on electoral participation without compromising the
          security or privacy of our users. We invite our community to
          participate in this study, thus contributing to shaping a more
          inclusive and representative democratic future for all voices.
        </CustomText>
      </ScrollView>
    </View>
  );
}

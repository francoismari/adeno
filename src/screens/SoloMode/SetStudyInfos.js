import React, { useState, useContext } from "react";
import {
  View,
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import CustomText from "../../components/CustomText";
import CloseButton from "../../components/CloseButton";
import { useUser } from "../../context/userContext";
import { auth, db } from "../../../firebaseConfig";
import i18n from "../../languages/i18n";
import { handleClose } from "../../utils/navigationUtils";

const questionData = {
  questions: [
    {
      id: "voted_before",
      question: {
        fr: "Avez-vous déjà voté aux élections européennes dans le passé ?",
        en: "Have you ever voted in the European elections before?",
      },
      choices: [
        {
          text: { fr: "Oui, à chaque fois.", en: "Yes, every time." },
          value: "always",
        },
        {
          text: { fr: "Oui, mais pas toujours.", en: "Yes, but not always." },
          value: "sometimes",
        },
        { text: { fr: "Jamais.", en: "Never." }, value: "never" },
        {
          text: {
            fr: "Je n’avais pas le droit de vote.",
            en: "I was not eligible to vote.",
          },
          value: "ineligible",
        },
      ],
    },
    {
      id: "intent_to_vote",
      question: {
        fr: "Avez-vous l’intention de voter aux prochaines élections européennes de juin 2024 ?",
        en: "Do you intend to vote in the next European elections in June 2024?",
      },
      choices: [
        { text: { fr: "Oui.", en: "Yes." }, value: "yes" },
        { text: { fr: "Non.", en: "No." }, value: "no" },
        {
          text: {
            fr: "Je n’ai pas encore décidé.",
            en: "I have not decided yet.",
          },
          value: "undecided",
        },
        {
          text: {
            fr: "Je n’aurai pas le droit de vote.",
            en: "I will not have the right to vote.",
          },
          value: "will_be_ineligible",
        },
      ],
      followUp: {
        yes: "yes_reasons",
        no: "no_reasons",
      },
    },
    {
      id: "yes_reasons",
      question: {
        fr: "Pour quelle(s) raison(s) avez-vous l’intention d’aller voter aux élections européennes ?",
        en: "For what reasons do you intend to vote in the European elections?",
      },
      choices: [
        {
          text: {
            fr: "Je considère que le vote est un devoir citoyen.",
            en: "I consider voting a civic duty.",
          },
          value: "civic_duty",
        },
        {
          text: {
            fr: "Je me sens concerné(e) par les enjeux des élections européennes.",
            en: "I feel concerned by the stakes of the European elections.",
          },
          value: "feels_concerned",
        },
        {
          text: {
            fr: "Je me sens bien représenté(e) par un parti politique.",
            en: "I feel well represented by a political party.",
          },
          value: "well_represented",
        },
        {
          text: {
            fr: "Je pense avoir suffisamment de connaissances et d’informations au sujet des élections européennes pour voter.",
            en: "I believe I have enough knowledge and information about the European elections to vote.",
          },
          value: "informed",
        },
        {
          text: {
            fr: "Je suis engagé(e) dans un parti politique et je fais campagne.",
            en: "I am engaged in a political party and campaigning.",
          },
          value: "engaged_campaigning",
        },
        {
          text: {
            fr: "Je pense que mon vote a un impact.",
            en: "I think my vote has an impact.",
          },
          value: "vote_impact",
        },
        {
          text: { fr: "Je vote toujours.", en: "I always vote." },
          value: "always_vote",
        },
        {
          text: {
            fr: "Aucune des réponses ne me satisfait.",
            en: "None of the answers satisfy me.",
          },
          value: "none_satisfy",
        },
      ],
    },
    {
      id: "no_reasons",
      question: {
        fr: "Pour quelle(s) raison(s) n’avez-vous pas l’intention d’aller voter aux élections européennes ?",
        en: "For what reasons do you not intend to vote in the European elections?",
      },
      choices: [
        {
          text: {
            fr: "Je n’ai pas l’âge de voter.",
            en: "I am not of voting age.",
          },
          value: "underage",
        },
        {
          text: {
            fr: "Je suis mal inscrit ou non inscrit sur les listes électorales.",
            en: "I am poorly registered or not registered on the electoral rolls.",
          },
          value: "poorly_registered",
        },
        {
          text: {
            fr: "Je n’ai pas facilement accès aux bureaux de vote.",
            en: "I do not have easy access to polling stations.",
          },
          value: "difficult_access",
        },
        {
          text: {
            fr: "Je ne connais pas les enjeux politiques européens.",
            en: "I am not familiar with the European political issues.",
          },
          value: "unfamiliar_issues",
        },
        {
          text: {
            fr: "Je ne suis pas intéressé(e) par les élections européennes.",
            en: "I am not interested in the European elections.",
          },
          value: "not_interested",
        },
        {
          text: {
            fr: "Je suis mécontent de la politique européenne qui est menée.",
            en: "I am dissatisfied with the European politics being conducted.",
          },
          value: "dissatisfied",
        },
        {
          text: {
            fr: "Je ne pense pas que mon vote pour les élections européennes sera utile.",
            en: "I do not think my vote in the European elections will be useful.",
          },
          value: "vote_not_useful",
        },
        {
          text: {
            fr: "Je considère que l’abstention est un moyen d’expression comme un autre pour se faire entendre.",
            en: "I consider abstention as another way of expressing oneself to be heard.",
          },
          value: "abstention_as_expression",
        },
        {
          text: { fr: "Je ne vote jamais.", en: "I never vote." },
          value: "never_vote",
        },
        {
          text: {
            fr: "Aucune des réponses ne me satisfait.",
            en: "None of the answers satisfy me.",
          },
          value: "none_satisfy",
        },
      ],
    },
    {
      id: "encouragement_to_vote",
      question: {
        fr: "Ce qui pourrait vous encourager à voter :",
        en: "What could encourage you to vote:",
      },
      choices: [
        {
          text: {
            fr: "Avoir un bureau de vote près de chez moi.",
            en: "Having a polling station near my home.",
          },
          value: "nearby_polling_station",
        },
        {
          text: {
            fr: "Pouvoir voter par correspondance.",
            en: "Being able to vote by mail.",
          },
          value: "vote_by_mail",
        },
        {
          text: {
            fr: "Pouvoir voter depuis mon ordinateur.",
            en: "Being able to vote from my computer.",
          },
          value: "vote_from_computer",
        },
        {
          text: {
            fr: "Faciliter l’inscription sur les listes électorales.",
            en: "Making it easier to register on the electoral rolls.",
          },
          value: "easier_registration",
        },
        {
          text: {
            fr: "Accéder facilement aux programmes des partis politiques qui se présentent aux élections européennes.",
            en: "Easy access to the programs of political parties running in the European elections.",
          },
          value: "access_to_programs",
        },
        {
          text: {
            fr: "Mieux connaître les programmes des partis politiques qui se présentent aux élections européennes.",
            en: "Better understanding of the programs of political parties running in the European elections.",
          },
          value: "understand_programs",
        },
        {
          text: {
            fr: "Mieux connaître les candidats.",
            en: "Better knowledge of the candidates.",
          },
          value: "know_candidates",
        },
        {
          text: {
            fr: "Avoir une meilleure connaissance des enjeux des élections européennes.",
            en: "Having a better understanding of the stakes of the European elections.",
          },
          value: "understand_stakes",
        },
        {
          text: {
            fr: "Que l’Union Européenne change de politique.",
            en: "That the European Union changes its policy.",
          },
          value: "eu_policy_change",
        },
        {
          text: {
            fr: "Médiatiser davantage les questions européennes.",
            en: "To further publicize European issues.",
          },
          value: "publicize_issues",
        },
        {
          text: {
            fr: "Aucune des réponses ne me satisfait.",
            en: "None of the answers satisfy me.",
          },
          value: "none_satisfy",
        },
      ],
    },
  ],
};

export default function SetStudyInfos({ navigation }) {
  const [userStep, setUserStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const { locale, setUser } = useUser();

  const currentLocale = locale.userLocale || "fr"; // Default to French if locale not found

  const handleChoice = (choiceValue) => {
    const currentQuestion = questionData.questions[userStep];
    setResponses([
      ...responses,
      { questionId: currentQuestion.id, choiceValue },
    ]);

    if (currentQuestion.followUp && currentQuestion.followUp[choiceValue]) {
      const nextQuestionId = currentQuestion.followUp[choiceValue];
      const nextQuestionIndex = questionData.questions.findIndex(
        (q) => q.id === nextQuestionId
      );
      if (nextQuestionIndex !== -1) {
        setUserStep(nextQuestionIndex);
      } else {
        handleFinish();
      }
    } else if (userStep < questionData.questions.length - 1) {
      setUserStep(userStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        responses,
        locale: currentLocale,
      });
      setUser({
        uid: auth.currentUser.uid,
        responses,
        locale: currentLocale,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error saving data: ", error);
      Alert.alert("Error", error.message);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questionData.questions[userStep];
    return (
      <View>
        <CustomText style={{ fontSize: 24, textAlign: "center", margin: 20 }}>
          {currentQuestion.question[currentLocale]}
        </CustomText>
        {currentQuestion.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleChoice(choice.value)}
            style={{
              backgroundColor: "#EEE",
              padding: 10,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <CustomText style={{ fontSize: 20, textAlign: "center" }}>
              {choice.text[currentLocale]}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#5354E8",
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
    >
      <CloseButton handleClose={handleClose(navigation)} />
      <CustomText
        style={{
          fontSize: 60,
          transform: [{ rotate: "-4deg" }],
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        🇪🇺
      </CustomText>
      <CustomText
        style={{
          fontSize: 30,
          textAlign: "center",
          color: "white",
          marginHorizontal: 20,
        }}
      >
        {i18n.t("setStudyInfos.title")}
      </CustomText>

      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          marginHorizontal: 20,
          marginTop: 25,
          borderRadius: 20,
          height: Dimensions.get("screen").height * 0.6,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {renderQuestion()}
        </ScrollView>
      </View>
    </View>
  );
}

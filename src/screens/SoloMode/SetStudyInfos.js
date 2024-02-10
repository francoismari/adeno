import {
  View,
  Text,
  Button,
  Platform,
  Alert,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import CustomText from "../../components/CustomText";
import CloseButton from "../../components/CloseButton";
import { useUser } from "../../context/userContext";
import { auth, db } from "../../../firebaseConfig";

const questions = [
  {
    question: "Avez-vous l'intention de voter aux prochaines élections ?",
    choices: [
      "Oui, je veux voter.",
      "Non, je ne veux pas voter.",
      "Je ne suis pas sûr(e)/Je n'ai pas décidé.",
    ],
  },
  {
    question:
      "Qu'est-ce qui vous pousse à vouloir voter ou à ne pas vouloir voter ?",
    choices: [
      "Les sujets importants qui se passent dans le pays ou ma ville.",
      "Les personnes qui se présentent pour être élues.",
      "Ce que je pense ou ressens personnellement.",
      "Des problèmes pour aller voter (manque de temps, lieu trop loin, etc.).",
      "Je ne sais pas assez sur la politique ou les élections pour décider.",
      "Autre raison (précisez si vous voulez).",
    ],
  },
  {
    question: "Si vous ne voulez pas voter, pouvez-vous nous dire pourquoi ?",
    choices: [
      "C'est compliqué ou je n'ai pas le temps pour voter.",
      "Aucun des candidats ne me semble bon.",
      "Je pense que mon vote ne change rien.",
      "Je suis mécontent(e) de la politique en général.",
      "Je ne peux pas voter (trop jeune, pas la bonne nationalité, etc.).",
      "Autre raison (précisez si vous voulez).",
    ],
  },
  {
    question: "Avez-vous déjà voté dans le passé ?",
    choices: ["Oui, à chaque fois.", "Oui, mais pas toujours.", "Non, jamais."],
  },
  {
    question: "Qu'est-ce qui pourrait vous encourager à voter ?",
    choices: [
      "Avoir plus d'informations simples sur les candidats et ce qu'ils proposent.",
      "Rendre le vote plus facile (par exemple, voter en ligne, bureaux de vote plus proches).",
      "Des sujets de vote qui me concernent directement.",
      "Des campagnes qui expliquent l'importance de voter.",
      "Changer la manière dont les élections se déroulent.",
      "Autre chose (précisez si vous voulez).",
    ],
  },
];

export default function SetStudyInfos({ navigation }) {
  const [userStep, setUserStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const { setUser } = useUser();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleChoice = (choice) => {
    setResponses((currentResponses) => [...currentResponses, choice]);
    if (userStep < questions.length - 1) {
      setUserStep(userStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    try {
      const { user } = await signInAnonymously(auth);
      setUser(user); // Set user in context

      // Create a document with the user's ID in the 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        responses,
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error signing in anonymously and saving data: ", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#5354E8",
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
    >
      <CloseButton handleClose={handleClose} />
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
        Participe à la plus grande étude sur l'Europe !
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
        {questions[userStep] && (
          <>
            <CustomText
              style={{
                fontSize: 24,
                textAlign: "center",
                marginTop: 10,
                marginBottom: 15,
                marginHorizontal: 20,
              }}
            >
              {questions[userStep].question}
            </CustomText>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 2}}>
              {questions[userStep].choices.map((choice, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleChoice(choice)}
                  style={{
                    backgroundColor: "white",
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    padding: 10,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    marginHorizontal: 10,
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      color: "#4647D3",
                    }}
                  >
                    {choice}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

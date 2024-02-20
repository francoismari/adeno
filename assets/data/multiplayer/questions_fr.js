export default [
  // theme 1
  {
    text: "Es-tu favorable à la création d’un impôt européen sur les grandes fortunes ?",
    choices: {
      for: [2, 4, 6], // Socialiste/ Ecologiste/ Anticapitaliste
      against: [7, 5, 1], // Populiste / Nationaliste / Conservateur
      indifferent: [3], // Libéral
    },
    theme: 1,
  },
  {
    text: "Faut-il subventionner la création de grandes industries européennes?",
    choices: {
      for: [7, 1, 3, 2], // Populiste/Conservateur/Libéral/Socialiste
      against: [7], // Nationaliste
      indifferent: [4, 6], // Ecologiste/Anticapitaliste
    },
    theme: 1,
  },
  {
    text: "Tous les Etats Membres doivent faire partie de la zone euro",
    choices: {
      for: [2, 3, 4], // Socialiste / Libéral / Ecologiste
      against: [7, 6], // Populiste / Anticapitaliste
      indifferent: [1, 7], // Conservateur / Nationaliste
    },
    theme: 1,
  },
  {
    text: "La BCE a bien fait d’augmenter les taux d’intérêt pour lutter contre l’inflation",
    choices: {
      for: [7, 5, 1], // Populiste/Nationaliste/Conservateur
      against: [2, 4, 6], // Socialiste/Ecologiste/Anticapitaliste
      indifferent: [3], // Libéral
    },
    theme: 1,
  },
  {
    text: "Faut-il réformer la PAC pour mieux soutenir les agriculteurs",
    choices: {
      for: [7, 5, 1, 3, 2], // Populiste/Nationaliste/Conservateur/Libéral/Socialiste
      against: [4], // Ecologiste
      indifferent: [6], // Anticapitaliste
    },
    theme: 1,
  },
  {
    text: "Le plan de relance suite au COVID-19 a-t-il été bien pensé?",
    choices: {
      for: [2, 1, 4], // Socialiste / PPE / Ecologiste
      against: [7], // Populiste/ Nationaliste
      indifferent: [3, 6], // Libéral / Anticapitaliste
    },
    theme: 1,
  },
  {
    text: "L’Europe doit avoir une stratégie numérique ambitieuse",
    choices: {
      for: [3, 2, 4, 1, 6], // Libéral /Socialiste/Ecologiste /Conservateur/Anticapitaliste
      against: [7], // Nationaliste/Populiste
      indifferent: [], // indécis
    },
    theme: 1,
  },
  {
    text: "L’emploi doit être une priorité pour l’UE",
    choices: {
      for: [3, 1, 2, 7, 6], // Libéral / Conservateur / Socialiste / Nationaliste / Anticapitaliste
      against: [7], // Populiste
      indifferent: [4], // Ecologiste
    },
    theme: 1,
  },
  {
    text: "Il faut réformer les règles budgétaires de l’UE pour plus de fermeté",
    choices: {
      for: [1, 7], // PPE / Nationaliste
      against: [2, 4, 7, 6], // Socialiste / Ecologiste / Populiste / Anticapitaliste
      indifferent: [3], // Libéral
    },
    theme: 1,
  },
  {
    text: "Il faut taxer les géants du numérique au niveau européen",
    choices: {
      for: [1, 3, 2, 4, 6], // Conservateur/ Libéral / Socialiste / Ecologiste / Anticapitaliste
      against: [7], // Populiste /Nationaliste
      indifferent: [], // indécis
    },
    theme: 1,
  },
  {
    text: "L’Europe doit privilégier l’innovation à la régulation en matière d’IA",
    choices: {
      for: [], // indécis
      against: [4, 6, 2], // Ecologiste / Anticapitaliste / Socialiste
      indifferent: [3, 1, 7, 7], // Libéral / Conservateur / Nationaliste / Populiste
    },
    theme: 1,
  },

  // theme 4
  {
    text: "L’Europe doit-elle interdire l’usage des voitures à moteur thermique dans toute l’UE dès 2030 ?",
    choices: {
      for: [2, 4], // socialiste/ecologique
      against: [7, 5, 6], // Populiste/Nationaliste/Conservateur/anticapitaliste
      indifferent: [3], // Libéral
    },
    theme: 4,
  },
  {
    text: "Le pacte vert européen est une bonne chose",
    choices: {
      for: [1, 4, 3, 2], // Conservateur/ écologiste / libéral / socialiste
      against: [7], // Populiste / Nationaliste
      indifferent: [6], // Anticapitaliste
    },
    theme: 4,
  },
  {
    text: "Faut-il créer un marché des quotas carbone pour les produits importés?",
    choices: {
      for: [6, 7, 5, 3], // Anticapitaliste/populiste/conservateur/libéral
      against: [], // indécis
      indifferent: [2, 4, 7], // Socialiste/Nationaliste/Ecologiste
    },
    theme: 4,
  },
  {
    text: "L’Europe en fait-elle trop pour l’environnement ?",
    choices: {
      for: [7], // Populiste/Nationaliste
      against: [2, 4, 1], // socialiste/Ecologiste/Conservateur
      indifferent: [6, 3], // anticapitaliste/Libéral
    },
    theme: 4,
  },
  {
    text: "Le nucléaire est une énergie clef de la transition écologique?",
    choices: {
      for: [7, 1, 7, 3], // Nationaliste/Conservateur/Populiste/Libéral
      against: [2, 4, 6], // Socialiste/Ecologiste/Anticapitaliste
      indifferent: [], // indécis
    },
    theme: 4,
  },
  {
    text: "Faut-il interdire le glyphosate?",
    choices: {
      for: [4, 6], // Ecologiste/Anticapitaliste
      against: [7, 1], // Populiste/Nationaliste/Conservateur
      indifferent: [2, 3], // Socialiste / Libéral
    },
    theme: 4,
  },
  {
    text: "L’Europe doit-elle réguler le prix de l’électricité?",
    choices: {
      for: [1, 2, 6], // Conservateur/ Socialiste/ Anticapitaliste
      against: [7], // Populiste
      indifferent: [3, 4], // Libéral / Ecologiste
    },
    theme: 4,
  },
  {
    text: "L’Europe doit investir massivement dans les énergies renouvelables?",
    choices: {
      for: [4, 3, 1, 6], // Ecologiste/Libéral/Conservateur / Anticapitaliste
      against: [7], // Populiste/Nationaliste
      indifferent: [2], // Socialiste
    },
    theme: 4,
  },
  {
    text: "L’UE doit prendre des mesures pour la restauration de la nature?",
    choices: {
      for: [3, 2, 4, 6], // Libéral / Socialiste / Ecologiste / Anticapitaliste
      against: [7], // Populiste / Nationaliste
      indifferent: [1], // Conservateur
    },
    theme: 4,
  },

  // theme 7
  {
    text: "L’Europe doit-elle renforcer sa coopération dans le domaine de la défense?",
    choices: {
      for: [3, 2, 1, 7], // Libéral/ Socialiste/Conservateur/Nationaliste
      against: [7, 6], // Populiste/ Anticapitaliste
      indifferent: [4], // Ecologiste
    },
    theme: 7,
  },
  {
    text: "Les Etats-Unis sont le meilleur allié de l’UE?",
    choices: {
      for: [7, 1, 3, 4], // Populiste/Nationaliste/Libéral/Conservateur/Ecologiste
      against: [6], // Anticapitaliste
      indifferent: [2], // Socialiste
    },
    theme: 7,
  },
  {
    text: "Faut-il continuer à livrer des armes à l’Ukraine?",
    choices: {
      for: [1, 2, 3, 4, 7], // Conservateur/Socialiste/Libéral/Ecologiste/Nationaliste
      against: [6], // Anticapitaliste
      indifferent: [7], // Populiste
    },
    theme: 7,
  },
  {
    text: "L’Europe doit-elle renforcer les sanctions contre la Russie?",
    choices: {
      for: [7, 1, 2, 3], // Nationaliste/Conservateur/Socialiste/Libéral
      against: [7, 6], // Populiste/Anticapitaliste
      indifferent: [4], // Ecologiste
    },
    theme: 7,
  },
  {
    text: "Il faut autoriser l’usage de l’IA dans l’espace public pour des enquêtes policières",
    choices: {
      for: [7, 3, 1, 7], // Populiste/Libéral/Conservateur/Nationaliste
      against: [2, 4, 6], // Socialiste/Ecologiste/Anticapitaliste
      indifferent: [], // indécis
    },
    theme: 7,
  },
  {
    text: "Il faut conclure des accords de libre échange avec un maximum de pays",
    choices: {
      for: [7, 1, 3, 2], // Nationaliste/Conservateur/Libéral/Socialiste
      against: [7, 6], // Populiste/Anticapitaliste
      indifferent: [4], // Ecologiste
    },
    theme: 7,
  },
  {
    text: "Il faut que l’UE soit plus méfiante dans ses relations avec la Chine",
    choices: {
      for: [7, 1, 3], // Populiste/Nationaliste/Conservateur/Libéral
      against: [6], // Anticapitaliste
      indifferent: [2, 4], // Socialiste/Ecologiste
    },
    theme: 7,
  },
  {
    text: "Il faut créer une industrie européenne de la défense",
    choices: {
      for: [7, 1, 3, 2], // Nationaliste/Conservateur/Libéral/Socialiste
      against: [7, 6], // Populiste/ Anticapitaliste
      indifferent: [4], // Ecologiste
    },
    theme: 7,
  },

  // THEME 8
  {
    text: "Faut-il plus de solidarité dans la répartition des migrants?",
    choices: {
      for: [2, 4, 6], // Socialiste/Ecologiste/Anticapitaliste
      against: [7], // Populiste/Nationaliste
      indifferent: [1, 3], // Conservateur/Libéral
    },
    theme: 8,
  },
  {
    text: "Faut-il faciliter la procédure du droit d’asile en Europe?",
    choices: {
      for: [4, 6, 3, 2], // Ecologiste/Anticapitaliste/Libéral/Socialiste
      against: [7], // Populiste/Nationaliste
      indifferent: [1], // Conservateur
    },
    theme: 8,
  },
  {
    text: "L’Europe doit laisser les Etats gérer leur politique migratoire",
    choices: {
      for: [7, 1, 3, 2], // Nationaliste/Conservateur/Libéral/Socialiste
      against: [4, 6, 7], // Ecologiste/Anticapitaliste/Populiste
      indifferent: [], // indécis
    },
    theme: 8,
  },
  {
    text: "L’agence Frontex doit disparaître ?",
    choices: {
      for: [7, 6], // Populiste/Anticapitaliste
      against: [7, 1, 3, 2], // Nationaliste/Conservateur/Libéral/Socialiste
      indifferent: [4], // Ecologiste
    },
    theme: 8,
  },
  {
    text: "Faut-il renforcer la coopération de l’UE avec l’Afrique?",
    choices: {
      for: [1, 2, 3, 4, 7, 6], // PPE / Socialiste / Libéral /Verts / Nationaliste / Anticapitaliste
      against: [7], // Populiste
      indifferent: [], // indécis
    },
    theme: 8,
  },
  {
    text: "Faut-il renforcer la coopération commerciale de l’UE avec l’Amérique du Sud?",
    choices: {
      for: [1, 2, 3], // PPE/ Socialiste / Libéral
      against: [7, 6], // Nationaliste / Anticapitaliste
      indifferent: [4], // Ecologiste
    },
    theme: 8,
  },
  {
    text: "L’Europe doit soutenir Israël face à l’attaque du Hamas",
    choices: {
      for: [7], // Nationaliste / Populiste
      against: [4, 3, 2, 6], // Ecologiste / Libéral / Socialiste / Anticapitaliste
      indifferent: [1], // Conservateur
    },
    theme: 8,
  },
  {
    text: "Faut-il réformer l’espace Schengen?",
    choices: {
      for: [7, 5, 3, 2, 1, 4], // Populiste / ICR /Libéral / Socialiste / PPE / Ecologiste
      against: [6], // Anticapitaliste
      indifferent: [], // indécis
    },
    theme: 8,
  },

  // theme 9
  {
    text: "L’UE doit protéger les droits LGBTQIA+",
    choices: {
      for: [3, 4, 6, 1, 2], // Libéral / Ecologiste / Anticapitaliste / Conservateur/ Socialiste
      against: [7], // Populiste/Nationaliste
      indifferent: [], // indécis
    },
    theme: 9,
  },
  {
    text: "Es-tu favorable à la création d’un droit à l’avortement européen ?",
    choices: {
      for: [3, 2, 4, 6], // Libéral / Socialiste/Ecologiste / Anticapitaliste
      against: [7], // Populiste/ Nationaliste
      indifferent: [1], // Conservateur
    },
    theme: 9,
  },
  {
    text: "L’Europe doit mieux protéger la liberté de la presse",
    choices: {
      for: [1, 3, 2, 4, 6], // Conservateur/Libéral/Socialiste/Ecologiste/Anticapitaliste
      against: [7], // Populiste/Nationaliste
      indifferent: [], // indécis
    },
    theme: 9,
  },

  // theme 10
  {
    text: "Faut-il créer un revenu minimum de base au niveau européen ?",
    choices: {
      for: [2, 4, 6], // Socialiste / Ecologiste / Anticapitaliste
      against: [1, 7, 7], // Conservateur / Nationaliste / Populiste
      indifferent: [3], // Libéral
    },
    theme: 10,
  },
  {
    text: "L’Europe doit garantir la rémunération des stages",
    choices: {
      for: [3, 4, 2, 7, 6], // Libéral / Ecologiste / Socialiste / Nationaliste / Anticapitaliste
      against: [7], // Populiste
      indifferent: [1], // PPE
    },
    theme: 10,
  },
  {
    text: "L’Europe a bien géré la crise COVID-19",
    choices: {
      for: [], // indécis
      against: [7, 7, 2, 4, 6], // Populiste / Nationaliste / Socialiste / Ecologiste / Anticapitaliste
      indifferent: [1, 3], // Conservateur / Libéral
    },
    theme: 10,
  },
  {
    text: "L’Europe doit en faire plus pour l’égalité des genres",
    choices: {
      for: [1, 2, 3, 4, 6], // Conservateur / Socialiste / Libéral / Ecologiste / Anticapitaliste
      against: [7], // Populiste
      indifferent: [7], // Nationaliste
    },
    theme: 10,
  },

  // theme 11 - futur de l'Europe
  {
    text: "Faut-il élargir l’UE à d’autres pays ?",
    choices: {
      for: [3, 4, 7], // Libéral / Ecologiste / Populiste
      against: [], // indécis
      indifferent: [1, 7, 2, 6], // Conservateur / Nationaliste / Socialiste / Anticapitaliste
    },
    theme: 11,
  },
  {
    text: "Faut-il mettre fin à la règle de l’unanimité au Conseil?",
    choices: {
      for: [1, 3, 2], // Conservateur / Libéral / Socialiste
      against: [7, 7, 6], // Populiste / Nationaliste / Anticapitaliste
      indifferent: [4], // Ecologiste
    },
    theme: 11,
  },
  {
    text: "Faut-il établir un contrôle strict des parlements nationaux sur le parlement européen?",
    choices: {
      for: [7, 7, 2], // Populiste / Nationaliste / Socialiste
      against: [3, 4, 6], // Libéral / Ecologiste / Anticapitaliste
      indifferent: [1], // Conservateur
    },
    theme: 11,
  },
  {
    text: "Faudrait-il des tête de liste au niveau européen pour les élections?",
    choices: {
      for: [3, 4, 1, 2], // Libéral / Ecologiste / Conservateur / Socialiste
      against: [7, 7, 6], // Populiste / Nationaliste / Anticapitaliste
      indifferent: [], // indécis
    },
    theme: 11,
  },
  {
    text: "Faut-il geler l’accès au budget européen pour les Etats qui ne respectent pas l’Etat de droit?",
    choices: {
      for: [3, 2, 6, 1], // Libéral / Socialiste / Anticapitaliste / Conservateur
      against: [7, 7], // Populiste / Nationaliste
      indifferent: [], // indécis
    },
    theme: 11,
  },
  {
    text: "Faut-il faire entrer l’Ukraine dans l’UE le plus vite possible?",
    choices: {
      for: [7, 1, 4], // Nationaliste / Conservateur / Ecologiste
      against: [7, 2, 6], // Populiste / Socialiste / Anticapitaliste
      indifferent: [3], // Libéral
    },
    theme: 11,
  },
  {
    text: "L’Europe doit être plus vigilante pour lutter contre la corruption au Parlement Européen?",
    choices: {
      for: [1, 2, 3, 4, 7, 6], // PPE / Socialiste / Libéral / Ecologiste / Nationaliste / Anticapitaliste
      against: [], // indécis
      indifferent: [7], // Populiste
    },
    theme: 11,
  },
];

export default {
  onboarding: {
    firstScreen: {
      subtitle: "The app to get you voting in the 2024 European elections!",
      firstRow: "The first game to get you interested in politics",
      secondRow:
        "Find your list leader with solo mode and discover the global ranking!",
      thirdRow:
        "Available in the 27 EU countries, and translated into 24 languages",
    },
    secondScreen: {
      title: "How does it work?",
      multiplayerBox: {
        title: "Multiplayer mode",
        description:
          "Play with your friends, create games and answer questions about the main European issues to see your positions and those of your friends!",
      },
      soloBox: {
        title: "Solo mode",
        description:
          "Answer 100 questions on 10 themes and get an opinion on the main groups in the European parliaments! You will also see which list leader you correspond to in your country.",
      },
    },
    thirdScreen: {
      title: "Before you start",
      firstRow: {
        title: "We do not collect any personal data.",
        description:
          "All data used in the app is anonymous, and is limited to what is strictly necessary for the app to function properly!",
        readChart: "Read our privacy charter",
      },
      secondRow: {
        title: "Adeno is non-partisan, neutral, and transparent.",
        description:
          "Adeno is not linked with any governement entity and is fully independant.",
        readChart: "Read our transparency charter",
      },
      startButton: "Let's go!",
      footerText:
        "Adeno is a citizen project, created by a team of volunteers, with no profit motive, whose only goal is to get you to vote!",
      psText: "PS: we are open-source ✌️",
    },
  },
  home: {
    title: "Play & Vote",
    startButtonText: "Start",
    multiplayerCard: {
      title: "Multiplayer Mode 🎮",
      subtitle: "Start a game and challenge\nyour friends!",
    },
    soloCard: {
      title: "Solo Mode 🎯",
      subtitle: "2 modes & 100 questions to find\nyour top pick!",
    },
    headListCard: {
      title: "My Top Pick 🇪🇺",
      noResultText: "Launch solo mode to discover your top pick!",
      startButtonText: "Let's go!",
      listNotAvailableTitle: "Your top pick is not yet available...",
      listNotAvailableSubtitle:
        "You will be notified when your party has announced its top pick in your country!",
      seeAllResultsText: "See all my results",
    },
  },
  ranking: {
    title: "Rankings",
    userCountryCard: {
      title: "In",
    },
    europeCard: {
      title: "In Europe",
    },
    shareAppText: "Share Adeno",
  },
  discoverEU: {
    title: "Discover the EU",
    institutionsCard: {
      title: "The Institutions 🇪🇺",
      subtitle: "Discover the European institutions and how they work!",
      showAllText: "Show all",
    },
    commitCard: {
      title: "Get Involved ✊",
      text: `Les Engagés! is a federation under the law of 1901 founded in June 2017 with the aim of encouraging young people to get involved in community life. For nearly 6 years now, Les Engagés have been working to promote various forms of engagement among young people aged 18 to 35 by organizing debates, conferences, meetings, as well as visits within our various branches spread across several cities in France.`,
      joinButtonText: "Join",
    },
    informCard: {
      title: "Get Informed 🗞️",
      text: `Le Vieux Continent is an online media whose goal is to inform and spread the European issue into the public debate, on YouTube, TikTok, and Instagram. They produce various formats such as interviews, street interviews, news analysis, debates, all centered around European topics. Starting from April 2024, the media will closely cover the European elections in France.`,
      joinButtonText: "Discover",
    },
    partnerCard: {
      title: "Our partners",
    },
  },
  allFiles: {
    title: "The Fact Sheets",
    subtitle: "To understand everything about the EU!",
  },
  allUserResults: {
    title: "My results",
    withAdeno: "With Adeno",
    inSummaryTitle: "In summary",
    shareMyResults: "Share my results",
    seeMoreText: "See more",
  },
  selectSoloMode: {
    title: "Solo Mode",
    expressCard: {
      title: "Express Mode ⏱️",
      subtitle: "30 questions to find\nyour top pick!",
    },
    classicCard: {
      title: "Classic Mode 🗳️",
      subtitle:
        "Answer 100 questions, and find a result that correspond to your beliefs!",
    },
  },
  expressMode: {
    title: "Express Mode",
    cardTitle: "Find the group that suits you by answering 30 questions!",
    warningText:
      "Warning: for more reliable results and questions on more specific topics, use the classic mode!",
    letsGoText: "Let's go",
  },
  expressResults: {
    title: "My result",
    inSummaryTitle: "In summary",
    continueWithClassicMode: "Continue with classic mode",
    goBack: "Go back",
  },
  classicMode: {
    randomCard: {
      title: "Random",
      subtitle: "All themes",
    },
  },
  randomQuestionScreen: {
    title: "Random",
    showContextText: "Show context",
    allQuestionsAnswered: "You have answered all the questions!",
    showResultsText: "View my results",
    goBack: "Go back",
  },
  contextScreen: {
    title: "The context",
  },
  selectMultiplayerMode: {
    title: "Multiplayer",
    selectText: `Select the mode\nthat suits you!`,
    onePhone: "One phone",
    multiplePhones: "Multiple phones",
  },
  setupOnePhone: {
    title: "Players",
    noPlayerAdded: "No player added",
    addPlayerText: "Add a player",
    letGoText: "Let's go",
    addPlayerModal: {
      title: "Add a player",
      placeholder: "Player name",
      addPlayerButton: "Add",
      errors: {
        nameAlreadyUsedTitle: "This name is already added",
        nameAlreadyUsedSubtitle: "Each player must have a different name.",
        moreThanTenTitle: "Too many players",
        moreThanTenSubtitle: "You cannot add more than 10 players",
      },
    },
  },
  multiplayerOnePhoneGame: {
    seconds: "seconds",
    for: "For",
    against: "Against",
    indifferent: "Indifferent",
    alert: {
      quitPartyTitle: "Are you sure you want to quit the game?",
      cancel: "Cancel",
      quit: "Quit",
    },
  },
  multiplePhones: {
    title: "Your nickname",
    pseudoPlaceholder: "Your nickname",
    createPartyText: "Create a party",
    joinPartyText: "Join a party",
  },
  gameScreen: {
    title: "Game",
    codeText: "Code",
    startButton: "Start",
    waitCreatorText: "It's up to the creator to start the game!",
  },
  gameQuestionsScreen: {
    for: "For",
    against: "Against",
    indifferent: "Indifferent",
    waitingForPlayersTitle: "Waiting for other players!",
    waitingForPlayersSubtitle:
      "Results will be available once everyone has finished",
  },
  multiplayerResults: {
    title: "The results",
    youAreTheMost: "you are the most",
    youMatch: "You are close to",
    withList: "to the list of",
    seeNext: "See next",
    resultsFooter: {
      anotherRound: "Another round?",
      restartText: "Play again",
    },
  },
  euCountries: {
    at: "Austria",
    be: "Belgium",
    bg: "Bulgaria",
    hr: "Croatia",
    cy: "Cyprus",
    cz: "Czech Republic",
    dk: "Denmark",
    ee: "Estonia",
    fi: "Finland",
    fr: "France",
    de: "Germany",
    gr: "Greece",
    hu: "Hungary",
    ie: "Ireland",
    it: "Italy",
    lv: "Latvia",
    lt: "Lithuania",
    lu: "Luxembourg",
    mt: "Malta",
    nl: "Netherlands",
    pl: "Poland",
    pt: "Portugal",
    ro: "Romania",
    sk: "Slovakia",
    si: "Slovenia",
    es: "Spain",
    se: "Sweden",
    uk: "United Kingdom",
  },
  setStudyInfos: {
    title: "Participate in the largest study on Europe!",
  },
  settingsScreen: {
    title: "Settings",
    multiplayerCard: {
      title: "Multiplayer Mode",
      timeByQuestionText: "Time duration by question",
      setTimeByQuestionModal: {
        title: "Edit time",
        saveButton: "Save",
      },
    },
    soloCard: {
      title: "Solo Mode",
      resetResultsText: "Reset my results",
      studyInfos: {
        title: "Participate in the major study of young people in Europe",
        description:
          "Your responses to the solo mode questions will be recorded anonymously, and will contribute to a major study on the voting behaviors of young people in Europe, supervised by a",
        council:
          "scientific council of professors, researchers, and intellectuals",
        startButtonText: "Join the study",
        userParticipates: "You are participating in the major study on Europe!",
      },
    },
    createdByCard: {
      title: "Created by",
      subtitle:
        "Created by Matthieu Maillard and a network of volunteers across Europe!",
    },
    incubatedBy: {
      title: "Incubated by",
      subtitle:
        "Inceptio Lab, founded in 2023 and affiliated with the federation Les Engagés!, is an incubator aiming to promote entrepreneurial projects with impact, inspired by the success of the Elyze app. It offers a platform to apply skills in committed, innovative, and sustainable initiatives, while promoting the employability of its members.",
      founderMaleText: "Founder",
      founderFemaleText: "Foundress",
    },
    teamCard: {
      title: "The Team",
    },
    contactCard: {
      title: "Contact Us",
      text: "You can contact us on",
    },
    allRightsReserved: "all rights reserved",
  },
  councilScreen: {
    title: "The council",
  },
};

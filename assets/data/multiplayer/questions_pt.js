export default [
  {
    text: "A Europa deve ter o seu próprio orçamento, com os seus próprios recursos?",
    choices: {
      for: [1, 2, 3, 4, 6],
      against: [7, 5],
      indifferent: [],
    },
    theme: 1,
    id: 1,
  },
  {
    text: "O plano de recuperação NextGeneration EU foi uma boa iniciativa",
    choices: {
      for: [1, 3, 2, 6],
      against: [7, 5],
      indifferent: [4],
    },
    theme: 1,
    id: 2,
  },
  {
    text: "A ação europeia deve ser reforçada no que respeita ao acesso à habitação para todos",
    choices: {
      for: [2, 3, 4, 1, 6],
      against: [7, 5],
      indifferent: [],
    },
    theme: 1,
    id: 3,
  },
  {
    text: "A UE deve continuar a regular os preços da energia, promovendo as energias renováveis",
    choices: {
      for: [1, 4, 3],
      against: [7, 5],
      indifferent: [2, 6],
    },
    theme: 2,
    id: 4,
  },
  {
    text: "As energias renováveis devem representar mais de 50% na Europa até 2030",
    choices: {
      para: [6, 4],
      against: [7, 5, 1, 3, 2],
      indifferent: [],
    },
    theme: 2,
    id: 5,
  },
  {
    text: "A energia nuclear deve fazer parte do cabaz energético da UE",
    choices: {
      para: [7, 1, 5, 3],
      against: [6, 4],
      indifferent: [2],
    },
    theme: 2,
    id: 6,
  },
  {
    text: "A votação por unanimidade no Conselho deve ser abandonada",
    choices: {
      para: [3, 2, 1],
      against: [7, 5, 6],
      indifferent: [4],
    },
    theme: 3,
    id: 7,
  },
  {
    text: "A Europa deve reforçar a liberdade dos meios de comunicação social",
    choices: {
      for: [2, 3, 4, 6, 1],
      against: [5],
      indifferent: [7],
    },
    theme: 3,
    id: 8,
  },
  {
    text: "As listas para as eleições europeias devem ser transnacionais",
    choices: {
      for: [3, 1, 2, 4],
      against: [7, 5],
      indifferent: [6],
    },
    theme: 3,
    id: 9,
  },
  {
    text: "O glifosato deve ser proibido",
    choices: {
      para: [4, 6],
      against: [7, 5, 1, 3],
      indifferent: [2],
    },
    theme: 4,
    id: 10,
  },
  {
    text: "A Europa deve tomar medidas para recuperar a natureza",
    choices: {
      for: [3, 2, 6, 4],
      against: [7, 5],
      indifferent: [1],
    },
    theme: 4,
    id: 11,
  },
  {
    text: "Devemos proibir os automóveis com motores de combustão (gasolina, gasóleo)...",
    choices: {
      para: [4],
      against: [7, 5, 1, 6],
      indifferent: [3, 2],
    },
    theme: 4,
    id: 12,
  },
  {
    text: "A Europa deve tributar os gigantes digitais",
    choices: {
      for: [1, 3, 2, 4, 6],
      against: [7, 5],
      indifferent: [],
    },
    theme: 5,
    id: 13,
  },
  {
    text: "A Europa deve proibir a publicidade direccionada",
    choices: {
      for: [7, 6, 4],
      against: [5],
      indifferent: [1, 3, 2],
    },
    theme: 5,
    id: 14,
  },
  {
    text: "A criação de uma identidade digital europeia é útil",
    choices: {
      para: [1, 3, 2],
      against: [7, 5],
      indifferent: [4, 6],
    },
    theme: 5,
    id: 15,
  },
  {
    text: "Os acordos de comércio livre são benéficos para a agricultura europeia",
    choices: {
      para: [2, 3],
      against: [7, 4, 6],
      indifferent: [5, 1],
    },
    theme: 6,
    id: 16,
  },
  {
    text: "A prioridade da PAC deve ser a agricultura verde",
    choices: {
      for: [2, 4, 6],
      against: [7],
      indifferent: [5, 1, 3],
    },
    theme: 6,
    id: 17,
  },
  {
    text: "O lobo deve continuar a ser uma espécie em vias de extinção",
    choices: {
      para: [6, 4],
      against: [7, 5, 1, 3],
      indifferent: [2],
    },
    theme: 6,
    id: 18,
  },
  {
    text: "A relação da UE com os EUA deve ser reforçada",
    choices: {
      for: [7, 5, 3, 4],
      against: [6],
      indifferent: [2, 1],
    },
    theme: 7,
    id: 19,
  },
  {
    text: "A indústria europeia de defesa deve ser reforçada",
    choices: {
      for: [5, 1, 3, 2, 4],
      against: [7, 6],
      indifferent: [],
    },
    theme: 7,
    id: 20,
  },
  {
    text: "A NATO e a UE devem cooperar mais",
    choices: {
      para: [7, 5, 1, 3, 2, 4],
      against: [6],
      indifferent: [],
    },
    theme: 7,
    id: 21,
  },
  {
    text: "As fronteiras externas da UE são bem geridas",
    choices: {
      para: [],
      against: [7, 5, 6, 4],
      indifferent: [1, 3, 2],
    },
    theme: 8,
    id: 22,
  },
  {
    text: "Precisamos de uma política europeia em matéria de migração",
    choices: {
      for: [1, 3, 2, 5],
      against: [4, 6, 7],
      indifferent: [],
    },
    theme: 8,
    id: 23,
  },
  {
    text: "Precisamos de um mecanismo de recolocação obrigatória de migrantes entre Estados em caso de crise migratória",
    choices: {
      for: [4, 6, 2],
      against: [7, 5],
      indifferent: [1, 3],
    },
    theme: 8,
    id: 24,
  },
  {
    text: "A proteção dos direitos LGBTQIA+ na Europa deve ser reforçada",
    choices: {
      for: [4, 6, 3, 2],
      against: [7, 5],
      indifferent: [1],
    },
    theme: 9,
    id: 25,
  },
  {
    text: "A prioridade do programa Erasmus deve ser a inclusão",
    choices: {
      for: [5, 3, 4, 6, 1, 2],
      against: [7],
      indifferent: [],
    },
    theme: 9,
    id: 26,
  },
  {
    text: "Deve ser criado um direito europeu ao aborto",
    choices: {
      for: [3, 2, 4, 6],
      against: [5, 7],
      indifferent: [1],
    },
    theme: 9,
    id: 27,
  },
  {
    text: "É necessário criar um salário mínimo europeu",
    choices: {
      for: [3, 2, 4, 6],
      against: [7, 5, 1],
      indifferent: [],
    },
    theme: 10,
    id: 28,
  },
  {
    text: "A Europa geriu bastante bem a crise da COVID-19",
    choices: {
      para: [1, 3],
      against: [7, 5, 2, 4, 6],
      indifferent: [],
    },
    theme: 10,
    id: 29,
  },
  {
    text: "A política europeia de saúde no trabalho deve melhorar o tratamento dos acidentes de trabalho",
    choices: {
      for: [7, 3, 4, 6],
      against: [],
      indifferent: [5, 1, 2],
    },
    theme: 10,
    id: 30,
  },
];

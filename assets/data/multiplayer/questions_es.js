export default [
  {
    text: "Europa debe tener su propio presupuesto, con sus propios recursos?",
    choices: {
      for: [1, 2, 3, 4, 6],
      against: [7, 5],
      indifferent: [],
    },
    theme: 1,
    id: 1,
  },
  {
    text: "El plan de recuperación de la UE de la próxima generación fue una buena iniciativa",
    choices: {
      for: [1, 3, 2, 6],
      against: [7, 5],
      indifferent: [4],
    },
    theme: 1,
    id: 2,
  },
  {
    text: "Hay que intensificar la acción europea en materia de acceso a la vivienda para todos",
    choices: {
      for: [2, 3, 4, 1, 6],
      against: [7, 5],
      indifferent: [],
    },
    theme: 1,
    id: 3,
  },
  {
    text: "La UE debe seguir regulando los precios de la energía fomentando las energías renovables",
    choices: {
      for: [1, 4, 3],
      against: [7, 5],
      indifferent: [2, 6],
    },
    theme: 2,
    id: 4,
  },
  {
    text: "Las energías renovables deben representar más del 50% en Europa de aquí a 2030",
    choices: {
      for: [6, 4],
      against: [7, 5, 1, 3, 2],
      indifferent: [],
    },
    theme: 2,
    id: 5,
  },
  {
    text: "La energía nuclear debe formar parte de la combinación energética de la UE",
    choices: {
      for: [7, 1, 5, 3],
      against: [6, 4],
      indifferent: [2],
    },
    theme: 2,
    id: 6,
  },
  {
    text: "Debe abandonarse la votación por unanimidad en el Consejo",
    choices: {
      for: [3, 2, 1],
      against: [7, 5, 6],
      indifferent: [4],
    },
    theme: 3,
    id: 7,
  },
  {
    text: "Europa debe reforzar la libertad de los medios de comunicación",
    choices: {
      for: [2, 3, 4, 6, 1],
      against: [5],
      indifferent: [7],
    },
    theme: 3,
    id: 8,
  },
  {
    text: "Las listas para las elecciones europeas deben ser transnacionales",
    choices: {
      for: [3, 1, 2, 4],
      against: [7, 5],
      indifferent: [6],
    },
    theme: 3,
    id: 9,
  },
  {
    text: "Hay que prohibir el glifosato",
    choices: {
      for: [4, 6],
      against: [7, 5, 1, 3],
      indifferent: [2],
    },
    theme: 4,
    id: 10,
  },
  {
    text: "Europa debe tomar medidas para restaurar la naturaleza",
    choices: {
      for: [3, 2, 6, 4],
      against: [7, 5],
      indifferent: [1],
    },
    theme: 4,
    id: 11,
  },
  {
    text: "Deberíamos prohibir los coches con motor de combustión (gasolina, diésel)...",
    choices: {
      for: [4],
      against: [7, 5, 1, 6],
      indifferent: [3, 2],
    },
    theme: 4,
    id: 12,
  },
  {
    text: "Europa debe gravar a los gigantes digitales",
    choices: {
      for: [1, 3, 2, 4, 6],
      against: [7, 5],
      indifferent: [],
    },
    theme: 5,
    id: 13,
  },
  {
    text: "Europa debe prohibir la publicidad dirigida",
    choices: {
      for: [7, 6, 4],
      against: [5],
      indifferent: [1, 3, 2],
    },
    theme: 5,
    id: 14,
  },
  {
    text: "La creación de una identidad digital europea es útil",
    choices: {
      for: [1, 3, 2],
      against: [7, 5],
      indifferent: [4, 6],
    },
    theme: 5,
    id: 15,
  },
  {
    text: "Los acuerdos de libre comercio son buenos para la agricultura europea",
    choices: {
      for: [2, 3],
      against: [7, 4, 6],
      indifferent: [5, 1],
    },
    theme: 6,
    id: 16,
  },
  {
    text: "La prioridad de la PAC debe ser la agricultura verde",
    choices: {
      for: [2, 4, 6],
      against: [7],
      indifferent: [5, 1, 3],
    },
    theme: 6,
    id: 17,
  },
  {
    text: "El lobo debe seguir siendo una especie en peligro de extinción",
    choices: {
      for: [6, 4],
      against: [7, 5, 1, 3],
      indifferent: [2],
    },
    theme: 6,
    id: 18,
  },
  {
    text: "La relación de la UE con EE.UU. debe reforzarse",
    choices: {
      for: [7, 5, 3, 4],
      against: [6],
      indifferent: [2, 1],
    },
    theme: 7,
    id: 19,
  },
  {
    text: "Hay que reforzar la industria europea de defensa",
    choices: {
      for: [5, 1, 3, 2, 4],
      against: [7, 6],
      indifferent: [],
    },
    theme: 7,
    id: 20,
  },
  {
    text: "La OTAN y la UE deben cooperar más",
    choices: {
      for: [7, 5, 1, 3, 2, 4],
      against: [6],
      indifferent: [],
    },
    theme: 7,
    id: 21,
  },
  {
    text: "Las fronteras exteriores de la UE están bien gestionadas",
    choices: {
      for: [],
      against: [7, 5, 6, 4],
      indifferent: [1, 3, 2],
    },
    theme: 8,
    id: 22,
  },
  {
    text: "Necesitamos una política europea de migración",
    choices: {
      for: [1, 3, 2, 5],
      against: [4, 6, 7],
      indifferent: [],
    },
    theme: 8,
    id: 23,
  },
  {
    text: "Necesitamos un mecanismo de reubicación obligatoria de los migrantes entre Estados en caso de crisis migratoria",
    choices: {
      for: [4, 6, 2],
      against: [7, 5],
      indifferent: [1, 3],
    },
    theme: 8,
    id: 24,
  },
  {
    text: "Debe reforzarse la protección de los derechos LGBTQIA+ en Europa",
    choices: {
      for: [4, 6, 3, 2],
      against: [7, 5],
      indifferent: [1],
    },
    theme: 9,
    id: 25,
  },
  {
    text: "La prioridad del programa Erasmus debe ser la inclusión",
    choices: {
      for: [5, 3, 4, 6, 1, 2],
      against: [7],
      indifferent: [],
    },
    theme: 9,
    id: 26,
  },
  {
    text: "Debe crearse un derecho europeo al aborto",
    choices: {
      for: [3, 2, 4, 6],
      against: [5, 7],
      indifferent: [1],
    },
    theme: 9,
    id: 27,
  },
  {
    text: "Hay que crear un salario mínimo europeo",
    choices: {
      for: [3, 2, 4, 6],
      against: [7, 5, 1],
      indifferent: [],
    },
    theme: 10,
    id: 28,
  },
  {
    text: "Europa ha gestionado bastante bien la crisis de COVID 19",
    choices: {
      for: [1, 3],
      against: [7, 5, 2, 4, 6],
      indifferent: [],
    },
    theme: 10,
    id: 29,
  },
  {
    text: "La política europea de salud laboral debe ocuparse mejor de los accidentes de trabajo",
    choices: {
      for: [7, 3, 4, 6],
      against: [],
      indifferent: [5, 1, 2],
    },
    theme: 10,
    id: 30,
  },
];

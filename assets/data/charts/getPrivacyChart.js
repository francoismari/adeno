const privacy_chart_fr = `Charte d'engagement sur la confidentialité et l'anonymat d'Adeno

Introduction

Adeno, dans son engagement à promouvoir la participation des jeunes aux élections européennes de 2024, s'attache à respecter l'anonymat et la confidentialité de ses utilisateurs. Nous comprenons l'importance de la confiance que nos utilisateurs placent en nous et nous nous engageons à protéger leur vie privée. Cette charte détaille notre approche concernant la collecte et l'utilisation des informations au sein de notre application, en mettant l'accent sur notre étude sur l'engagement électoral des jeunes européens.

Engagement sur l'anonymat

Adeno est conçue de manière à ce qu'aucun élément permettant d'identifier directement ou indirectement nos utilisateurs ne soit recueilli. Notre objectif est de fournir une plateforme sécurisée où les utilisateurs peuvent explorer librement leurs affinités politiques sans laisser de trace identifiable. En naviguant sur Adeno, les utilisateurs peuvent être assurés que leur utilisation reste privée et non traçable.

La grande étude des jeunes éuropéens

En parallèle de nos fonctionnalités interactives, Adeno mène une grande étude visant à mieux comprendre l'engagement électoral des jeunes européens. Cette initiative, supervisée par un conseil scientifique composé d'intellectuels, de chercheurs et de professeurs, est fondée sur le volontariat et vise à enrichir la connaissance sur les motivations et les obstacles à la participation électorale.

Cadre de l'étude

Les participants à cette étude sont invités à répondre à un questionnaire portant sur leur intention de vote, leur historique de participation électorale et les raisons influençant leur choix de voter ou non. Il est important de souligner que seule l'interaction en mode solo est concernée par cette étude, permettant ainsi une analyse centrée sur les réflexions individuelles sans influence extérieure.

Principe d'Anonymat

Les réponses fournies dans le cadre de cette étude sont traitées avec le plus haut niveau d'anonymat. Aucun résultat n'est associé à une personne identifiable. L'objectif est de garantir une protection totale de la vie privée des participants tout en contribuant à une recherche significative sur les tendances de vote chez les jeunes européens.

Conclusion

Adeno se positionne comme un acteur responsable et engagé dans la promotion de l'engagement citoyen, tout en garantissant la protection de l'anonymat et la confidentialité de ses utilisateurs. Notre démarche, à travers la grande étude des jeunes européens, est de contribuer au dialogue scientifique et social sur la participation électorale sans compromettre la sécurité ou la vie privée de nos utilisateurs. Nous invitons notre communauté à participer à cette étude, contribuant ainsi à façonner un avenir démocratique plus inclusif et représentatif de toutes les voix.`;
const privacy_chart_en = `Adeno Confidentiality and Anonymity Commitment Charter

Introduction

Adeno, in its commitment to promoting youth participation in the 2024 European elections, is dedicated to respecting the anonymity and confidentiality of its users. We understand the importance of the trust our users place in us and are committed to protecting their privacy. This charter details our approach to the collection and use of information within our application, with a focus on our study on the electoral engagement of young Europeans.

Commitment to Anonymity

Adeno is designed in such a way that no element that could directly or indirectly identify our users is collected. Our goal is to provide a secure platform where users can freely explore their political affinities without leaving an identifiable trace. By navigating on Adeno, users can be assured that their use remains private and untraceable.

The Major Study of Young Europeans

In parallel to our interactive features, Adeno conducts a major study aimed at better understanding the electoral engagement of young Europeans. This initiative, supervised by a scientific council composed of intellectuals, researchers, and professors, is based on volunteerism and aims to enrich knowledge about the motivations and barriers to electoral participation.

Study Framework Participants

in this study are invited to answer a questionnaire about their voting intention, their electoral participation history, and the reasons influencing their choice to vote or not. It is important to emphasize that only solo mode interaction is concerned by this study, thus allowing an analysis focused on individual reflections without external influence.

Principle of Anonymity

The responses provided in the context of this study are treated with the highest level of anonymity. No result is associated with an identifiable person. The goal is to ensure total protection of participants' privacy while contributing to meaningful research on voting trends among young Europeans.

Conclusion

Adeno positions itself as a responsible and committed actor in promoting civic engagement, while ensuring the protection of the anonymity and confidentiality of its users. Our approach, through the major study of young Europeans, is to contribute to the scientific and social dialogue on electoral participation without compromising the security or privacy of our users. We invite our community to participate in this study, thus contributing to shaping a more inclusive and representative democratic future for all voices.`;

const getPrivacyChart = (locale) => {
  if (locale == "fr") {
    return privacy_chart_fr;
  } else {
    return privacy_chart_en;
  }
};

export default getPrivacyChart;

const privacy_chart_fr = `Charte de transparence d'Adeno

Préambule

Dans un contexte où l'engagement citoyen et la participation électorale des jeunes représentent des enjeux cruciaux pour la démocratie européenne, Adeno s'impose comme une solution innovante et engagée. Conçue pour faciliter l'implication des jeunes dans le processus électoral des élections européennes de 2024, Adeno propose une approche interactive et ludique à travers ses fonctionnalités de mode solo et mode multijoueur. Cette charte de transparence vise à établir les principes fondamentaux guidant notre action et à assurer à nos utilisateurs une expérience fiable, éthique et transparente.

Article 1 : Indépendance et apartisanisme

Adeno est une application rigoureusement apartisane, développée dans le seul but de stimuler l'engagement électoral des jeunes sans influencer leur orientation politique. Adeno s'engage à maintenir une parfaite indépendance vis-à-vis de toute institution, organisme politique ou entreprise, garantissant ainsi une neutralité totale. Cette indépendance est le pilier de notre crédibilité et de notre intégrité, permettant aux utilisateurs de faire confiance à l'application pour explorer et comprendre leurs affinités politiques sans biais.

Article 2 : transparence et open-source

Conscients de l'importance de la transparence dans le renforcement de la confiance de nos utilisateurs, Adeno est fièrement open-source. Le code source de l'application est intégralement accessible sur la plateforme Github. Cette démarche permet à chacun de vérifier l'intégrité et la fiabilité de nos algorithmes et de s'assurer de l'absence de manipulation ou de trucage. Nous encourageons la communauté à contribuer au projet, à soulever des questions et à proposer des améliorations, favorisant ainsi un développement collaboratif et transparent.

Article 3 : mission citoyenne et non lucrative

Adeno est animée par une mission purement citoyenne : inciter les jeunes à exercer leur droit de vote aux élections européennes de 2024. Nous croyons fermement que renforcer la participation électorale des jeunes est essentiel pour refléter la diversité des opinions et pour façonner l'avenir de l'Europe. Adeno s'engage à ne pas poursuivre de fins lucratives. Toutes les ressources obtenues sont réinvesties dans le développement de l'application et dans les actions visant à maximiser notre impact citoyen.

Article 4 : Adeno, une association engagée

Adeno est structurée en tant qu'association, reflétant notre engagement envers des valeurs de solidarité, de partage et d'intérêt général. Cette forme juridique souligne notre volonté de fonctionner de manière transparente, éthique et responsable, avec pour objectif principal de servir l'intérêt des jeunes électeurs européens. En tant qu'association, Adeno s'engage à respecter les principes de gouvernance démocratique et de responsabilité sociale, assurant ainsi une gestion conforme à nos valeurs et à notre mission.

Conclusion

Adeno est plus qu'une application ; c'est un engagement envers la démocratie et la transparence pour les jeunes électeurs européens. Nous invitons tous les utilisateurs, contributeurs et partenaires à nous rejoindre dans cette aventure citoyenne, pour ensemble, encourager une participation électorale éclairée, active et enthousiaste aux élections européennes de 2024. Ensemble, faisons de la voix des jeunes, la force de l'Europe.`;
const privacy_chart_en = `Adeno's Transparency Charter

Preamble

In a context where civic engagement and the electoral participation of the youth are crucial stakes for European democracy, Adeno stands as an innovative and committed solution. Designed to facilitate young people's involvement in the electoral process for the 2024 European elections, Adeno offers an interactive and playful approach through its solo and multiplayer modes. This transparency charter aims to establish the fundamental principles guiding our action and to ensure a reliable, ethical, and transparent experience for our users.

Article 1: Independence and Non-Partisanship

Adeno is a rigorously non-partisan application, developed solely to stimulate young people's electoral engagement without influencing their political orientation. Adeno commits to maintaining complete independence from any institution, political body, or company, thus ensuring total neutrality. This independence is the pillar of ourcredibility and integrity, allowing users to trust the application to explore and understand their political affinities without bias.

Article 2: Transparency and Open Source

Aware of the importance of transparency in strengthening our users' trust, Adeno is proudly open source. The application's source code is fully accessible on the Github platform. This approach allows everyone to verify the integrity and reliability of our algorithms and to ensure the absence of manipulation or rigging. We encourage the community to contribute to the project, raise questions, and propose improvements, thus promoting collaborative and transparent development.

Article 3: Civic Mission and Non-Profit

Adeno is driven by a purely civic mission: to encourage young people to exercise their right to vote in the 2024 European elections. We firmly believe that strengthening the electoral participation of young people is essential to reflect the diversity of opinions and to shape the future of Europe. Adeno commits to not pursuing profit-making ends. All resources obtained are reinvested in the development of the application and in actions aimed at maximizing our civic impact.

Article 4: Adeno, a Committed Association

Adeno is structured as an association, reflecting our commitment to values of solidarity, sharing, and general interest. This legal form underlines our desire to operate transparently, ethically, and responsibly, with the main goal of serving the interest of young European voters. As an association, Adeno commits to respecting the principles of democratic governance and social responsibility, thus ensuring management in line with our values and mission.

Conclusion

Adeno is more than an application; it's a commitment towards democracy and transparency for young European voters. We invite all users, contributors, and partners to join us in this civic adventure, to together, encourage an informed, active, and enthusiastic electoral participation in the 2024 European elections. Together, let's make the voice of the youth the strength of Europe.`;

const getTransparencyChart = (locale) => {
  if (locale == "fr") {
    return privacy_chart_fr;
  } else {
    return privacy_chart_en;
  }
};

export default getTransparencyChart;

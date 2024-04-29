import de from "./de";
import fr from "./fr";

const localeCandidates = {
  de: de,
  //   bg: bg,
  //   hr: hr,

  default: fr,
};

const getCandidate = (locale) =>
  localeCandidates[locale] || localeCandidates.default;

export default getCandidate;

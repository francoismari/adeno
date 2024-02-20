import filesThemes_en from "./filesThemes_en";
import filesThemes_fr from "./filesThemes_fr";

const getFilesThemes = (locale) => {
  if (locale == "fr") {
    return filesThemes_fr;
  } else {
    return filesThemes_en;
  }
};

export default getFilesThemes;

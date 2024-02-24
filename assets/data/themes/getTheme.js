import themes_en from "./themes_en";
import themes_fr from "./themes_fr";
import themes_bg from "./themes_bg";
import themes_hr from "./themes_hr";
import themes_cs from "./themes_cs";
import themes_da from "./themes_da";
import themes_nl from "./themes_nl";
import themes_et from "./themes_et";
import themes_fi from "./themes_fi";
import themes_de from "./themes_de";
import themes_el from "./themes_el";
import themes_hu from "./themes_hu";
import themes_ga from "./themes_ga";
import themes_it from "./themes_it";
import themes_lv from "./themes_lv";
import themes_lt from "./themes_lt";
import themes_mt from "./themes_mt";
import themes_pl from "./themes_pl";
import themes_pt from "./themes_pt";
import themes_ro from "./themes_ro";
import themes_sk from "./themes_sk";
import themes_sl from "./themes_sl";
import themes_es from "./themes_es";

const localeThemes = {
  bg: themes_bg,
  hr: themes_hr,
  cs: themes_cs,
  da: themes_da,
  nl: themes_nl,
  et: themes_et,
  fi: themes_fi,
  fr: themes_fr,
  de: themes_de,
  el: themes_el,
  hu: themes_hu,
  ga: themes_ga,
  it: themes_it,
  lv: themes_lv,
  lt: themes_lt,
  mt: themes_mt,
  pl: themes_pl,
  pt: themes_pt,
  ro: themes_ro,
  sk: themes_sk,
  sl: themes_sl,
  es: themes_es,

  default: themes_en,
};

const getTheme = (locale) => localeThemes[locale] || localeThemes.default;

export default getTheme;

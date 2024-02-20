import groups_bg from "./groups_bg";
import groups_cs from "./groups_cs";
import groups_da from "./groups_da";
import groups_de from "./groups_de";
import groups_el from "./groups_el";
import groups_en from "./groups_en";
import groups_es from "./groups_es";
import groups_et from "./groups_et";
import groups_fi from "./groups_fi";
import groups_fr from "./groups_fr";
import groups_ga from "./groups_ga";
import groups_hr from "./groups_hr";
import groups_hu from "./groups_hu";
import groups_it from "./groups_it";
import groups_lt from "./groups_lt";
import groups_lv from "./groups_lv";
import groups_mt from "./groups_mt";
import groups_nl from "./groups_nl";
import groups_pl from "./groups_pl";
import groups_pt from "./groups_pt";
import groups_ro from "./groups_ro";
import groups_sk from "./groups_sk";
import groups_sl from "./groups_sl";

const localeGroups = {
  bg: groups_bg,
  hr: groups_hr,
  cs: groups_cs,
  da: groups_da,
  nl: groups_nl,
  et: groups_et,
  fi: groups_fi,
  fr: groups_fr,
  de: groups_de,
  el: groups_el,
  hu: groups_hu,
  ga: groups_ga,
  it: groups_it,
  lv: groups_lv,
  lt: groups_lt,
  mt: groups_mt,
  pl: groups_pl,
  pt: groups_pt,
  ro: groups_ro,
  sk: groups_sk,
  sl: groups_sl,
  es: groups_es,

  default: groups_en,
};

const getGroups = (locale) => localeGroups[locale] || localeGroups.default;

export default getGroups;

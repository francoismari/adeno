import i18n from "../../../src/languages/i18n";

const getCountries = () => [
  { theme: 1, code: "at", name: i18n.t("euCountries.at"), emoji: "🇦🇹" },
  { theme: 1, code: "be", name: i18n.t("euCountries.be"), emoji: "🇧🇪" },
  { theme: 1, code: "bg", name: i18n.t("euCountries.bg"), emoji: "🇧🇬" },
  { theme: 1, code: "cy", name: i18n.t("euCountries.cy"), emoji: "🇨🇾" },
  { theme: 1, code: "hr", name: i18n.t("euCountries.hr"), emoji: "🇭🇷" },
  { theme: 1, code: "cz", name: i18n.t("euCountries.cz"), emoji: "🇨🇿" },
  { theme: 1, code: "dk", name: i18n.t("euCountries.dk"), emoji: "🇩🇰" },
  { theme: 1, code: "ee", name: i18n.t("euCountries.ee"), emoji: "🇪🇪" },
  { theme: 1, code: "fi", name: i18n.t("euCountries.fi"), emoji: "🇫🇮" },
  { theme: 1, code: "fr", name: i18n.t("euCountries.fr"), emoji: "🇫🇷" },
  { theme: 1, code: "de", name: i18n.t("euCountries.de"), emoji: "🇩🇪" },
  { theme: 1, code: "gr", name: i18n.t("euCountries.gr"), emoji: "🇬🇷" },
  { theme: 1, code: "hu", name: i18n.t("euCountries.hu"), emoji: "🇭🇺" },
  { theme: 1, code: "ie", name: i18n.t("euCountries.ie"), emoji: "🇮🇪" },
  { theme: 1, code: "it", name: i18n.t("euCountries.it"), emoji: "🇮🇹" },
  { theme: 1, code: "lv", name: i18n.t("euCountries.lv"), emoji: "🇱🇻" },
  { theme: 1, code: "lt", name: i18n.t("euCountries.lt"), emoji: "🇱🇹" },
  { theme: 1, code: "lu", name: i18n.t("euCountries.lu"), emoji: "🇱🇺" },
  { theme: 1, code: "mt", name: i18n.t("euCountries.mt"), emoji: "🇲🇹" },
  { theme: 1, code: "nl", name: i18n.t("euCountries.nl"), emoji: "🇳🇱" },
  { theme: 1, code: "pl", name: i18n.t("euCountries.pl"), emoji: "🇵🇱" },
  { theme: 1, code: "pt", name: i18n.t("euCountries.pt"), emoji: "🇵🇹" },
  { theme: 1, code: "ro", name: i18n.t("euCountries.ro"), emoji: "🇷🇴" },
  { theme: 1, code: "sk", name: i18n.t("euCountries.sk"), emoji: "🇸🇰" },
  { theme: 1, code: "si", name: i18n.t("euCountries.si"), emoji: "🇸🇮" },
  { theme: 1, code: "es", name: i18n.t("euCountries.es"), emoji: "🇪🇸" },
  { theme: 1, code: "se", name: i18n.t("euCountries.se"), emoji: "🇸🇪" },
  { theme: 1, code: "uk", name: "United Kingdom", emoji: "🇬🇧", inEU: false },
  { theme: 1, code: "en", name: "United States", emoji: "🇺🇸", inEU: false },
];

export default getCountries;

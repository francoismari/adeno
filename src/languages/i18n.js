import { I18n } from "i18n-js";
import en from "./en";
import fr from "./fr";
import de from "./de";
import it from "./it";
import es from "./es";
import ro from "./ro";
import nl from "./nl";
import lt from "./lt";
import hu from "./hu";
import pl from "./pl";
import pt from "./pt";
import sv from "./sv";
import et from "./et";
import sl from "./sl";
import sk from "./sk";
import mt from "./mt";
import lv from "./lv";
import fi from "./fi";

const i18n = new I18n({
  en,
  fr,
  de,
  it,
  es,
  ro,
  nl,
  lt,
  hu,
  pl,
  pt,
  sv,
  et,
  sl,
  sk,
  mt,
  lv,
  fi,
});
i18n.defaultLocale = "en";
// i18n.locale = "en";

export default i18n;

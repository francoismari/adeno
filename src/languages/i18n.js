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

const i18n = new I18n({ en, fr, de, it, es, ro,  nl, lt, hu, pl});
i18n.defaultLocale = "en";
// i18n.locale = "en";

export default i18n;

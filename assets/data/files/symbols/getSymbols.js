import { useUser } from "../../../../src/context/userContext";
import en from "./en";
import fr from "./fr";

const getSymbols = () => {
  const { locale } = useUser();

  if (locale.userLocale == "fr") {
    return fr;
  } else {
    return en;
  }
};

export default getSymbols;

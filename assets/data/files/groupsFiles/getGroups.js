import { useUser } from "../../../../src/context/userContext";
import fr from "./fr";

const getGroupsFiles = () => {
  const { locale } = useUser();

  if (locale.userLocale == "fr") {
    return fr;
  } else {
    // to change when adding translations
    return fr;
  }
};

export default getGroupsFiles;

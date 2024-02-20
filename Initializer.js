import { useCallback, useEffect, useState } from "react";
import { useUser } from "./src/context/userContext";

import * as Font from "expo-font";
import * as Localization from "expo-localization";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import i18n from "./src/languages/i18n";
import StackNavigator from "./src/navigation/StackNavigator";
import { View } from "react-native";

let customFonts = {
  FrancoisOne: require("./assets/fonts/FrancoisOne-Regular.ttf"),
};

function Initializer() {
  const { setUser, setLocale } = useUser();
  const [isAppReady, setIsAppReady] = useState(false);

  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync(customFonts);

        const userLocale = Localization.getLocales()[0].languageCode;
        const languageTag = Localization.getLocales()[0].languageTag;
        // console.log("LOCALIZATION DATA:", Localization.getLocales()[0]);
        i18n.locale = userLocale;

        console.log("USER LOCALE: ", userLocale);
        console.log("LANGUAGE LOCALE: ", languageTag);

        setLocale({ userLocale, languageTag: languageTag });

        const setUpValue = await AsyncStorage.getItem("isSetUp");
        console.log("isSetUp value:", setUpValue); // Debugging log

        setInitialRouteName(setUpValue !== null ? "Navigator" : "Onboarding");

        if (setUpValue) {
          // set user data

          const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
              console.log("LAUNCH, FIREBASE USER: ", firebaseUser);

              try {
                const userDoc = doc(db, "users", firebaseUser.uid);
                const userDocData = await getDoc(userDoc);

                console.log("LAUNCH, USER DATA: ", firebaseUser);

                setUser(userDocData.data());
              } catch (error) {
                console.error("Failed to fetch user data or clothes", error);
              }
            } else {
              setUser(null);
            }
          });

          unsubscribe();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!initialRouteName) {
    return null;
  }

  if (!isAppReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StackNavigator initialRouteName={initialRouteName} />
    </View>
  );
}

export default Initializer;

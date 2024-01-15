import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

let customFonts = {
  FrancoisOne: require("./assets/fonts/FrancoisOne-Regular.ttf"),
};

SplashScreen.preventAutoHideAsync();

function Initializer() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let unsubscribe;

    async function loadAppResources() {
      try {
        // Loading fonts.
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.error("App loading error", e);
      } finally {
        setIsAppReady(true);
      }
    }

    loadAppResources();

    return () => {
      // Cleanup
      if (unsubscribe) unsubscribe();
      setIsAppReady(true);
    };
  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return <StackNavigator />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Initializer />
    </NavigationContainer>
  );
}

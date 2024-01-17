import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let customFonts = {
  FrancoisOne: require("./assets/fonts/FrancoisOne-Regular.ttf"),
};

SplashScreen.preventAutoHideAsync();

function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync(customFonts);
        const setUpValue = await AsyncStorage.getItem("isSetUp");
        console.log("isSetUp value:", setUpValue); // Debugging log

        setInitialRouteName(setUpValue !== null ? "Navigator" : "Onboarding");
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!initialRouteName) {
    return null;
  }

  return (
    <NavigationContainer>
      <StackNavigator initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
}

export default App;

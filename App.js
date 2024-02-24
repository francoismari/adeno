import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "./src/context/userContext";
import Initializer from "./src/screens/Initializer";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Initializer />
      </NavigationContainer>
    </UserProvider>
  );
}

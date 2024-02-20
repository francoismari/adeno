import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { UserProvider, useUser } from "./src/context/userContext";
import Initializer from "./Initializer";

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

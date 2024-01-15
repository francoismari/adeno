import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import AllUserResults from "../screens/AllUserResults";
import SetupMultiplayer from "../screens/MultiplayerMode/SetupMultiplayer";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Navigator" component={TabNavigator} />
      <Stack.Screen name="SetupMultiplayer" component={SetupMultiplayer} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AllUserResults" component={AllUserResults} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;

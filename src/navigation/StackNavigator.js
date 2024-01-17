import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import AllUserResults from "../screens/AllUserResults";
import SetupMultiplayer from "../screens/MultiplayerMode/SetupMultiplayer";
import MultiplayerResults from "../screens/MultiplayerMode/MultiplayerResults";
import MultiplayerQuestion from "../screens/MultiplayerMode/MultiplayerQuestion";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Navigator" component={TabNavigator} />
      <Stack.Screen name="SetupMultiplayer" component={SetupMultiplayer} />
      <Stack.Screen name="MultiplayerResults" component={MultiplayerResults} />
      <Stack.Screen
        name="MultiplayerQuestion"
        component={MultiplayerQuestion}
      />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AllUserResults" component={AllUserResults} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;

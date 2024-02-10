import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import Settings from "../screens/Settings";
import AllUserResults from "../screens/AllUserResults";
import SetupMultiplayer from "../screens/MultiplayerMode/SetupMultiplayer";
import MultiplayerResults from "../screens/MultiplayerMode/MultiplayerResults";
import MultiplayerQuestion from "../screens/MultiplayerMode/MultiplayerQuestion";
import OnboardingScreen from "../screens/Onboarding";
import MultiplayerResultsDetails from "../screens/MultiplayerMode/MultiplayerResultsDetails";
import SelectSoloMode from "../screens/SoloMode/SelectSoloMode";
import ExpressMode from "../screens/SoloMode/ExpressMode";
import ClassicMode from "../screens/SoloMode/ClassicMode";
import UserResults from "../screens/UserResults";
import SetStudyInfos from "../screens/SoloMode/SetStudyInfos";
import AllFiles from "../screens/Discover/AllFiles";
import ThemeFiles from "../screens/Discover/ThemeFiles";
import SelectMultiplayerMode from "../screens/MultiplayerMode/SelectMultiplayerMode";
import MultiplePhones from "../screens/MultiplayerMode/MultiplePhones";
import RandomQuestionScreen from "../screens/SoloMode/RandomQuestionScreen";
import ExpressResults from "../screens/SoloMode/ExpressResults";

const Stack = createStackNavigator();

function StackNavigator({ initialRouteName }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Navigator" component={TabNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SetupMultiplayer" component={SetupMultiplayer} />
      <Stack.Screen
        name="MultiplayerQuestion"
        component={MultiplayerQuestion}
      />
      <Stack.Screen name="SelectSoloMode" component={SelectSoloMode} />
      <Stack.Screen
        name="SelectMultiplayerMode"
        component={SelectMultiplayerMode}
      />
      <Stack.Screen name="ExpressMode" component={ExpressMode} />
      <Stack.Screen name="ClassicMode" component={ClassicMode} />
      <Stack.Screen
        name="RandomQuestionScreen"
        component={RandomQuestionScreen}
      />
      <Stack.Screen
        name="ExpressResults"
        component={ExpressResults}
        options={{ gestureEnabled: false }}
      />

      {/* Multiplayer Mode */}
      <Stack.Screen name="MultiplePhones" component={MultiplePhones} />
      <Stack.Screen name="MultiplayerResults" component={MultiplayerResults} />

      <Stack.Screen name="AllFiles" component={AllFiles} />
      <Stack.Screen name="ThemeFiles" component={ThemeFiles} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AllUserResults" component={AllUserResults} />

        <Stack.Screen
          name="MultiplayerResultsDetails"
          component={MultiplayerResultsDetails}
        />
        <Stack.Screen name="UserResults" component={UserResults} />
        <Stack.Screen name="SetStudyInfos" component={SetStudyInfos} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default StackNavigator;

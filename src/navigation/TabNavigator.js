import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Ranking from "../screens/Ranking";
import Discover from "../screens/Discover";
import { Pressable, StyleSheet, Text } from "react-native";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "🎲";
          } else if (route.name === "Ranking") {
            iconName = "🏅";
          } else if (route.name === "Discover") {
            iconName = "🇪🇺";
          }

          return (
            <Pressable
              onPress={() => navigation.navigate(route.name)} // Navigate on press
              style={[
                styles.iconPressable,
                {
                  backgroundColor: focused ? "#DB3366" : "white",
                  alignItems: "center", // Align icon horizontally
                  justifyContent: "center",
                  borderWidth: focused ? 0 : 1,
                  borderColor: "#D9D9D9",
                },
              ]}
            >
              <Text style={{ fontSize: 29, color }}>{iconName}</Text>
            </Pressable>
          );
        },
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Ranking" component={Ranking} />
      <Tab.Screen name="Discover" component={Discover} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 51,
    left: "10%",
    right: "10%",
    elevation: 0,
    backgroundColor: "#ffffff",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconPressable: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: 30,
  },
});

export default TabNavigator;

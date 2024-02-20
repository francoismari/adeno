import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Ranking from "../screens/Ranking";
import Discover from "../screens/Discover";
import { Platform, Pressable, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import * as Haptics from "expo-haptics";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const handlePress = (navigation, routeName) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate(routeName);
  };

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
              onPress={() => handlePress(navigation, route.name)} // Updated to use handlePress
              style={[
                styles.iconPressable,
                {
                  backgroundColor: focused ? "#DB3366" : "white",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: focused ? 0 : 1,
                  borderColor: "#D9D9D9",
                  marginBottom: Platform.OS === "android" ? 30 : 0,
                },
              ]}
            >
              <CustomText style={{ fontSize: 29, color }}>
                {iconName}
              </CustomText>
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
    height: 90,
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

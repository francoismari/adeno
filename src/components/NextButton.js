import { View, Text, Animated, Pressable } from "react-native";
import React, { useRef } from "react";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({ onPress, ...props }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const renderDottedCircle = (radius, dots, dotSize) => {
    const angleStep = (2 * Math.PI) / dots;

    return (
      <View
        style={{
          width: 2 * radius,
          height: 2 * radius,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="arrowright" size={35} color={"white"} />
      </View>
    );
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        {...props}
        style={[
          {
            position: "absolute",
            bottom: 60,
            height: 80,
            width: 80,
            alignSelf: "center",
            padding: 10,
            borderRadius: 45,
            backgroundColor: "#233D97",
            justifyContent: "center",
            alignItems: "center",

            transform: [{ scale: scaleAnim }],

            borderWidth: 1,
            borderColor: "#ddd",
            // padding: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },
        ]}
      >
        {renderDottedCircle(34, 30, 1)}
      </Animated.View>
    </Pressable>
  );
};

export default NextButton;

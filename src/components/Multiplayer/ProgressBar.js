import { View, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";

const ProgressBar = ({ timer, totalTime }) => {
  const animatedWidth = useRef(new Animated.Value(100)).current; // Ref for animated width

  useEffect(() => {
    // Calculate the width percentage and animate the change
    const widthPercentage = Math.max(
      0,
      Math.min(100, (timer / totalTime) * 100)
    );

    Animated.timing(animatedWidth, {
      toValue: widthPercentage,
      duration: 1000, // Duration of the animation
      useNativeDriver: false, // Width change cannot be animated using native driver
    }).start();
  }, [timer, totalTime]);

  return (
    <View
      style={{
        width: Dimensions.get("screen").width * 0.9,
        padding: 4,
        backgroundColor: "#101A40",
        borderRadius: 50,
        alignSelf: "center",
        marginTop: 14,
      }}
    >
      <Animated.View
        style={{
          width: animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"], // Interpolate width from the animated value
          }),
          height: 26,
          backgroundColor: "#FFFFFF",
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export default ProgressBar;

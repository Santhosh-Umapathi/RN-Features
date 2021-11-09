import { useFocusEffect } from "@react-navigation/core";
import React, { useRef, useCallback } from "react";
import { View, StyleSheet, Animated } from "react-native";

const MUIBottomCard = (props) => {
  const { bg, shadowBg, children, height, dur, del } = props;

  const slideAnim = useRef(new Animated.Value(100)).current;

  const slideXIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: dur,
      delay: del,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const slideXOut = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true, // Add This line
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      slideXIn();

      return () => slideXOut();
    }, [])
  );

  return (
    <Animated.View
      style={[
        styles.containerView,
        {
          backgroundColor: bg,
          shadowColor: shadowBg,
          height: height,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.children}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  children: {
    marginVertical: 40,
  },
});

export default MUIBottomCard;

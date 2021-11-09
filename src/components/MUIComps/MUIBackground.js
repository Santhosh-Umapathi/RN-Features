import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Flatlist,
  useWindowDimensions,
  Animated,
  InteractionManager,
} from 'react-native';

const MUIBackground = props => {
  const window = useWindowDimensions();

  const {navigation, bg, bgAlt, left, right} = props;

  const slideAnim = useRef(new Animated.Value(right ? 100 : -100)).current;

  const slideXIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const slideXOut = () => {
    Animated.timing(slideAnim, {
      toValue: right ? 100 : -100,
      duration: 1000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      slideXIn();

      return () => slideXOut();
    }, []),
  );

  return (
    <>
      <View style={[styles.bg, {backgroundColor: bg}]} />

      <Animated.View
        style={[
          styles.bgAlt,
          {
            backgroundColor: bgAlt,
            width: window.height - window.height * 0.3,
            height: window.height - window.height * 0.3,
            right: right && -window.height / 3,
            left: left && -window.height / 3,
            borderRadius: window.height / 2,
            transform: [{translateX: slideAnim}],
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
  },
  bgAlt: {
    position: 'absolute',
    top: 30,
  },
});

export default MUIBackground;

import {useFocusEffect} from '@react-navigation/core';
import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Animated,
} from 'react-native';

const FastlaneImage = props => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const slideXIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const slideXOut = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 100,
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
    <View style={styles.containerView}>
      <Animated.Image
        source={require('../../assets/logo.png')}
        height={100}
        width={100}
        resizeMode="contain"
        style={{
          width: 100,
          height: 100,
          transform: [{translateX: slideAnim}],
        }}
      />
      <Image
        source={require('../../assets/fastlane.png')}
        height={100}
        width={100}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 200, height: 100},
});

export default FastlaneImage;

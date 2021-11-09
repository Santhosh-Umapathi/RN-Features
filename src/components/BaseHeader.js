import React, {useEffect, useRef, useCallback} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import {Icon, Header} from 'react-native-magnus';
import BaseText from './BaseText';
import {useNavigation, useFocusEffect} from '@react-navigation/core';

const BaseHeader = ({
  title = '',
  hasStatusBar = true,
  hasGoBack = true,
  bg = 'transparent',
  titleColor = 'black',
  logoColor = 'white',
  logo,
  animate = false,
}) => {
  const nav = useNavigation();

  // useEffect(() => {
  //   if (hasStatusBar) {
  //     StatusBar.setBarStyle('light-content', true);
  //     if (Platform.OS === 'android')
  //       StatusBar.setBackgroundColor('#ecf0f1', true);
  //     return () => {
  //       StatusBar.setBarStyle('dark-content', true);
  //     };
  //   }
  // }, []);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const slideXIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const slideXOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        slideXIn();
      }, 100);
      return () => slideXOut();
    }, []),
  );

  return (
    <>
      <Header
        p="lg"
        m={logo ? 'lg' : 'sm'}
        bg={bg}
        alignment="center"
        shadow={0}
        prefix={
          hasGoBack ? (
            <TouchableOpacity onPress={() => nav.goBack()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F1F1F1',
                }}>
                <Icon
                  name="chevron-left"
                  fontFamily="Feather"
                  color="orange400"
                  fontSize={35}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }>
        <BaseText variant="bigTitle" style={{fontSize: 22, color: titleColor}}>
          {title}
        </BaseText>
        {logo && animate ? (
          /* Animated Header */
          <Animated.Image
            source={{uri: logo}}
            style={{
              width: '100%',
              height: 58,
              resizeMode: 'contain',
              tintColor: logoColor,
              opacity: slideAnim,
              // transform: [{translateX: slideAnim}],
            }}
          />
        ) : (
          /* Default Header not needed was bugging the header with only text and back button */
          <></>
        )}
      </Header>
    </>
  );
};
export default BaseHeader;

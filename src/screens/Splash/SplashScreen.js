import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as ExpoSplashScreen from 'expo-splash-screen';
import {Asset} from 'expo-asset';

//Stop Splash Screen
ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

const SplashScreen = ({children, color}) => {
  const [isSplashReady, setSplashReady] = useState(false);

  const image = require('../../../assets/splash.png');

  //Downloading Image
  const startAsync = useMemo(
    () => () => Asset.fromModule(image).downloadAsync(),
    [image],
  );

  const onFinish = useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return (
    <AnimatedSplashScreen image={image} color={color}>
      {children}
    </AnimatedSplashScreen>
  );
};

const AnimatedSplashScreen = ({children, image, color}) => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const FadeAnimation = useMemo(() => new Animated.Value(1), []);
  const ScaleAnimation = useMemo(() => new Animated.Value(1), []);

  //Start Animations
  const loadAnimations = () => {
    if (isAppReady) {
      Animated.timing(FadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));

      Animated.timing(ScaleAnimation, {
        toValue: 10,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    loadAnimations();
  }, [isAppReady]);

  const onImageLoaded = useMemo(() => async () => {
    try {
      //Close Splash Screen
      await ExpoSplashScreen.hideAsync();
    } catch (e) {
      console.log('🚀 --- onImageLoaded --- e', e);
    } finally {
      setAppReady(true);
    }
  });

  return (
    <View style={{flex: 1}}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: FadeAnimation,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Animated.View
            style={{
              backgroundColor: color,
              opacity: 0.2,
              width: 200,
              height: 200,
              borderRadius: 100,
              position: 'absolute',
              transform: [{scale: ScaleAnimation}],
            }}
          />
          <Animated.Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default SplashScreen;

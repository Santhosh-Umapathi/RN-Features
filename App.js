import React, {useState, useEffect} from 'react';
import {Text, useWindowDimensions} from 'react-native';
import {ThemeProvider} from 'react-native-magnus';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigator/MainNavigator';
import {enableScreens} from 'react-native-screens';
enableScreens();
import AppLoading from 'expo-app-loading';

import * as Updates from 'expo-updates';

import SplashScreen from './src/screens/Splash/SplashScreen';

const Navigator = () => {
  const [deviceSize, setDeviceSize] = useState();

  const [appLoading, setAppLoading] = useState(true);

  const window = useWindowDimensions();

  const checkForUpdates = async () => {
    if (!__DEV__) {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // TODO add info about update here
          Updates.reloadAsync();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    checkForUpdates();
    if (window.width < 375) {
      setDeviceSize('small');
    } else if (window.width > 375 && window.width < 420) {
      setDeviceSize('medium');
    } else {
      setDeviceSize('large');
    }

    setAppLoading(false);
  }, []);

  if (appLoading) {
    return <AppLoading />;
  }

  return (
    <SplashScreen color={'lightgreen'}>
      <NavigationContainer
        independent={true}
        fallback={<Text>{'Loading...'}</Text>}>
        <MainNavigator />
      </NavigationContainer>
    </SplashScreen>
  );
};

export default App = () => {
  return <Navigator />;
};

import React, {useState, useEffect} from 'react';
import {Alert, Text, useWindowDimensions} from 'react-native';
import {ThemeProvider} from 'react-native-magnus';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigator/MainNavigator';
import {enableScreens} from 'react-native-screens';
enableScreens();
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_200ExtraLight,
  // Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  // Nunito_300Light_Italic,
  Nunito_400Regular,
  // Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  // Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  // Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  // Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  // Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import * as Linking from 'expo-linking';
import * as Updates from 'expo-updates';

import {AppContext} from './src/context';
import {getLocalData, removeAllLocalData} from './src/screens/helpers/helpers';
import {api} from './src/api';
import {slug} from './src/screens/helpers/constants';

import SplashScreen from './src/screens/Splash/SplashScreen';

const prefix = Linking.createURL('/');

const Navigator = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [appconfig, setAppConfig] = useState(false);
  const [customer, setCustomer] = useState(undefined);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    id: '',
  });
  const [deviceSize, setDeviceSize] = useState();

  const window = useWindowDimensions();

  const linking = {
    prefixes: [prefix],
  };

  //Load all the fonts on Splash Screen
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  const userLoggedInCheck = async () => {
    const access_token = await getLocalData('access_token');
    const expire_time = await getLocalData('expire_time');
    const user_id = await getLocalData('user_id');
    const user_info = await getLocalData('user_info');

    if (access_token && expire_time && user_id && user_info) {
      const {sub, email, given_name, family_name} = JSON.parse(user_info);
      if (user_id === sub) {
        // console.log('check expiration', {
        //   expire_time: expire_time * 1000,
        //   now: Date.now(),
        //   res: expire_time * 1000 < Date.now(),
        // });
        if (expire_time * 1000 < Date.now()) {
          await removeAllLocalData();
        } else {
          setIsUserLoggedIn(true);
          saveUser(user_id, email, given_name, family_name);
        }
      } else {
        console.warn('Not equals sub from KeyCloack and AsyncStorage', {
          user_info,
          user_id,
        });
      }
    } else {
      // console.log('userLoggedInCheck passed, not loggedIn', {
      //   access_token,
      //   expire_time,
      //   user_id,
      //   user_info,
      // });
    }
  };

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
    userLoggedInCheck();
    getAppConfig();
    if (window.width < 375) {
      setDeviceSize('small');
    } else if (window.width > 375 && window.width < 420) {
      setDeviceSize('medium');
    } else {
      setDeviceSize('large');
    }
    // testAutoLogin();
  }, []);

  // JUST FOR TESTS
  // const testAutoLogin = async () => {
  //   setIsUserLoggedIn(true);
  //   saveUser('1999', 'derewith@live.it', 'Jonathan', 'Canevese');
  // };

  const getAppConfig = async () => {
    try {
      const response = await api.post('appconfig', {
        body: {slug: slug},
      });
      console.log('🚀 --- getAppConfig --- response', response);

      if (response?.body?.statusCode === 400) {
        Alert.alert(response.body.message);
      } else {
        const results = response?.body;
        const {logo, maincolor, title, validation_ticket_min} = results;
        // console.log('---RESULT APP CONFIG---', {
        //   logo,
        //   maincolor,
        //   title,
        //   validation_ticket_min,
        // });
        setAppConfig({logo, maincolor, title, validation_ticket_min});
      }
    } catch (error) {
      console.log('---getAppConfig---', error);
      Alert.alert('AppConfig: Connection to Backend Failed');
    }
  };

  //Save all user details
  const saveUser = (id, email, firstName, lastName) => {
    setUser({
      ...user,
      id,
      email,
      firstName,
      lastName,
    });
  };

  //Clear all user details
  const clearUser = () => {
    setUser({
      email: '',
      firstName: '',
      lastName: '',
      id: '',
    });
  };

  if (!fontsLoaded && !appconfig) {
    return <AppLoading />;
  }

  return (
    <SplashScreen color={appconfig?.maincolor}>
      <NavigationContainer
        independent={true}
        linking={linking}
        fallback={<Text>{'Caricamento...'}</Text>}>
        <ThemeProvider>
          <AppContext.Provider
            value={{
              isUserLoggedIn,
              setIsUserLoggedIn,
              user,
              saveUser,
              clearUser,
              appconfig,
              deviceSize,
              customer,
              setCustomer,
            }}>
            <MainNavigator />
          </AppContext.Provider>
        </ThemeProvider>
      </NavigationContainer>
    </SplashScreen>
  );
};

export default App = () => {
  return <Navigator />;
};

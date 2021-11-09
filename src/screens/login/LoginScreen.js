import React, {useRef, useCallback, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Animated, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';

//Components
import PrimaryButton from '../../components/PrimaryButton';
import {BaseText} from '../../components';
import BaseConent from './BaseContent/BaseContent';
import {Dropdown} from 'react-native-magnus';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as Random from 'expo-random';
import jwtDecode from 'jwt-decode';
import {env} from '../../config';
//Custom i18n
import useLanguage from '../../hooks/useLanguage';

import {storeLocalData} from '../helpers/helpers';
WebBrowser.maybeCompleteAuthSession();
// use it for test
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});
/* converts random bytes into string. Taken from expo-auth-session */
const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function convertBufferToString(buffer) {
  const state = [];
  for (let i = 0; i < buffer.byteLength; i += 1) {
    const index = buffer[i] % CHARSET.length;
    state.push(CHARSET[index]);
  }
  return state.join('');
}

const LoginScreen = ({navigation}) => {
  //Custom i18n
  const {t, changeLanguage} = useLanguage();

  const slideAnim = useRef(new Animated.Value(0.2)).current;
  const loginBottomSheet = useRef();

  const dropdownRef = useRef();
  const languageRef = useRef();

  const slideXIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const slideXOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0.2,
      duration: 1000,
      useNativeDriver: true, // Add This line
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

  const random_bytes = Random.getRandomBytes(20);
  const nonce_generated = convertBufferToString(random_bytes);

  const {issuer, clientId, clientSecret} = env;

  const config = {
    issuer,
    clientId,
    clientSecret,
    redirectUri,
    scopes: ['openid', 'profile', 'offline_access'],
    responseType: 'token',
    extraParams: {
      nonce: nonce_generated,
      prompt: 'login',
    },
  };

  const discovery = AuthSession.useAutoDiscovery(issuer);

  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {...config},
    discovery,
  );

  useEffect(() => {
    loadUserInfo(result);
  }, [result]);

  const loadUserInfo = async result => {
    if (result?.type === 'success') {
      const {accessToken, issuedAt, expiresIn} = result?.authentication;
      // console.log('🚀 --- LoginScreen --- accessToken', accessToken);

      const decoded = jwtDecode(accessToken);
      const {email, family_name, given_name, groups, sub} = decoded;

      await storeLocalData('access_token', accessToken);
      await storeLocalData('expire_time', (issuedAt + expiresIn).toString());
      await storeLocalData('user_id', sub);

      const user = JSON.stringify({sub, email, given_name, family_name});
      await storeLocalData('user_info', user);
    }
  };

  // Optimize WebBrowser loading
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <>
      <ScrollView style={styles.containerView}>
        <Animated.Image
          source={require('../../../assets/brand.png')}
          resizeMode="contain"
          height="auto"
          style={{
            height: 400,
            width: '80%',
            alignSelf: 'center',
            marginVertical: 20,
            opacity: slideAnim,
            // transform: [{translateY: slideAnim}],
          }}
        />
        <PrimaryButton
          title={t?.accept}
          type="primary"
          disabled={!request}
          onPress={() => dropdownRef.current.open()}
        />

        <PrimaryButton
          title={t?.changeLanguage}
          type="primary"
          onPress={() => languageRef.current.open()}
        />

        <View style={styles.footer}>
          <View style={styles.versionContainer}>
            <BaseText>{`${t?.version} ${Constants.manifest.version} (${
              Platform.OS === 'ios'
                ? Constants.manifest.ios.buildNumber
                : Constants.manifest.android.versionCode
            })`}</BaseText>
          </View>
        </View>

        <Dropdown ref={dropdownRef} showSwipeIndicator={true} roundedTop="md">
          <Dropdown.Option onPress={() => promptAsync({useProxy})}>
            <BaseConent
              onPress={() => promptAsync({useProxy})}
              title={t?.acceptBrand}
            />
          </Dropdown.Option>
        </Dropdown>
        <Dropdown
          ref={languageRef}
          mt="md"
          pb="2xl"
          showSwipeIndicator={true}
          roundedTop="md">
          {[
            {label: t?.english, value: 'en'},
            {label: t?.italian, value: 'it'},
          ].map((item, index) => {
            return (
              <Dropdown.Option
                py="md"
                px="xl"
                block
                value={item.value}
                key={index}
                onPress={() => changeLanguage(item.value)}>
                {item.label}
              </Dropdown.Option>
            );
          })}
        </Dropdown>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  versionContainer: {
    marginVertical: 10,
  },
});

export default LoginScreen;

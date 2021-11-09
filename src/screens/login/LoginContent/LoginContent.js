import React, {useState, useContext} from 'react';
import {TextInput, StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';

//Api
import {api} from '../../../api/index';
import BaseText from '../../../components/BaseText';

//Components
import PrimaryButton from '../../../components/PrimaryButton';
//Context
import {AppContext} from '../../../context';
import {fonts} from '../../../utils/fonts';
//Helpers
import {storeLocalData} from '../../helpers/helpers';

const LoginConent = () => {
  const {isUserLoggedIn, setIsUserLoggedIn, saveUser} = useContext(AppContext);

  //User Credentials for Login
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);

  //Storing user credentials in state
  const credentialsHandler = (key, value) => {
    setCredentials(prevState => {
      return {...prevState, [key]: value};
    });
  };

  const loginHandler = async () => {
    // console.log('[LOGIN]: ', credentials);
    setIsLoading(true);
    try {
      const response = await api.post('login', {
        body: {email: credentials.email, password: credentials.password},
      });

      if (response.body.statusCode === 400) {
        Alert.alert(response.body.message);
        setIsLoading(false);
      } else {
        const results = response.body.result;
        const {user_id, email, first_name, last_name} = results;
        setIsUserLoggedIn(!isUserLoggedIn);
        setIsLoading(false);
        storeLocalData('user_id', user_id);
        saveUser(user_id, email, first_name, last_name);
      }
    } catch (error) {
      console.log('[ERROR]: ', error);
      Alert.alert('Login: Connection to Backend Failed');
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BaseText style={styles.loginTitle} variant="bold">
        {'Accedi'}
      </BaseText>

      <TextInput
        placeholder="Email"
        style={styles.loginEmail}
        value={credentials.email}
        onChangeText={text => credentialsHandler('email', text)}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />

      <TextInput
        placeholder="Password"
        style={styles.loginPassword}
        value={credentials.password}
        onChangeText={text => credentialsHandler('password', text)}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        secureTextEntry={true}
      />

      <PrimaryButton
        type="primary"
        title="Accedi"
        buttonStyle={{marginTop: 30}}
        onPress={loginHandler}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  loginEmail: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 0,
    marginHorizontal: 30,
    fontFamily: fonts.normal,
  },
  loginPassword: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    padding: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal: 30,
    fontFamily: fonts.normal,
  },
});

export default LoginConent;

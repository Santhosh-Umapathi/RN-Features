import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Button} from 'react-native-magnus';
import {api} from '../../api';
import {BaseHeader, BaseText} from '../../components';
import {AppContext} from '../../context';
import {fonts} from '../../utils/fonts';
// import {slug} from '../helpers/constants';
import {getLocalData} from '../helpers/helpers';
//Custom i18n
import useLanguage from '../../hooks/useLanguage';

const ReportOperatorScreen = () => {
  const {appconfig, customer} = useContext(AppContext);
  const color = appconfig.maincolor;
  const [email, changeEmail] = useState(customer.email ?? '');
  //Custom i18n
  const {t} = useLanguage();

  // const [numberOfVisitors, setnumberOfVisitors] = useState(0);
  // const loadReport = async () => {
  //   try {
  //     const response = await api.post('ticket/scanned', {
  //       body: {slug: slug},
  //     });

  //     if (response.body.statusCode === 400) {
  //       Alert.alert(response.body.message);
  //     } else {
  //       const result = response.body;
  //       const {count} = result;
  //       setnumberOfVisitors(count);
  //     }
  //   } catch (error) {
  //     console.log('[ERROR]: ', error);
  //     Alert.alert(error);
  //   }
  // };

  const askReport = async () => {
    try {
      if (email !== '') {
        const token = await getLocalData('access_token');
        const response = await api.post('ticket/report', {
          body: {customerId: customer.id, email, token},
        });
        console.log('THINGS', {
          status: response.body.statusCode,
          data: response.body,
        });
        if (response.body) {
          Alert.alert(t?.reportSuccess);
        } else {
          Alert.alert(t?.backendError);
        }
      } else Alert.alert(t?.emailError);
    } catch (error) {
      console.log('[ERROR]: ', error);
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: color, flex: 1}}>
      <BaseHeader
        bg={color}
        title={t?.reportOne}
        hasStatusBar={false}
        hasGoBack={true}
        titleColor="white"
      />
      <View style={styles.main}>
        <View>
          {/* <BaseText
            variant="light"
            style={{
              fontSize: 18,
            }}>
            {'Numero di visitatori passati in stand'}
          </BaseText>
          <BaseText
            variant="bold"
            style={{
              fontSize: 34,
              marginVertical: 20,
            }}>
            {numberOfVisitors}
          </BaseText> */}
          <BaseText
            variant="light"
            style={{
              fontSize: 16,
            }}>
            {t?.emailInsert}
          </BaseText>
          <TextInput
            placeholder={t?.email}
            style={styles.inputEmail}
            value={email}
            onChangeText={text => changeEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          <Button block bg={color} rounded={10} shadow={1} onPress={askReport}>
            <BaseText variant="bold" style={{fontSize: 18, color: 'white'}}>
              {t?.askExport}
            </BaseText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  inputEmail: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginVertical: 30,
    fontFamily: fonts.normal,
  },
});

export default ReportOperatorScreen;

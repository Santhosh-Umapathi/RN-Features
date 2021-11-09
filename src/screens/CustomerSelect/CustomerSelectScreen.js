import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Dropdown, Icon} from 'react-native-magnus';
import {AppContext} from '../../context';
import {
  getLocalData,
  removeAllLocalData,
  storeLocalData,
} from '../helpers/helpers';
import {BaseHeader, BaseText} from '../../components';
import {backendApi, authAPI} from '../../api';
import PrimaryButton from '../../components/PrimaryButton';
import {env} from '../../config';
//Custom i18n
import useLanguage from '../../hooks/useLanguage';

const CustomerSelectScreen = props => {
  const {navigation} = props;
  const {user, setIsUserLoggedIn, clearUser, appconfig} =
    useContext(AppContext);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [customers, setCustomers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  //Custom i18n
  const {t, lang, changeLanguage} = useLanguage();

  const imgLogo = appconfig.logo;
  const color = appconfig.maincolor;
  const dropdownRef = useRef();
  const languageRef = useRef();

  const {clientSecret, clientId, realm, username, password} = env;

  const loginAPI = async () => {
    try {
      const authData = {
        clientSecret,
        clientId,
        realm,
        username,
        password,
      };
      // console.log('---authData', authData);
      const {status, data} = await authAPI.post('', authData);
      if (status !== 401) {
        return data;
      }
    } catch (error) {
      return undefined;
    }
  };

  const getCustomers = async () => {
    setIsLoading(true);
    const uid = await getLocalData('user_id');
    // const token = await getLocalData('access_token');
    // console.log('🚀  --- ~ uid', {uid, token});

    try {
      const loginRes = await loginAPI();
      if (loginRes) {
        const {access_token} = loginRes;
        const {data, request} = await backendApi.get(`/api/customer`, {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
          params: {
            uid,
          },
        });
        // console.log('--- request', request);
        // console.log('--- loginRes', loginRes);
        // console.log('🚀  --- ~ data', data);
        if (data.length > 0) setCustomers(data);
      } else throw 'no valid login';
    } catch (error) {
      console.log('🚀 --- getCustomers --- error', error, error.message);
      // alert('Error getting customers');
      // OPTIONAL AUTO LOG_OUT
      // logOut()
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const acceptHandler = async () => {
    const customerObject = customers.filter(
      item => item.code === selectedCustomer,
    )[0];

    await storeLocalData('customer', JSON.stringify(customerObject));

    navigation.navigate('Dash');
  };

  const logOut = () => {
    setIsUserLoggedIn(false);
    removeAllLocalData();
    clearUser();
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const onValueChange = itemValue => setSelectedCustomer(itemValue);

  return (
    <SafeAreaView style={{backgroundColor: color, flex: 1}}>
      <BaseHeader
        logo={imgLogo}
        hasStatusBar={false}
        hasGoBack={false}
        animate
      />

      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.containerView}>
          {isLoading && (
            <View>
              <ActivityIndicator size="large" color={color} />
            </View>
          )}
          {!isLoading && customers && (
            <>
              <View style={styles.customerContainer}>
                <BaseText style={styles.title}>
                  {t?.customerScreen.title}
                </BaseText>
                <BaseText style={styles.titleContent}>
                  {t?.customerScreen.content}
                </BaseText>
              </View>

              <PrimaryButton
                title={
                  selectedCustomer
                    ? `${t?.customerScreen.selectedAgency} ${
                        customers.find(item => item.code === selectedCustomer)
                          .companyName
                      }`
                    : t?.customerScreen.selectAgency
                }
                type="primary"
                onPress={() => dropdownRef.current.open()}
              />
              <PrimaryButton
                title={t?.changeLanguage}
                type="primary"
                onPress={() => languageRef.current.open()}
              />
            </>
          )}
          {!isLoading && !customers && (
            <View style={styles.customerContainer}>
              <BaseText style={styles.title}>
                {t?.customerScreen.notAuthorized}
              </BaseText>
              <BaseText style={styles.titleContent}>
                {t?.customerScreen.tryAgain}
              </BaseText>
            </View>
          )}
          {/* {selectedCustomer && (
            <View style={{justifyContent: 'center', marginTop: 20}}>
              <BaseText
                style={{
                  textAlign: 'center',
                }}>
                {}
              </BaseText>
            </View>
          )} */}
        </View>
        <View style={styles.buttonGroup}>
          <View style={{flex: 1}}>
            <PrimaryButton title={t?.logout} type="danger" onPress={logOut} />
          </View>
          {!isLoading && customers && (
            <View style={{flex: 1}}>
              <PrimaryButton
                title={t?.proceed}
                type="secondary"
                disabled={!selectedCustomer}
                onPress={acceptHandler}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {!isLoading && (
        <Dropdown
          ref={dropdownRef}
          mt="md"
          pb="2xl"
          showSwipeIndicator={true}
          roundedTop="md">
          {customers &&
            customers.map((item, index) => {
              return (
                <Dropdown.Option
                  py="md"
                  px="xl"
                  block
                  value={item.code}
                  key={index}
                  onPress={() => onValueChange(item.code, index)}>
                  <Icon
                    name="check"
                    fontSize={20}
                    color={color}
                    style={{
                      marginRight: 5,
                      opacity: selectedCustomer === item.code ? 100 : 0,
                    }}
                  />

                  <BaseText
                    style={{
                      color: selectedCustomer === item.code ? color : 'black',
                    }}>
                    {item.companyName}
                  </BaseText>
                </Dropdown.Option>
              );
            })}
        </Dropdown>
      )}

      {!isLoading && (
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
                <Icon
                  name="check"
                  fontSize={20}
                  color={color}
                  style={{
                    marginRight: 5,
                    opacity: lang === item.value ? 100 : 0,
                  }}
                />

                <BaseText
                  style={{color: lang === item.value ? color : 'black'}}>
                  {item.label}
                </BaseText>
              </Dropdown.Option>
            );
          })}
        </Dropdown>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  titleContent: {
    fontSize: 15,
    marginBottom: 20,
  },
  buttonGroup: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customerContainer: {paddingHorizontal: 30},
});

export default CustomerSelectScreen;

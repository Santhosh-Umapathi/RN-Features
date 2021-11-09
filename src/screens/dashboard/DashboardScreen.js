import React, {useContext, useLayoutEffect, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Div, Icon, Avatar} from 'react-native-magnus';
import {BaseHeader, BaseText} from '../../components';
import {AppContext} from '../../context';
import {removeAllLocalData, getLocalData} from '../helpers/helpers';
//Custom i18n
import useLanguage from '../../hooks/useLanguage';

const DashboardScreen = ({navigation}) => {
  const {user, setIsUserLoggedIn, clearUser, appconfig, customer, setCustomer} =
    useContext(AppContext);
  //Custom i18n
  const {t} = useLanguage();

  const logOut = async () => {
    await removeAllLocalData();
    setIsUserLoggedIn(false);
    clearUser();
  };

  const getLocalCustomer = async () => {
    const customerObject = await getLocalData('customer');
    setCustomer(JSON.parse(customerObject));
    // console.log('🚀  --- ~ customerObject', JSON.parse(customerObject));
    // setCustomer(JSON.parse(customerObject));
  };

  useEffect(() => {
    getLocalCustomer();
  }, []);

  useLayoutEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    [];
  });

  const changeCustomer = () => navigation.navigate('Cust');
  // console.log('🚀 --- DashboardScreen --- customer', customer);

  const imgLogo = appconfig.logo;
  const color = appconfig.maincolor;
  return (
    <SafeAreaView style={{backgroundColor: color}}>
      <View style={styles.main}>
        <BaseHeader
          logo={imgLogo}
          logoColor={color}
          hasStatusBar={false}
          hasGoBack={false}
          animate
        />
        {/* <Div
          h={1}
          w={'100%'}
          rounded="md"
          backgroundColor="black"
          shadow="xl"
          my="md"
          opacity={0.3}
        /> */}
        <Div
          row
          mx="xl"
          mt="xl"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center">
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('RegisterOperator')}>
            <Div
              shadow="sm"
              rounded="xl"
              bg={'white'}
              h={140}
              w={Dimensions.get('screen').width - 50}
              p="lg"
              justifyContent="space-between">
              <Div alignSelf="flex-start">
                <Icon name="qrcode" fontSize={45} color={color} />
              </Div>
              <BaseText variant="bigTitle" style={{fontSize: 18, color: color}}>
                {t?.register}
              </BaseText>
            </Div>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ReportOperator')}>
            <Div
              mt="3xl"
              shadow="sm"
              rounded="xl"
              bg={'white'}
              h={140}
              w={Dimensions.get('screen').width - 50}
              p="lg"
              justifyContent="space-between">
              <Div alignSelf="flex-start">
                <Icon
                  name="menu-open"
                  fontFamily="MaterialIcons"
                  color={color}
                  fontSize={45}
                />
              </Div>
              <BaseText variant="bigTitle" style={{fontSize: 18, color: color}}>
                {t?.report}
              </BaseText>
            </Div>
          </TouchableWithoutFeedback>
        </Div>

        {/* <View
            style={{
              padding: 20,
              marginTop: 10,
              borderRadius: 15,
              backgroundColor: 'white',
            }}>
            <BaseText style={{color}}>
              {JSON.stringify(customer, null, 4)}
            </BaseText>
          </View> */}
        {/* DISABLED FOR NOW */}
      </View>
      <View
        style={[
          styles.bottomContainer,
          {
            backgroundColor: color,
          },
        ]}>
        <View style={styles.bottomContent}>
          <TouchableOpacity onPress={changeCustomer}>
            <Avatar bg="red100" color={color}>
              {`${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`}
            </Avatar>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeCustomer}>
            <BaseText variant="bold" style={{color: 'white'}}>
              {`${user.firstName} ${user.lastName}`}
            </BaseText>
          </TouchableOpacity>
          <TouchableOpacity onPress={logOut}>
            <Icon name="logout" color="red" fontSize="6xl" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {backgroundColor: 'white', height: '100%'},
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 1,
  },
  bottomContent: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default DashboardScreen;

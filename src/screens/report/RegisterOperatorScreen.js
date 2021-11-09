import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  // useRef,
} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {BaseHeader, BaseText} from '../../components';
import {BarCodeScanner} from 'expo-barcode-scanner';
// import BottomSheetModal from '../../components/BottomSheetModal';
import PrimaryButton from '../../components/PrimaryButton';
import {api} from '../../api';
import {Overlay} from 'react-native-magnus';
import {AppContext} from '../../context';
// import {closeModal, showModal} from '../helpers/helpers';
import withModalProvider from '../../components/withModalProvider';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {FancyAlert} from 'react-native-expo-fancy-alerts';
import {Div, Icon, Avatar, Modal} from 'react-native-magnus';
//Custom i18n
import useLanguage from '../../hooks/useLanguage';

const RegisterOperatorScreen = ({navigation}) => {
  const {appconfig, customer} = useContext(AppContext);
  const color = appconfig.maincolor;
  const nav = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  //Custom i18n
  const {t} = useLanguage();

  // const scannedModal = useRef();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [bottomSheetData, setBottomSheetData] = useState(undefined);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if ((status === 'granted') === false) {
        alert('Non ho accesso alla fotocamera');
        navigation.goBack();
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);
    // console.info(
    //   `Bar code with type ${type} and data ${data} has been scanned!`,
    // );
    let response = await api.post('ticket/scan', {
      body: {id: data, date: new Date(), customerId: customer.id},
    });
    // handle HTTP or API errors
    if (response.err) {
      // console.log('---api error--', response.err);
      setOverlayVisible(true);
    } else {
      // console.log('---apires---', response.body);
      const {ticketcode} = response.body;

      ticketcode && setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        nav.navigate('Dash', {ticketcode});
      }, 2000);

      // showModal(scannedModal);
      // setBottomSheetData({
      //   type,
      //   ticketcode,
      // });
    }
  };

  const successAlert = useCallback(
    () => (
      <FancyAlert
        visible={showAlert}
        icon={
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4BB543',
              borderRadius: 50,
              width: '100%',
            }}>
            <Icon
              name="done"
              fontFamily="MaterialIcons"
              color="white"
              fontSize={45}
            />
          </View>
        }
        style={{backgroundColor: 'white'}}>
        <BaseText style={{marginTop: -16, marginBottom: 32}}>
          {t?.successRegister}
        </BaseText>
      </FancyAlert>
    ),
    [showAlert],
  );

  // const renderContent = useCallback(
  //   () => (
  //     <View style={styles.contentContainer}>
  //       <View>
  //         <BaseText variant="bold" style={{textAlign: 'center'}}>
  //           {'REGISTRA OPERATORE'}
  //         </BaseText>

  //         <BaseText
  //           variant="bold"
  //           style={[
  //             styles.contentSubTitle,
  //             {
  //               color: color,
  //             },
  //           ]}>
  //           {bottomSheetData?.ticketcode}
  //         </BaseText>

  //         {/* <BaseText
  //           style={{
  //             marginVertical: 15,
  //             textAlign: 'center',
  //           }}>
  //           {'MARIO ROSSI\nAZIENDA X\nDIRETTORE GENERALE'}
  //         </BaseText> */}
  //         {scanned && (
  //           <PrimaryButton
  //             title="Conferma"
  //             type="primary"
  //             onPress={() => {
  //               setScanned(false);
  //               closeModal(scannedModal);
  //             }}
  //           />
  //         )}
  //       </View>
  //     </View>
  //   ),
  //   [bottomSheetData],
  // );

  return (
    <>
      <SafeAreaView style={[styles.container, {backgroundColor: color}]}>
        {successAlert()}
        <BaseHeader
          bg={color}
          title={t?.register}
          hasStatusBar={false}
          hasGoBack={true}
          titleColor="white"
        />
        <View style={styles.main}>
          {hasPermission !== null && hasPermission !== false && (
            <>
              <View style={styles.squareBox}>
                <View style={[styles.squareLines, {borderColor: color}]} />
              </View>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{...StyleSheet.absoluteFillObject}}
              />
            </>
          )}
        </View>
        {/* <BottomSheetModal ref={scannedModal} type="half">
          {renderContent()}
        </BottomSheetModal> */}
      </SafeAreaView>
      <Overlay visible={overlayVisible} p="xl">
        <BaseText>{t?.errorRegister}</BaseText>
        <PrimaryButton
          title={t?.scanAgain}
          type="primary"
          onPress={() => {
            setScanned(false);
            setOverlayVisible(false);
          }}
        />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingVertical: 20},
  main: {padding: 10, backgroundColor: 'white', flex: 1},
  squareBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareLines: {
    width: 200,
    height: 200,
    borderWidth: 5,
  },
  contentContainer: {
    backgroundColor: 'white',
    marginTop: 30,
    justifyContent: 'center',
  },
  contentSubTitle: {
    marginTop: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default withModalProvider(RegisterOperatorScreen);

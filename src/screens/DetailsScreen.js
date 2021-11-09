import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Flatlist,
} from 'react-native';
import FastlaneImage from '../components/FastlaneImage';
import MUIBackground from '../components/MUIComps/MUIBackground';

const DetailsScreen = props => {
  const {navigation} = props;

  return (
    <>
      <MUIBackground
        bg="#2B7BFF"
        bgAlt="#35BCD4"
        left
        navigation={navigation}
      />
      <FastlaneImage />

      <View style={styles.containerView}>
        <Text style={styles.text}>Project made with Expo</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  },
});

export default DetailsScreen;

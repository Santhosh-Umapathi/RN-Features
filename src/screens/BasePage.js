import React from 'react';
import {View} from 'react-native';
import {BaseHeader} from '../components';

const BasePage = ({}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BaseHeader title={'yourTitlePage'} />
      <View style={{padding: 10}}>{/** place here the content */}</View>
    </View>
  );
};

export default BasePage;

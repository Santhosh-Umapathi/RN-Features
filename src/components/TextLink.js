import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../context';

//Components
import BaseText from './BaseText';

const TextLink = ({message, onPress}) => {
  const {appconfig} = useContext(AppContext);
  return (
    <TouchableOpacity onPress={onPress}>
      <BaseText style={[styles.text, {color: appconfig.maincolor}]}>
        {message}
      </BaseText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
    padding: 5,
  },
});

export default TextLink;

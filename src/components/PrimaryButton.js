import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

//Components
import BaseText from './BaseText';

import TouchableButton from './TouchableButton';

const PrimaryButton = props => {
  const {
    title = '',
    textStyle = {},
    buttonStyle = {},
    onPress = () => {},
    type = '',
    isLoading = false,
    disabled = false,
  } = props;

  //Button Types - ['primary', 'secondary']
  let bStyle, tStyle;
  switch (type) {
    case 'primary':
      bStyle = {
        backgroundColor: '#2B7BFF', //appconfig.maincolor,
        ...buttonStyle,
      };
      tStyle = {color: '#fff', ...textStyle};
      break;

    case 'secondary':
      bStyle = {
        backgroundColor: !disabled ? '#fff' : '#D3D3D3',
        borderWidth: 1,
        borderColor: '#2B7BFF',
        borderRadius: 10,
        ...buttonStyle,
      };
      tStyle = {
        color: '#2B7BFF',
        ...textStyle,
      };
      break;

    case 'danger':
      bStyle = {
        backgroundColor: '#EB0500',
        borderWidth: 1,
        borderColor: '#EB0500',
        borderRadius: 10,
        ...buttonStyle,
      };
      tStyle = {
        color: '#fff',
        ...textStyle,
      };
      break;
  }

  return (
    <View>
      <TouchableButton
        style={[styles.button, bStyle]}
        onPress={onPress}
        disabled={disabled || isLoading}>
        <BaseText variant="bold" style={[styles.text, tStyle]}>
          {!isLoading && title}
        </BaseText>

        <View style={styles.spinner}>
          <ActivityIndicator
            animating={isLoading}
            size="small"
            color={type === 'primary' ? '#fff' : ''}
          />
        </View>
      </TouchableButton>
    </View>
  );
};

//Defaults
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    padding: 15,
  },
  spinner: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
  },
});

export default PrimaryButton;

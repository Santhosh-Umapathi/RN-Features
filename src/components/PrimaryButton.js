import React, {useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

//Components
import BaseText from './BaseText';
//Use this Touchable opacity to fix Android Bottom sheet Touchable opacity issue.
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {AppContext} from '../context';
import TouchableButton from './TouchableButton';

const PrimaryButton = props => {
  const {appconfig} = useContext(AppContext);
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
        backgroundColor: appconfig.maincolor,
        ...buttonStyle,
      };
      tStyle = {color: '#fff', ...textStyle};
      break;

    case 'secondary':
      bStyle = {
        backgroundColor: !disabled ? '#fff' : '#D3D3D3',
        borderWidth: 1,
        borderColor: appconfig.maincolor,
        borderRadius: 10,
        ...buttonStyle,
      };
      tStyle = {
        color: appconfig.maincolor,
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
            color={type === 'primary' ? '#fff' : appconfig.maincolor}
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

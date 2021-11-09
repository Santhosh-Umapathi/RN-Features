import React from 'react';
import {Button} from 'react-native-magnus';
import BaseText from './BaseText';
const BaseButton = (props) => {
  const {
    onPress = () => {},
    children,
    textStyle,
    hasDefaultButtonText = true,
  } = props;
  const defaultTextStyle = {
    color: 'white',
    textAlign: 'center',
    // width: '80%',
  };
  const defaultButtonStyles = hasDefaultButtonText
    ? {
        mt: 'lg',
        block: true,
        rounded: 'circle',
        onPress: onPress,
        bg: 'grey',
      }
    : {};
  return (
    <Button {...defaultButtonStyles} {...props}>
      {hasDefaultButtonText && (
        <BaseText style={(textStyle, defaultTextStyle)}>
          {children}
        </BaseText>
      )}
      {!hasDefaultButtonText && {...children}}
    </Button>
  );
};
export default BaseButton;

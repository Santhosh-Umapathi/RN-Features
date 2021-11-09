import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

const TouchableButton = ({style, children, ...rest}) => {
  let TouchableComponent =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <TouchableComponent {...rest}>
      <View style={style}>{children}</View>
    </TouchableComponent>
  );
};

export default TouchableButton;

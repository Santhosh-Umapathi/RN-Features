import React from 'react';
import {Text} from 'react-native-magnus';
import {StyleSheet} from 'react-native';

import {textStyles} from '../utils/textStyle';
/**
 *
 * @param {*} variant  // bigTitle | h1 | h2 | h3 | headline | overline
 * @returns
 */
const BaseText = ({variant = 'normal', children, style}, props) => {
  let finalStyle = {
    ...textStyles[variant],
    ...style,
  };
  if (style instanceof Array) {
    finalStyle = StyleSheet.flatten(style);
    finalStyle = {
      ...textStyles[variant],
      ...finalStyle,
    };
  }

  return <Text style={finalStyle}>{children}</Text>;
};
export default BaseText;

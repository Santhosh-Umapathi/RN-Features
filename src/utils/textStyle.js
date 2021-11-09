import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {fonts} from './fonts';
const textStyles = StyleSheet.create({
  bigTitle: {
    fontFamily: fonts.extraBold,
    fontSize: 34,
    color: colors.mono.black,
  },
  h1: {
    fontFamily: fonts.normal,
    fontSize: 24,
    color: colors.mono.black,
  },
  h2: {
    fontFamily: fonts.normal,
    fontSize: 18,
    color: colors.mono.black,
  },
  h3: {
    fontFamily: fonts.normal,
    fontSize: 16,
    color: colors.mono.black,
  },
  headline: {
    fontFamily: fonts.semiBold,
    fontSize: 21,
    color: colors.mono.black,
    textTransform: 'capitalize',
  },
  overline: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.mono.black,
    textTransform: 'uppercase',
  },
  light: {
    fontFamily: fonts.light,
    fontSize: 14,
    color: colors.mono.black,
  },
  normal: {
    fontFamily: fonts.normal,
    fontSize: 14,
    color: colors.mono.black,
  },
  bold: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.mono.black,
  },
});
export {textStyles};

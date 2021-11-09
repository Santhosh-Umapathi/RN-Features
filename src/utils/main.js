import {
  useAccessibilityInfo,
  useClipboard,
} from '@react-native-community/hooks';
// const [data, setString] = useClipboard()
const {
  boldTextEnabled,
  screenReaderEnabled,
  reduceMotionEnabled, // requires RN60 or newer
  grayscaleEnabled, // requires RN60 or newer
  invertColorsEnabled, // requires RN60 or newer
  reduceTransparencyEnabled, // requires RN60 or newer
} = useAccessibilityInfo();

// console.log("loaded Accesibily details RN ---", {
//     boldTextEnabled,
//     screenReaderEnabled,
//     reduceMotionEnabled,
//     grayscaleEnabled,
//     invertColorsEnabled,
//     reduceMotionEnabled
// })

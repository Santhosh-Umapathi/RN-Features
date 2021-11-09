import React from 'react';
// import FastImage from 'react-native-fast-image'
import {Image} from 'react-native';
/**
 *
 * @param {*} resizeMode center | contain | cover | stretch
 * @returns
 */
const BaseImage = ({style, url, resizeMode = 'contain'}) => {
  return (
    <Image
      style={style}
      source={{
        uri: url,
        // headers: { Authorization: 'someAuthToken' },
        // priority: FastImage.priority.normal,
      }}
      resizeMode={resizeMode}
    />
  );
};

export default BaseImage;

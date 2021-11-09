import React from 'react';
import {View, StyleSheet} from 'react-native';

//Components
import PrimaryButton from '../../../components/PrimaryButton';

const BaseConent = ({onPress, title}) => {
  return (
    <View style={styles.baseContent}>
      <PrimaryButton type="primary" title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  baseContent: {
    width: '100%',
    zIndex: 9999999,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOne: {
    textAlign: 'center',
  },
});

export default BaseConent;

import React from 'react';
import {View, StyleSheet} from 'react-native';

//Components
import {BaseText} from '../../../components';
import PrimaryButton from '../../../components/PrimaryButton';
import TextLink from '../../../components/TextLink';

const BaseConent = ({onPress, title}) => {
  return (
    <View style={styles.baseContent}>
      <PrimaryButton
        type="primary"
        title={title + ' D.Ticketing'}
        onPress={onPress}
      />
      {/* <View style={styles.textContainer}>
        <BaseText style={styles.textOne}>
          {'Se non possiedi un account, '}
        </BaseText>
        <TextLink message="richiedilo ora." />
      </View> */}
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

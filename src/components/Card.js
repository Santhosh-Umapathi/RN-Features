import React, {memo} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import TouchableButton from '../components/TouchableButton';

const Card = ({
  id,
  title = '',
  icon = '',
  iconLarge = '',
  text = '',
  label = '',
  style = {},
  iconColor = '',
  onPress = () => {},
}) => {
  if (!id) return null;
  return (
    <View style={{...styles.cardContainer, ...style, shadowColor: iconColor}}>
      <TouchableButton onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.headText}>{title}</Text>
            <MaterialCommunityIcons name={icon} size={25} color={iconColor} />
          </View>

          <View style={styles.cardBody}>
            <MaterialCommunityIcons name={iconLarge} size={60} color="white" />
          </View>

          <View style={styles.cardFoot}>
            <Text style={styles.footText}>
              {text} {label}
            </Text>
          </View>
        </View>
      </TouchableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: 150,
    height: 150,
    justifyContent: 'space-between',
  },
  cardContainer: {
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    borderRadius: 10,
    margin: 10,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHead: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardFoot: {},
  headText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footText: {
    fontSize: 25,
    fontWeight: '600',
  },
});

export default memo(Card);

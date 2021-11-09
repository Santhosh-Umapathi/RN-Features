import React from 'react';
import {Text, Button, Div, Icon} from 'react-native-magnus';
import {fonts} from '../utils/fonts';
import {StyleSheet, View} from 'react-native';

const BaseCard = ({imgURL, hasOpacity = true}) => {
  return (
    <Button
      rounded={10}
      color="white"
      p="none"
      hasDefaultButtonText={false}
      mb="lg">
      <Div
        p="lg"
        flex={1}
        bg="red400"
        bgImg={{
          bgMode: 'cover',
          uri: imgURL,
        }}>
        {hasOpacity && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: 'rgba(0,0,0,.8)',
            }}
          />
        )}
        <Text color="white" fontSize="3xl" fontFamily={fonts.extraBold}>
          {'Base card title'}
        </Text>
        <Text color="white" fontSize="sm" mt="sm" opacity={0.9}>
          {
            'Card description, here a write something long that explaing the card info and maybe something else..'
          }
        </Text>
        <Div row mt="xl">
          <Text color="white">{'Call to action'}</Text>
          <Icon name="arrowright" color="white" ml="md" />
        </Div>
      </Div>
    </Button>
  );
};
export default BaseCard;

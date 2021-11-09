import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-magnus';
export default function BaseIcon({
  onPress = () => {},
  iconName = 'chevron-left',
  size = 35,
  color = 'blue400',
  withBorder = true,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      {withBorder && (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F1F1F1',
          }}>
          <Icon
            name={iconName}
            fontFamily="Feather"
            color={color}
            fontSize={size}
          />
        </View>
      )}
      {!withBorder && (
        <Icon
          name={iconName}
          fontFamily="Feather"
          color={color}
          fontSize={size}
        />
      )}
    </TouchableOpacity>
  );
}

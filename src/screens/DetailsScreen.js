import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FastlaneImage from '../components/FastlaneImage';
import MUIBackground from '../components/MUIComps/MUIBackground';
import {Ionicons} from '@expo/vector-icons';

const DetailsScreen = props => {
  const {navigation, route} = props;

  const {icon, color, t1, t2, t3} = route.params;

  const row = () => (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        height: 150,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: color,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: color,
              marginRight: 10,
            }}>
            <Ionicons name={icon} size={40} color="white" />
          </View>

          <View>
            <Text variant="h2" style={{fontSize: 20, color: 'white'}}>
              {t1}
            </Text>
            <Text
              variant="normal"
              style={{
                color: 'lightgrey',
                fontWeight: '500',
                fontSize: 16,
              }}>
              {t2}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20, color: 'white'}}>{t3}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <MUIBackground
        bg="#2B7BFF"
        bgAlt="#35BCD4"
        left
        navigation={navigation}
      />
      <FastlaneImage />

      <View style={styles.containerView}>
        {row()}
        {/* <Image
          source={require('../../assets/animation.gif')}
          style={styles.image}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default DetailsScreen;

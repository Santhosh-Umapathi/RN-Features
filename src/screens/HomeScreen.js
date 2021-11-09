import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Flatlist,
} from 'react-native';
import MUIBackground from '../components/MUIComps/MUIBackground';
import MuiBottomCard from '../components/MUIComps/MUIBottomCard';

// import Icon from 'react-native-vector-icons/dist/Ionicons';
import {Ionicons} from '@expo/vector-icons';
import FastlaneImage from '../components/FastlaneImage';
const HomeScreen = props => {
  const {navigation} = props;

  const Expenses = (t1, t2, t3) => (
    <View>
      <Text style={{color: '#A5A6AD', fontWeight: '500'}} variant="normal">
        {t1}
      </Text>
      <Text style={{color: 'white', fontWeight: 'bold'}} variant="h2">
        {t2}
        <Text style={{color: 'white', fontWeight: 'bold'}} variant="normal">
          {t3}
        </Text>
      </Text>
    </View>
  );

  const header = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
        marginHorizontal: 20,
      }}>
      <Text variant="h2">{'Today'}</Text>
      <Ionicons name="ios-stats-chart-outline" size={20} />
    </View>
  );

  const row = (icon, color, t1, t2, t3) => (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
            <Ionicons name={icon} size={15} color="white" />
          </View>

          <View>
            <Text variant="h2">{t1}</Text>
            <Text variant="normal" style={{color: 'grey', fontWeight: '500'}}>
              {t2}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text>{t3}</Text>
          <Ionicons
            name="ios-arrow-forward-circle-sharp"
            size={20}
            color="black"
            style={{marginHorizontal: 10}}
          />
        </View>
      </View>
    </View>
  );

  return (
    <>
      <MUIBackground bg="#2B7BFF" bgAlt="#35BCD4" right />

      <FastlaneImage />

      <MuiBottomCard
        bg="#0A0211"
        shadowBg="#0A0211"
        height={'50%'}
        dur={1000}
        del={500}>
        <View style={styles.bottomCardOne}>
          {Expenses('Income', '$ 3245.', '32')}
          {Expenses('', '|', '')}
          {Expenses('Spent', '$ 1264.', '32')}
        </View>
      </MuiBottomCard>

      <MuiBottomCard bg="white" height={'35%'} dur={1000} del={800}>
        <View style={styles.bottomCardTwo}>
          {header}

          {row('cafe-outline', 'orange', 'Cafe', '15 Transactions', '$15')}
          {row('tv-outline', 'red', 'Netflix', '5 Transactions', '$50')}
        </View>
      </MuiBottomCard>
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomCardOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomCardTwo: {
    justifyContent: 'space-around',
  },
});

export default HomeScreen;

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, RefreshControl, View} from 'react-native';

import {Card} from '../components';

const Dashboard = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const pageBoxes = [
    {
      id: 'Height',
      title: 'Height',
      icon: 'human-male-height',
      iconLarge: 'chart-gantt',
      text: 186,
      label: 'cms',
      style: {backgroundColor: 'peachpuff'},
      iconColor: 'brown',
      saveData: () => {},
    },
    {
      id: 'Weight',
      title: 'Weight',
      icon: 'weight-lifter',
      iconLarge: 'chart-bell-curve',
      text: 78,
      label: 'Kgs',
      style: {backgroundColor: 'lavender'},
      iconColor: 'indigo',
      saveData: () => {},
    },
    Platform.OS === 'android'
      ? {}
      : {
          id: 'Body Fat',
          title: 'Body Fat',
          icon: 'account-convert',
          iconLarge: 'chart-sankey',
          text: 15,
          label: '%',
          style: {backgroundColor: 'lightpink'},
          iconColor: 'maroon',
          saveData: () => {},
        },
  ];

  const cardPressHandler = index => {
    navigation.navigate('DashboardDetails', {...pageBoxes[index]});
  };

  const renderBoxes = () => {
    return pageBoxes.map((item, index) => (
      <Card key={index} {...item} onPress={() => cardPressHandler(index)} />
    ));
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ScrollView
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {}}
            tintColor={'orange'}
          />
        }>
        <View style={{flex: 1, margin: 5}}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            {renderBoxes()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

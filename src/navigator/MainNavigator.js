import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Screens
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2B7BFF',
          },
          headerTintColor: 'lightgrey',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{headerLargeTitle: true}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainNavigator;

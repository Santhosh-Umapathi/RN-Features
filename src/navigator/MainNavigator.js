import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {CardStyleInterpolators} from '@react-navigation/stack';
//Screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import RegisterOperatorScreen from '../screens/report/RegisterOperatorScreen';
import ReportOperatorScreen from '../screens/report/ReportOperatorScreen';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

//Context
import {AppContext} from '../context';
import CustomerSelectScreen from '../screens/CustomerSelect/CustomerSelectScreen';

const Stack = createNativeStackNavigator();
const StackDash = createNativeStackNavigator();

const defaultScreenOptions = {
  statusBarAnimation: false,
  stackPresentation: 'modal',
  headerTitleStyle: {
    fontFamily: 'Nunito_700Bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'Nunito_700Bold',
  },
  headerBackTitle: '',
  headerLargeTitle: true,
  headerLargeTitleStyle: {
    fontFamily: 'Nunito_700Bold',
  },
};

const noHeaderOptions = {
  headerShown: false,
  gestureEnabled: true,
  headerStatusBarHeight: 0,
  safeAreaInsets: {top: 0},
};

const MainNavigator = () => {
  const {isUserLoggedIn} = useContext(AppContext);
  const loginStack = (
    <Stack.Navigator>
      <Stack.Group screenOptions={noHeaderOptions}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );

  const dashboardNav = (
    <StackDash.Navigator
      screenOptions={{...noHeaderOptions}}
      initialRouteName="Cust">
      <StackDash.Screen name="Cust" component={CustomerSelectScreen} />
      <StackDash.Screen name="Dash" component={DashboardScreen} />
      <StackDash.Group screenOptions={{presentation: 'modal'}}>
        <StackDash.Screen
          name="RegisterOperator"
          component={RegisterOperatorScreen}
          options={{
            // cardStyleInterpolator: CardStyleInterpolators.forUIKit,
            presentation: 'formSheet',
          }}
        />
        <StackDash.Screen
          name="ReportOperator"
          component={ReportOperatorScreen}
          options={{
            presentation: 'formSheet',
          }}
        />
      </StackDash.Group>
    </StackDash.Navigator>
  );

  if (!isUserLoggedIn) {
    return loginStack;
  } else {
    return dashboardNav;
  }
};

export default MainNavigator;

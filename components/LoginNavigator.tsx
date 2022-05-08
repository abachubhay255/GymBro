import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './SignUp';
import Login from './auth/login';

export type LoginParamList = {
  Login: undefined;
  SignUp: undefined;
};

const {Navigator, Screen} = createStackNavigator();

const InnerNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Login" component={Login} />
    <Screen name="SignUp" component={SignUp} />
  </Navigator>
);

export default function LoginNavigator() {
  return (
    <NavigationContainer>
      <InnerNavigator />
    </NavigationContainer>
  );
}

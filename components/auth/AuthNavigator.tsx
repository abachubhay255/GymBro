import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';

export type AuthParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const {Navigator, Screen} = createStackNavigator();

const InnerNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUp" component={SignUp} />
  </Navigator>
);

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <InnerNavigator />
    </NavigationContainer>
  );
}

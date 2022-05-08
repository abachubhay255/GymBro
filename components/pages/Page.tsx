import React, {createContext, useContext, useState} from 'react';
import BottomTabs from '../BottomTabs';
import Home from './Home';
import MessagesNavigator from './messages/MessagesNavigator';
import Notifications from './Notifications';
import Workouts from './Workouts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

export default function Page({navigation}: any) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <BottomTabs {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Messages" component={MessagesNavigator} />
    </Tab.Navigator>
  );
}

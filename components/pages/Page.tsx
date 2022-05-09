import React from 'react';
import BottomTabs from '../BottomTabs';
import Home from './Home';
import MessagesNavigator from './messages/MessagesNavigator';
import Notifications from './Notifications';
import Workouts from './Workouts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function Page({navigation}: any) {
  const Tab = createBottomTabNavigator();

  //use context to pass in overriding navigators

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Messages" component={MessagesNavigator} />
    </Tab.Navigator>
  );
}

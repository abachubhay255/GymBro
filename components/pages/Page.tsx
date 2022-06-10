import React from 'react';
import BottomTabs from '../BottomTabs';
import Feed from './home/Feed';
import NotificationsList from './notifications/NotificationsList';
import ExploreWorkouts from './workouts/ExploreWorkouts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getTabBar} from '../utils/getTabBar';
import WorkoutsNavigator from './workouts/WorkoutsNavigator';
import NotificationsNavigator from './notifications/NotificationsNavigator';
import {HomeNavigator, MessagesNavigator} from './Navigation';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export default function Page() {
  const Tab = createBottomTabNavigator();

  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        tabBar={props => getTabBar({...props})}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Workouts" component={WorkoutsNavigator} />
        <Tab.Screen name="Notifications" component={NotificationsNavigator} />
        <Tab.Screen name="Messages" component={MessagesNavigator} />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavBar from '../../NavBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import NotificationsList from './NotificationsList';
import Notification from './Notification';

export type NotificationsParamList = {
  NotificationsList: undefined;
  Notification: undefined;
};

const {Navigator, Screen} = createStackNavigator();

export default function NotificationsNavigator() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Navigator>
      <Screen
        options={{
          header: () => (
            <NavBar
              tabRoute={route}
              drawerNavigation={navigation.getParent()}
            />
          ),
        }}
        name="NotificationsList"
        component={NotificationsList}
      />
      <Screen name="Notification" component={Notification} />
    </Navigator>
  );
}

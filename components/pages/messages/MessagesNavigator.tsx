import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageList from './MessageList';
import Conversation from './conversation/Conversation';
import NavBar from '../../NavBar';
import {useNavigation, useRoute} from '@react-navigation/native';

export type MessagesParamList = {
  MessageList: undefined;
  Conversation: undefined;
};

const {Navigator, Screen} = createStackNavigator();

export default function MessagesNavigator() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Navigator
      screenOptions={{
        header: () => (
          <NavBar
            tabRoute={route}
            drawerNavigation={navigation.getParent()}
          />
        ),
      }}>
      <Screen name="MessageList" component={MessageList} />
      <Screen options={{headerShown: false}} name="Conversation" component={Conversation} />
    </Navigator>
  );
}

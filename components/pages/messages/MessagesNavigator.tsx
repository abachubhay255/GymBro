import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MessageList from './MessageList';
import Conversation from './conversation/Conversation';

export type MessagesParamList = {
  MessageList: undefined;
  Conversation: undefined;
};

const {Navigator, Screen} = createStackNavigator();

export default function MessagesNavigator() {
  return (
    <Navigator>
      <Screen name="MessageList" component={MessageList} />
      <Screen name="Conversation" component={Conversation} />
    </Navigator>
  );
}

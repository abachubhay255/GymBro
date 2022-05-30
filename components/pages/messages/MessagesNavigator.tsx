import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageList from './MessageList';
import Conversation from './conversation/Conversation';

export type MessagesParamList = {
  MessageList: undefined;
  Conversation: {username: string};
};

const {Navigator, Screen} = createStackNavigator<MessagesParamList>();

export default function MessagesNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="MessageList" component={MessageList} />
      <Screen name="Conversation" component={Conversation} />
    </Navigator>
  );
}

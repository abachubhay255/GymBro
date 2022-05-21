import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageList from './MessageList';
import Conversation from './conversation/Conversation';
import MessagesHeader from './MessagesHeader';
import Profile from '../profile/Profile';

export type MessagesParamList = {
  MessageList: undefined;
  Conversation: {username: string};
  Profile: {username: string};
};

const {Navigator, Screen} = createStackNavigator<MessagesParamList>();

export default function MessagesNavigator() {
  return (
    <Navigator>
      <Screen
        options={{headerShown: false}}
        name="MessageList"
        component={MessageList}
      />
      <Screen
        options={{header: props => <MessagesHeader {...props} />}}
        name="Conversation"
        component={Conversation}
      />
      <Screen name="Profile" options={{headerShown: false}} component={Profile} />
    </Navigator>
  );
}

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileHome from './ProfileHome';
import ProfileSettings from './profilesettings/ProfileSettings';
import Posts from './Posts';
import NewPost from '../home/NewPost';
import Conversation from '../messages/conversation/Conversation';

export type ProfileParamList = {
  ProfileHome: {username: string};
  ProfileSettings: undefined;
  Posts: {username: string; postIndex: number};
  NewPost: undefined;
  Conversation: {username: string};
};

const {Navigator, Screen} = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="ProfileHome" component={ProfileHome} />
      <Screen name="ProfileSettings" component={ProfileSettings} />
      <Screen name="Posts" component={Posts} />
      <Screen name="NewPost" component={NewPost} />
      <Screen name="Conversation" component={Conversation} />
    </Navigator>
  );
}

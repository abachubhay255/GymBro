import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import ProfileSettings from './profilesettings/ProfileSettings';
import Posts from './Posts';
import NewPost from '../post/NewPost';
import Likes from '../post/Likes';
import MessagesNavigator from '../messages/MessagesNavigator';
import HomeNavigator from '../home/HomeNavigator';
import PostNavigator from '../post/PostNavigator';

export type ProfileParamList = {
  Profile: {username: string};
  ProfileSettings: undefined;
  Message: {screen: string; params: {username: string}};
  Posts: {username: string; postIndex: number};
  Post: {screen: string; params?: Record<string, any>};
};

const {Navigator, Screen} = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Profile" component={Profile} />
      <Screen name="ProfileSettings" component={ProfileSettings} />
      <Screen name="Message" component={MessagesNavigator} />
      <Screen name="Posts" component={Posts} />
      <Screen name="Post" component={PostNavigator} />
    </Navigator>
  );
}

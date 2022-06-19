import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './home/Feed';
import Conversation from './messages/conversation/Conversation';
import MessageList from './messages/MessageList';
import Likes from './post/Likes';
import NewPost from './post/NewPost';
import Posts from './profile/Posts';
import Profile from './profile/Profile';
import ProfileSettings from './profile/profilesettings/ProfileSettings';
import Comments from './post/Comments';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import SentPost from './messages/conversation/SentPost';

export type ProfileParamList = {
  Profile: {username: string};
  ProfileSettings: undefined;
  Message: {screen: string; params: {username: string}};
  Posts: {username: string; postIndex: number};
  Post: {screen: string; params?: Record<string, any>};
};

export function ProfileNavigator() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <BottomSheetModalProvider>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Profile" component={Profile} />
        <Screen name="ProfileSettings" component={ProfileSettings} />
        <Screen name="Message" component={MessagesNavigator} />
        <Screen name="Posts" component={Posts} />
        <Screen name="Post" component={PostNavigator} />
      </Navigator>
    </BottomSheetModalProvider>
  );
}

export type PostParamList = {
  NewPost: undefined;
  Likes: {username: string; postId: number};
  Comments: {username: string; postId: number};
  UserProfile: {screen: string; params: {username: string}};
};

export function PostNavigator() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Likes" component={Likes} />
      <Screen name="Comments" component={Comments} />
      <Screen name="NewPost" component={NewPost} />
      <Screen name="UserProfile" component={ProfileNavigator} />
    </Navigator>
  );
}

export type MessagesParamList = {
  MessageList: undefined;
  Conversation: {username: string};
  SentPost: {username: string; postId: number};
  UserProfile: {screen: string; params: {username: string}};
  Post: {screen: string; params?: Record<string, any>};
};

export function MessagesNavigator() {
  const {Navigator, Screen} = createStackNavigator<MessagesParamList>();
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="MessageList" component={MessageList} />
      <Screen name="Conversation" component={Conversation} />
      <Screen name="SentPost" component={SentPost} />
      <Screen name="UserProfile" component={ProfileNavigator} />
      <Screen name="Post" component={PostNavigator} />
    </Navigator>
  );
}

export type HomeParamList = {
  Feed: undefined;
  Post: {screen: string; params?: Record<string, any>};
};

export function HomeNavigator() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Feed" component={Feed} />
      <Screen name="Post" component={PostNavigator} />
    </Navigator>
  );
}

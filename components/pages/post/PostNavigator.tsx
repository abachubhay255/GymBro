import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Likes from './Likes';
import NewPost from './NewPost';
import ProfileNavigator from '../profile/ProfileNavigator';
import Post from './Post';

export type PostParamList = {
  NewPost: undefined;
  Likes: {username: string; postId: number};
  UserProfile: {screen: string; params: {username: string}};
};

const {Navigator, Screen} = createStackNavigator();

export default function PostNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Likes" component={Likes} />
      <Screen name="NewPost" component={NewPost} />
      <Screen name="UserProfile" component={ProfileNavigator} />
    </Navigator>
  );
}

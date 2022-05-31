import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import NewPost from '../post/NewPost';
import Likes from '../post/Likes';

export type HomeParamList = {
  Feed: undefined;
  NewPost: undefined;
  Likes: {username: string; postId: number};
};

const {Navigator, Screen} = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Feed" component={Feed} />
      <Screen name="Likes" component={Likes} />
      <Screen name="NewPost" component={NewPost} />
    </Navigator>
  );
}

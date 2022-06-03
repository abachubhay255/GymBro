import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import PostNavigator from '../post/PostNavigator';

export type HomeParamList = {
  Feed: undefined;
  Post: {screen: string; params?: Record<string, any>};
};

const {Navigator, Screen} = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Feed" component={Feed} />
      <Screen name="Post" component={PostNavigator} />
    </Navigator>
  );
}

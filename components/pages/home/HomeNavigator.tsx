import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Feed from './Feed';
import NewPost from './NewPost';

export type HomeParamList = {
  Feed: undefined;
  NewPost: undefined;
};

const {Navigator, Screen} = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Feed" component={Feed} />
      <Screen name="NewPost" component={NewPost} />
    </Navigator>
  );
}

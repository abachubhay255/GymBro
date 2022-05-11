import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavBar from '../../NavBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import Feed from './Feed';
import NewPost from './NewPost';

export type HomeParamList = {
  Feed: undefined;
  NewPost: undefined;
};

const {Navigator, Screen} = createStackNavigator();

export default function HomeNavigator() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <Navigator>
      <Screen
        options={{
          header: () => (
            <NavBar
              tabRoute={route}
              drawerNavigation={navigation.getParent()}
            />
          ),
        }}
        name="Feed"
        component={Feed}
      />
      <Screen name="NewPost" component={NewPost} />
    </Navigator>
  );
}

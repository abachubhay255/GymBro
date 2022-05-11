import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavBar from '../../NavBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import ExploreWorkouts from './ExploreWorkouts';
import Workout from './Workout';

export type WorkoutsParamList = {
  ExploreWorkouts: undefined;
  Workout: undefined;
};

const {Navigator, Screen} = createStackNavigator();

export default function WorkoutsNavigator() {
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
        name="ExploreWorkouts"
        component={ExploreWorkouts}
      />
      <Screen name="Workout" component={Workout} />
    </Navigator>
  );
}

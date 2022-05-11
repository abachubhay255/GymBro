import {StackScreenProps} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {WorkoutsParamList} from './WorkoutsNavigator';

type Props = StackScreenProps<WorkoutsParamList, 'ExploreWorkouts'>;

export default function ExploreWorkouts({navigation}: Props) {
  const WorkoutButton = () => (
    <Button
      accessoryRight={<Icon name="activity" />}
      onPress={() => navigation.navigate('Workout')}>
      Workout
    </Button>
  );
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Workouts</Text>
      <WorkoutButton />
    </Layout>
  );
}

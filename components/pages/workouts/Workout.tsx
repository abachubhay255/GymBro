import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkoutsParamList} from './WorkoutsNavigator';

type Props = StackScreenProps<WorkoutsParamList, 'Workout'>;

export default function Workout({navigation}: Props) {
  return (
    <Layout>
      <Text>Workout</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </Layout>
  );
}

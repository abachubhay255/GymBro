import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationsParamList} from './NotificationsNavigator';

type Props = StackScreenProps<NotificationsParamList, 'Notification'>;

export default function Notification({navigation}: Props) {
  return (
    <Layout>
      <Text>Notification</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </Layout>
  );
}

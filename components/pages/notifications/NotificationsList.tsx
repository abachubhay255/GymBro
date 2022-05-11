import {StackScreenProps} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {UserContext} from '../../../App';
import {NotificationsParamList} from './NotificationsNavigator';

type Props = StackScreenProps<NotificationsParamList, 'NotificationsList'>;

export default function NotificationsList({navigation}: Props) {
  const NotificationButton = () => (
    <Button
      accessoryRight={<Icon name="bell" />}
      onPress={() => navigation.navigate('Notification')}>
      Notification
    </Button>
  );
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">Notifications</Text>
      <NotificationButton />
    </Layout>
  );
}

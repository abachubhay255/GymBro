import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {UserContext} from '../../App';

export default function Notifications() {
  const {user, setUser} = useContext(UserContext);
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">Notifications</Text>
    </Layout>
  );
}

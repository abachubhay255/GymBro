import React, {useContext} from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {UserContext} from '../../App';

export default function Settings({navigation}: any) {
  const {setUser} = useContext(UserContext);

  const LogoutButton = () => (
    <Button
      appearance="outline"
      status="danger"
      accessoryRight={<Icon name="log-out" />}
      onPress={() => setUser(undefined)}>
      Logout
    </Button>
  );
  return (
    <Layout>
      <Text>Settings</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
      <LogoutButton />
    </Layout>
  );
}

import {Button, Icon, Layout} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {Text} from 'react-native';
import {UserContext} from '../../App';

export default function Workouts() {
  const {user, setUser} = useContext(UserContext);

  const LogoutButton = () => (
    <Button
      accessoryRight={<Icon name="log-out" />}
      onPress={() => setUser(undefined)}>
      Logout
    </Button>
  );
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LogoutButton />
      <Text>Workouts</Text>
    </Layout>
  );
}
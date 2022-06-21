import React, {useContext} from 'react';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {UserContext} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}: any) {
  const {setUser} = useContext(UserContext);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      setUser(undefined);
    } catch (e) {
      throw new Error('error removing from async storage');
    }

    console.log('Logged out');
  };

  const LogoutButton = () => (
    <Button
      appearance="outline"
      status="danger"
      accessoryRight={<Icon name="log-out" />}
      onPress={logout}>
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

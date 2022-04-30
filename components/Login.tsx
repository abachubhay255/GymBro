import {Button, Icon} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {Text} from 'react-native';
import {User, UserContext} from '../App';

export default function Login() {
  const {setUser} = useContext(UserContext);
  const LoginButton = () => (
    <Button
      accessoryLeft={<Icon name="facebook" />}
      onPress={() => setUser({username: 'akhil.bach', password: 'password'})}>
      Login with Facebook
    </Button>
  );
  return <LoginButton />;
}

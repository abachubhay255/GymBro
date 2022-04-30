import {Button, Icon, Layout} from '@ui-kitten/components';
import React from 'react';
import {Text} from 'react-native';

export default function Home() {
  const LoginButton = () => (
    <Button accessoryLeft={<Icon name="facebook" />}>
      Login with Facebook
    </Button>
  );
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HOME</Text>
      <LoginButton />
    </Layout>
  );
}

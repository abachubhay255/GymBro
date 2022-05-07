import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';

export default function Profile({navigation}: any) {
  return (
    <Layout>
      <Text>Profile</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </Layout>
  );
}

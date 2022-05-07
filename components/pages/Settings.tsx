import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';

export default function Settings({navigation}: any) {
  return (
    <Layout>
      <Text>Settings</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </Layout>
  );
}

import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

export default function NewPost() {
  const navigation = useNavigation();
  return (
    <Layout>
      <Text>New Post</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </Layout>
  );
}

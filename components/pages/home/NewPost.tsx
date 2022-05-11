import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeParamList} from './HomeNavigator';

type Props = StackScreenProps<HomeParamList, 'NewPost'>;

export default function NewPost({navigation}: Props) {
  return (
    <Layout>
      <Text>New Post</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </Layout>
  );
}

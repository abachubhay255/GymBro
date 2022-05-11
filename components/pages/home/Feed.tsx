import {StackScreenProps} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {HomeParamList} from './HomeNavigator';

type Props = StackScreenProps<HomeParamList, 'Feed'>;

export default function Feed({navigation}: Props) {
  const NewPostButton = () => (
    <Button
      accessoryRight={<Icon name="plus-circle" />}
      onPress={() => navigation.navigate('NewPost')}>
      New Post
    </Button>
  );

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <NewPostButton />
      <Text>Home</Text>
    </Layout>
  );
}

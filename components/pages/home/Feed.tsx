import {StackScreenProps} from '@react-navigation/stack';
import {Button, Icon, Layout, List, Text} from '@ui-kitten/components';
import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {Users} from '../../data/users';
import {HomeParamList} from './HomeNavigator';
import Post, {PostType} from './Post';

type Props = StackScreenProps<HomeParamList, 'Feed'>;

const posts: PostType[] = Users.map(u => u.data.posts).flat();

export default function Feed({navigation}: Props) {
  const NewPostButton = () => (
    <Button
      accessoryRight={<Icon name="plus-circle" />}
      onPress={() => navigation.navigate('NewPost')}>
      New Post
    </Button>
  );

  const renderPostItem = ({
    item,
  }: ListRenderItemInfo<PostType>): React.ReactElement => <Post post={item} />;

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <NewPostButton /> */}
      <List data={posts} renderItem={renderPostItem} />
    </Layout>
  );
}

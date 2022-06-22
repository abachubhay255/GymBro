import {StackScreenProps} from '@react-navigation/stack';
import {Button, Icon, Layout, List, Text} from '@ui-kitten/components';
import React, {LegacyRef, RefObject, useContext, useRef} from 'react';
import {ListRenderItemInfo, Pressable} from 'react-native';
import {Users} from '../../data/users';
import {PostsContext} from '../../DataContext';
import {CurrentUserContext} from '../../Main';
import NavBar from '../../NavBar';
import {HomeParamList} from '../Navigation';
import Post, {PostType} from '../post/Post';

type Props = StackScreenProps<HomeParamList, 'Feed'>;

export default function Feed({route, navigation}: Props) {
  const {currentUser} = useContext(CurrentUserContext);
  const {postData} = useContext(PostsContext);
  const posts: PostType[] = Users.map(u =>
    u.username === currentUser.username ? postData : u.data.posts,
  )
    .flat()
    .sort(() => Math.random() - 0.5);

  const listRef: RefObject<any> = useRef();
  const NewPostButton = () => (
    <Button
      accessoryRight={<Icon name="plus-circle" />}
      onPress={() =>
        navigation && navigation.push('Post', {screen: 'NewPost'})
      }>
      New Post
    </Button>
  );

  const renderPostItem = ({
    item,
  }: ListRenderItemInfo<PostType>): React.ReactElement => <Post post={item} />;

  return (
    <>
      <Pressable onPress={() => listRef.current.scrollToIndex({index: 0})}>
        <NavBar
          tabRoute={{name: 'Home'}}
          drawerNavigation={navigation.getParent()}
        />
      </Pressable>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <NewPostButton /> */}
        <List ref={listRef} data={posts} renderItem={renderPostItem} />
      </Layout>
    </>
  );
}

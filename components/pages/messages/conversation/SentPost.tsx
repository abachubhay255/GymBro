import {StackScreenProps} from '@react-navigation/stack';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {useUser} from '../../../hooks/useUser';
import {MessagesParamList} from '../../Navigation';
import Post from '../../post/Post';
import {BackIcon} from '../../profile/extra/icons';

type Props = StackScreenProps<MessagesParamList, 'SentPost'>;

export default function SentPost({route, navigation}: Props) {
  const post = useUser(route.params.username).data.posts[route.params.postId];
  const onBackButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );
  return (
    <>
      <TopNavigation
        accessoryLeft={BackAction}
        title={() => <Text style={{fontWeight: 'bold'}}>Post</Text>}
        alignment="center"
      />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Post post={post} />
      </Layout>
    </>
  );
}

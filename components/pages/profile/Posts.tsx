import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Layout,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useUser} from '../../hooks/useUser';
import Post, {PostType, POST_HEIGHT} from '../post/Post';
import {BackIcon} from './extra/icons';
import {ProfileParamList} from './ProfileNavigator';

type Props = StackScreenProps<ProfileParamList, 'Posts'>;

export default function Posts({route, navigation}: Props) {
  const posts = useUser(route.params?.username ?? '').data.posts;
  const postIndex = route.params?.postIndex ?? 0;
  const renderPostItem = ({
    item,
  }: ListRenderItemInfo<PostType>): React.ReactElement => <Post post={item} />;

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
        title={() => <Text style={{fontWeight: 'bold'}}>Posts</Text>}
        alignment="center"
      />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <List
          getItemLayout={(_, index) => ({
            length: POST_HEIGHT,
            offset: POST_HEIGHT * index,
            index,
          })}
          initialScrollIndex={postIndex}
          data={posts}
          renderItem={renderPostItem}
        />
      </Layout>
    </>
  );
}

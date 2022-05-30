import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Layout,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useUser} from '../../hooks/useUser';
import Post, {PostType, POST_HEIGHT} from '../home/Post';
import {BackIcon} from './extra/icons';
import {ProfileParamList} from './ProfileNavigator';

export default function Posts() {
  const navigation = useNavigation<NavigationProp<ProfileParamList>>();
  const route = useRoute<RouteProp<ProfileParamList>>();
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
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TopNavigation accessoryLeft={BackAction} />
      <List
        getItemLayout={(data, index) => ({
          length: POST_HEIGHT,
          offset: POST_HEIGHT * index,
          index,
        })}
        initialScrollIndex={postIndex}
        data={posts}
        renderItem={renderPostItem}
      />
    </Layout>
  );
}

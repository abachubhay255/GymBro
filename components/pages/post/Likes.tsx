import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {useUser} from '../../hooks/useUser';
import {HomeParamList} from '../home/HomeNavigator';
import {BackIcon} from '../profile/extra/icons';
import {POST_HEIGHT} from './Post';

type Props = StackScreenProps<HomeParamList, 'Likes'>;

export default function Likes({navigation, route}: Props) {
  const User = useUser(route.params.username);
  const postId = route.params.postId;
  const likes = User.data.posts[postId].likes;
  const renderItemAccessory = (props: any) => (
    <Button size="small">FOLLOW</Button>
  );
  const renderItemIcon = (source: string) => <Avatar source={{uri: source}} />;
  const goToProfile = (username: string) => {
    if (navigation) {
      (navigation as any).navigate('Profile', {
        screen: 'ProfileHome',
        params: {
          username: username,
        },
      });
    }
  };
  const renderLikeItem = ({
    item,
  }: ListRenderItemInfo<string>): React.ReactElement => {
    const User = useUser(item);
    return (
      <ListItem
        title={User.firstName + ' ' + User.lastName}
        description={`@${User.username}`}
        accessoryLeft={() => renderItemIcon(User.data.profilePic)}
        accessoryRight={renderItemAccessory}
        onPress={() => goToProfile(User.username)}
      />
    );
  };

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
        title={() => <Text style={{fontWeight: 'bold'}}>Likes</Text>}
        alignment="center"
      />
      <List data={likes} renderItem={renderLikeItem} />
    </>
  );
}

import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {useUser} from '../../hooks/useUser';
import {HomeParamList} from '../home/HomeNavigator';
import {BackIcon} from '../profile/extra/icons';
import {POST_HEIGHT} from './Post';
import {PostParamList} from './PostNavigator';

type Props = StackScreenProps<PostParamList, 'Likes'>;

export default function Likes({navigation, route}: Props) {
  const User = useUser(route.params.username);
  const postId = route.params.postId;
  const likes = User.data.posts[postId].likes;

  const [searchedLikes, setSearchedLikes] = useState(likes);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    setSearchedLikes(
      likes.filter(username => {
        const User = useUser(username);
        return (
          User.firstName.toLowerCase().includes(normalizedQuery) ||
          User.lastName.toLowerCase().includes(normalizedQuery) ||
          username.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [searchQuery]);

  const renderItemAccessory = (props: any) => (
    <Button size="small">FOLLOW</Button>
  );
  const renderItemIcon = (source: string) => <Avatar source={{uri: source}} />;
  const goToProfile = (username: string) => {
    navigation &&
      navigation.push('UserProfile', {
        screen: 'Profile',
        params: {username: username},
      });
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
      <Layout>
        <Input
          style={styles.searchBar}
          status="control"
          size="small"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Layout>
      <List data={searchedLikes} renderItem={renderLikeItem} />
    </>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});

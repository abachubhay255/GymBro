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
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useUser} from '../../hooks/useUser';
import {formattedDate} from '../messages/utils';
import {PostParamList} from '../Navigation';
import {BackIcon} from '../profile/extra/icons';
import {Comment, POST_HEIGHT} from './Post';

type Props = StackScreenProps<PostParamList, 'Likes'>;

export default function Comments({navigation, route}: Props) {
  const User = useUser(route.params.username);
  const postId = route.params.postId;
  const post = User.data.posts[postId];
  const comments = User.data.posts[postId].comments;
  const caption = {
    username: User.username,
    timestamp: post.timestamp,
    text: post.caption,
  };

  const goToProfile = (username: string) => {
    navigation &&
      navigation.push('UserProfile', {
        screen: 'Profile',
        params: {username: username},
      });
  };

  const renderComment = (comment: Comment) => {
    const User = useUser(comment.username);
    return (
      <View style={styles.commentContainer}>
        <Avatar source={{uri: User.data.profilePic}} />
        <View style={styles.textContainer}>
          <Text>
            <Text
              style={styles.username}
              onPress={() => goToProfile(User.username)}>
              {User.username + ' '}
            </Text>
            <Text>{comment.text}</Text>
          </Text>
          <Text category="c2" appearance="hint">
            {formattedDate(comment.timestamp)}
          </Text>
        </View>
      </View>
    );
  };
  const renderCommentItem = ({
    item,
  }: ListRenderItemInfo<Comment>): React.ReactElement => renderComment(item);

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
        title={() => <Text style={{fontWeight: 'bold'}}>Comments</Text>}
        alignment="center"
      />
      <List
        style={styles.listContainer}
        ListHeaderComponent={
          <>
            {renderComment(caption)}
            <Divider />
          </>
        }
        data={comments}
        renderItem={renderCommentItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  username: {
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  textContainer: {
    paddingHorizontal: 5,
  },
});

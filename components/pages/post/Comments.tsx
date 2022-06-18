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
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {UserContext} from '../../../App';
import {Users} from '../../data/users';
import {useUser} from '../../hooks/useUser';
import {CurrentUserContext} from '../../Main';
import KeyboardAwareView from '../../utils/KeyboardAwareView';
import {PaperPlaneIcon} from '../messages/conversation/Icons';
import {formattedDate} from '../messages/utils';
import {PostParamList} from '../Navigation';
import {BackIcon} from '../profile/extra/icons';
import {POST_HEIGHT} from './Post';

export type Comment = {
  username: string;
  timestamp: Date;
  text: string;
};

type Props = StackScreenProps<PostParamList, 'Comments'>;

export default function Comments({navigation, route}: Props) {
  const styles = useStyleSheet(themedStyles);
  const {currentUser} = useContext(CurrentUserContext);
  const User = useUser(route.params.username);
  const postId = route.params.postId;
  const post = User.data.posts[postId];
  const [comments, setComments] = useState(User.data.posts[postId].comments);
  const [commentText, setCommentText] = useState('');
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
        <Pressable onPress={() => goToProfile(User.username)}>
          <Avatar source={{uri: User.data.profilePic}} />
        </Pressable>
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

  const onSendButtonPress = (): void => {
    setComments([
      {
        text: commentText,
        username: currentUser.username,
        timestamp: new Date(),
      },
      ...comments,
    ]);
    setCommentText('');
    Keyboard.dismiss();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );
  return (
    <KeyboardAwareView>
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
      <View style={styles.commentInputContainer}>
        <Input
          style={styles.commentInput}
          status="control"
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button
          style={styles.iconButton}
          accessoryLeft={PaperPlaneIcon as any}
          disabled={!(commentText && commentText.length > 0)}
          onPress={onSendButtonPress}
        />
      </View>
    </KeyboardAwareView>
  );
}

const themedStyles = StyleService.create({
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
  commentInput: {
    flex: 1,
  },
  iconButton: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: 'background-basic-color-1',
  },
});

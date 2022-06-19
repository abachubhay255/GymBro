import React from 'react';
import {Image, Pressable, StyleSheet, View, ViewProps} from 'react-native';
import {Avatar, Text, useStyleSheet} from '@ui-kitten/components';
import {MessageType} from './Message';
import Post from '../../post/Post';
import {useUser} from '../../../hooks/useUser';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MessagesParamList} from '../../Navigation';
// @ts-ignore
interface MessageContentProps extends ViewProps {
  children: MessageType;
}
export default function MessageContent({
  style,
  children,
  ...viewProps
}: MessageContentProps) {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation<StackNavigationProp<MessagesParamList>>();

  const renderPost = (): React.ReactElement => {
    if (children.post) {
      const post = children.post;
      const postOwner = useUser(children.post.username);
      const postId = postOwner.data.posts.findIndex(p => p === post);
      const proPic = postOwner.data.profilePic;
      return (
        <Pressable
          onPress={() =>
            navigation &&
            navigation.push('SentPost', {
              username: post.username,
              postId: postId,
            })
          }>
          <View style={[style, styles.postContainer]}>
            <View style={styles.postHeader}>
              <Avatar style={styles.postProPic as any} source={{uri: proPic}} />
              <Text style={styles.mainText} status="control">
                {post.username}
              </Text>
            </View>
            <Image
              style={styles.postImage as any}
              source={{uri: post.photos[0]}}
            />
            <Text style={styles.postFooter}>
              <Text style={styles.mainText}>{post.username + ' '}</Text>
              <Text>{post.caption}</Text>
            </Text>
          </View>
        </Pressable>
      );
    }
    return <Text>Post Unavailable</Text>;
  };

  const renderAttachment = (): React.ReactElement => (
    <Image
      style={styles.attachmentImage as any}
      source={{uri: children.attachment}}
    />
  );

  const renderText = (): React.ReactElement => (
    <Text style={styles.text} status="control">
      {children.text}
    </Text>
  );

  return (
    <>
      {children.post ? (
        renderPost()
      ) : (
        <View
          {...viewProps}
          style={[
            styles.container,
            style,
            children.attachment
              ? styles.attachmentContainer
              : styles.textContainer,
          ]}>
          {children.text && renderText()}
          {children.attachment && renderAttachment()}
        </View>
      )}
    </>
  );
}

const themedStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 48,
    minWidth: 48,
    maxWidth: 276,
  },
  textContainer: {
    borderRadius: 100,
  },
  attachmentContainer: {
    borderRadius: 10,
  },
  postContainer: {
    borderRadius: 10,
    backgroundColor: 'color-basic-600',
    maxWidth: 300,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  postProPic: {
    marginRight: 10,
  },
  postImage: {
    width: 300,
    height: 400,
  },
  postFooter: {
    padding: 10,
  },
  text: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  attachmentImage: {
    width: 124,
    height: 124,
  },
  mainText: {
    fontWeight: 'bold',
  },
});

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Avatar, Card, Icon, Text, useTheme} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {Image, Pressable, StyleSheet, View, ViewProps} from 'react-native';
import {User, UserContext} from '../../../App';
import {useUser} from '../../hooks/useUser';
import {formattedDate} from '../messages/utils';
import {HomeParamList, ProfileParamList} from '../Navigation';

export const POST_HEIGHT = 625;

export type Comment = {
  username: string;
  timestamp: Date;
  text: string;
};

export type PostType = {
  username: string;
  timestamp: Date;
  caption: string;
  likes: string[];
  comments: Comment[];
  photos: string[];
  location?: string;
  tags?: string[];
};

type Props = {
  post: PostType;
};

export default function Post({post}: Props) {
  const navigation =
    useNavigation<StackNavigationProp<HomeParamList | ProfileParamList>>();
  const user = useContext(UserContext).user as User;
  const postOwner = useUser(post.username);
  const theme = useTheme();

  const goToProfile = () => {
    navigation &&
      navigation.push('Post', {
        screen: 'UserProfile',
        params: {screen: 'Profile', params: {username: post.username}},
      });
  };

  const goToLikes = () => {
    navigation &&
      navigation.push('Post', {
        screen: 'Likes',
        params: {
          username: post.username,
          postId: postOwner.data.posts.findIndex(p => p === post),
        },
      });
  };

  const goToComments = () => {
    navigation &&
      navigation.push('Post', {
        screen: 'Comments',
        params: {
          username: post.username,
          postId: postOwner.data.posts.findIndex(p => p === post),
        },
      });
  };

  const Header = (props: ViewProps | undefined) => (
    <Pressable onPress={goToProfile}>
      <View {...props} style={styles.heading}>
        <Avatar
          source={{
            uri: postOwner.data.profilePic,
          }}
        />

        <View style={styles.user}>
          <Text category="p1" style={styles.mainText}>
            {postOwner.username}
          </Text>
          {post.location && (
            <Text category="p2" appearance="hint">
              {post.location}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );

  const Footer = (props: ViewProps | undefined) => {
    const [likes, setLikes] = useState(post.likes);
    const likedByMe = likes.includes(user?.username);

    return (
      <View style={styles.footerContainer}>
        <View {...props} style={styles.rows}>
          <Pressable
            onPress={() =>
              setLikes(
                likedByMe
                  ? likes.filter(l => l !== user.username)
                  : [...likes, user.username],
              )
            }>
            <Icon
              style={styles.icon}
              fill={likedByMe ? '#ED4956' : theme['text-basic-color']}
              name={likedByMe ? 'heart' : 'heart-outline'}
            />
          </Pressable>
          <Pressable onPress={goToComments}>
            <Icon
              style={[styles.icon, {marginHorizontal: 15}]}
              fill={theme['text-basic-color']}
              name="message-circle-outline"
            />
          </Pressable>

          <Icon
            style={styles.icon}
            fill={theme['text-basic-color']}
            name="paper-plane-outline"
          />
        </View>
        <Text category="p1" style={styles.mainText} onPress={goToLikes}>
          {likes.length.toLocaleString() + ' likes'}
        </Text>
        <Text>
          <Text style={styles.mainText} onPress={goToProfile}>
            {post.username + ' '}
          </Text>
          <Text>{post.caption}</Text>
        </Text>

        <Text onPress={goToComments} category="p2" appearance="hint">
          {'View all ' + post.comments.length.toLocaleString() + ' comments'}
        </Text>
        <Text category="c1" appearance="hint">
          {formattedDate(post.timestamp)}
        </Text>
      </View>
    );
  };

  return (
    <Card
      appearance="filled"
      style={styles.card}
      header={Header}
      footer={Footer}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={styles.postItem}
          source={{uri: post.photos[0]}}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: POST_HEIGHT,
    width: 390,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  footerContainer: {
    marginHorizontal: 10,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  imageContainer: {
    backgroundColor: 'yellow',
    marginVertical: -16,
    marginHorizontal: -32,
    height: 450,
  },
  postItem: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 10,
  },
  mainText: {
    fontWeight: 'bold',
  },
});

import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Avatar,
  Button,
  Card,
  Icon,
  Text,
  TranslationWidth,
  useTheme,
} from '@ui-kitten/components';
import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {useUser} from '../../hooks/useUser';
import {formattedDate} from '../messages/utils';
import {getFormattedFollowers} from '../profile/utils';

export const POST_HEIGHT = 625;

export type Comment = {
  username: string;
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
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const postOwner = useUser(post.username);
  const theme = useTheme();

  const goToProfile = () => {
    if (navigation) {
      if (route.name === 'Feed') {
        navigation.navigate('Profile', {
          screen: 'ProfileHome',
          params: {username: post.username},
        });
      } else {
        navigation.push('ProfileHome', {username: post.username});
      }
    }
  };

  const goToLikes = () => {
    if (navigation) {
      navigation.push('Likes', {
        username: post.username,
        postId: postOwner.data.posts.findIndex(p => p === post),
      });
    }
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

  const Footer = (props: ViewProps | undefined) => (
    <View style={styles.footerContainer}>
      <View {...props} style={styles.rows}>
        <Icon
          style={styles.icon}
          fill={theme['text-basic-color']}
          name="heart-outline"
        />
        <Icon
          style={[styles.icon, {marginHorizontal: 15}]}
          fill={theme['text-basic-color']}
          name="message-circle-outline"
        />
        <Icon
          style={styles.icon}
          fill={theme['text-basic-color']}
          name="paper-plane-outline"
        />
      </View>
      <Text category="p1" style={styles.mainText} onPress={goToLikes}>
        {post.likes.length.toLocaleString() + ' likes'}
      </Text>
      <View style={styles.rows}>
        <Text onPress={goToProfile} category="p1" style={styles.mainText}>
          {post.username}
        </Text>
        <Text style={{paddingHorizontal: 5}} category="p2">
          {post.caption}
        </Text>
      </View>
      <Text category="p2" appearance="hint">
        {'View all ' + post.comments.length.toLocaleString() + ' comments'}
      </Text>
      <Text category="c1" appearance="hint">
        {formattedDate(post.timestamp)}
      </Text>
    </View>
  );

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

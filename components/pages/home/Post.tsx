import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  Text,
  TranslationWidth,
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

export type PostType = {
  username: string;
  timestamp: Date;
  caption: string;
  likes: number;
  comments: number;
  photos: string[];
  location?: string;
  tags?: string[];
};

type Props = {
  post: PostType;
};

export default function Post({post}: Props) {
  const navigation = useNavigation<NavigationProp<any>>();
  const postOwner = useUser(post.username);
  const Header = (props: ViewProps | undefined) => (
    <View {...props} style={styles.heading}>
      <Pressable
        onPress={() =>
          navigation.navigate('Profile', {username: postOwner.username})
        }>
        <Avatar
          source={{
            uri: postOwner.data.profilePic,
          }}
        />
      </Pressable>
      <View style={styles.user}>
        <Text category="p1">{postOwner.username}</Text>
        {post.location && (
          <Text category="p2" appearance="hint">
            {post.location}
          </Text>
        )}
      </View>
    </View>
  );

  const Footer = (props: ViewProps | undefined) => (
    <View style={styles.footerContainer}>
      <View {...props} style={styles.rows}>
        <Button
          style={styles.icon}
          appearance="ghost"
          status="control"
          accessoryLeft={<Icon name="heart-outline" />}
        />
        <Button
          style={styles.icon}
          appearance="ghost"
          status="control"
          accessoryLeft={<Icon name="message-circle-outline" />}
        />
        <Button
          style={styles.icon}
          appearance="ghost"
          status="control"
          accessoryLeft={<Icon name="paper-plane-outline" />}
        />
      </View>
      <Text category="s1">{post.likes + ' likes'}</Text>
      <View style={styles.rows}>
        <Text category="p1">{post.username}</Text>
        <Text style={{paddingHorizontal: 10}} category="p2">
          {post.caption}
        </Text>
      </View>
      <Text category="p2" appearance="hint">
        {'View all ' + post.comments + ' comments'}
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
    margin: 1,
    height: 625,
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
    width: 32,
    height: 32,
  },
});

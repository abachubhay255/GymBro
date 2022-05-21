import React from 'react';
import {
  ImageBackground,
  ListRenderItemInfo,
  LogBox,
  ScrollView,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Layout,
  List,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {ProfileSocial} from './extra/profile-social.component';
import {BackIcon, MessageCircleIcon, PersonAddIcon} from './extra/icons';
import {Post, Profile as OldProfile} from './extra/data';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useUser} from '../../hooks/useUser';

const profile: OldProfile = OldProfile.helenKuper();

const posts: Post[] = [
  Post.plant1(),
  Post.travel1(),
  Post.style1(),
  Post.style1(),
  Post.plant1(),
  Post.travel1(),
  Post.travel1(),
  Post.style1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
  Post.plant1(),
];

export default function Profile() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const User = useUser(route.params?.username);
  const styles = useStyleSheet(themedStyles);

  const onBackButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onMessageButtonPress = (): void => {
    navigation &&
      navigation.navigate('Conversation', {username: User.username});
  };

  const renderPostItem = (
    info: ListRenderItemInfo<Post>,
  ): React.ReactElement => (
    <ImageBackground
      style={styles.postItem}
      source={{uri: User.data.profilePic}}
    />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        appearance="control"
        alignment="center"
        accessoryLeft={BackAction}
        title="Profile"
      />
      <ScrollView>
        <ImageOverlay
          style={styles.header as any}
          source={require('./assets/image-background.jpg')}>
          <Avatar
            style={styles.profileAvatar as any}
            source={{uri: User.data.profilePic}}
          />
          <Text style={styles.profileName} category="h5" status="control">
            {User.firstName + ' ' + User.lastName}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={styles.location} status="control">
              {'@' + User.username}
            </Text>
          </View>
          <View style={styles.profileButtonsContainer}>
            <Button
              style={styles.profileButton}
              accessoryLeft={PersonAddIcon as any}
              onPress={onBackButtonPress}>
              FOLLOW
            </Button>
            <Button
              style={styles.profileButton}
              status="control"
              accessoryLeft={MessageCircleIcon as any}
              onPress={onMessageButtonPress}>
              MESSAGE
            </Button>
          </View>
          <View style={styles.socialsContainer}>
            <ProfileSocial
              style={styles.profileSocial}
              hint="Followers"
              value={`${profile.followers}`}
            />
            <ProfileSocial
              style={styles.profileSocial}
              hint="Following"
              value={`${profile.following}`}
            />
            <ProfileSocial
              style={styles.profileSocial}
              hint="Posts"
              value={`${profile.posts}`}
            />
          </View>
        </ImageOverlay>
        <Text style={styles.sectionLabel} category="s1">
          Bio
        </Text>
        <Text style={styles.profileDescription} appearance="hint">
          {profile.description}
        </Text>
        <Text style={styles.sectionLabel} category="s1">
          Posts
        </Text>
        <List data={posts} numColumns={3} renderItem={renderPostItem} />
      </ScrollView>
    </Layout>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    marginVertical: 16,
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: 'row',
    width: '75%',
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  },
  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
});

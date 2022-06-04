import React, {useContext, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  ListRenderItemInfo,
  LogBox,
  Pressable,
  ScrollView,
  StyleSheet,
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
import {
  AddIcon,
  BackIcon,
  EditIcon,
  MessageCircleIcon,
  PersonAddIcon,
} from './extra/icons';
import {useUser} from '../../hooks/useUser';
import {getFormattedFollowers} from './utils';
import {UserContext} from '../../../App';
import {PostType} from '../post/Post';
import {StackScreenProps} from '@react-navigation/stack';
import { ProfileParamList } from '../Navigation';

type Props = StackScreenProps<ProfileParamList, 'Profile'>;

export default function Profile({route, navigation}: Props) {
  const {user} = useContext(UserContext);
  const User = useUser(route.params?.username);
  const styles = useStyleSheet(themedStyles);

  const scrolling = useRef(new Animated.Value(0)).current;
  const navbarHeight = scrolling.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });

  const onBackButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onMessageButtonPress = (): void => {
    navigation &&
      navigation.push('Message', {
        screen: 'Conversation',
        params: {username: User.username},
      });
  };

  const onEditButtonPress = (): void => {
    navigation && navigation.navigate('ProfileSettings');
  };

  const onNewPostButtonPress = (): void => {
    navigation &&
      navigation.push('Post', {
        screen: 'NewPost',
      });
  };

  const onPostPress = (postIndex: number): void => {
    navigation &&
      navigation.push('Posts', {
        username: User.username,
        postIndex: postIndex,
      });
  };

  const renderPostItem = (
    info: ListRenderItemInfo<PostType>,
  ): React.ReactElement => (
    <Pressable
      style={styles.postContainer}
      onPress={() => onPostPress(info.index)}>
      <ImageBackground
        style={styles.postItem}
        source={{uri: info.item.photos[0]}}
      />
    </Pressable>
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );

  return (
    <Layout style={styles.container}>
      <Animated.View style={{height: navbarHeight}}>
        <TopNavigation accessoryLeft={BackAction} />
      </Animated.View>
      <List
        ListHeaderComponent={
          <>
            <ImageOverlay style={{}} source={{uri: User.data.profileBanner}}>
              <TopNavigation accessoryLeft={BackAction} appearance="control" />
              <View style={styles.header as any}>
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
                  {user?.username === User.username ? (
                    <>
                      <Button
                        style={styles.profileButton}
                        accessoryRight={AddIcon as any}
                        onPress={onNewPostButtonPress}>
                        NEW POST
                      </Button>
                      <Button
                        style={styles.profileButton}
                        status="control"
                        accessoryRight={EditIcon as any}
                        onPress={onEditButtonPress}>
                        EDIT
                      </Button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </View>
                <View style={styles.socialsContainer}>
                  <ProfileSocial
                    style={styles.profileSocial}
                    hint="Followers"
                    value={`${getFormattedFollowers(User.data.followers)}`}
                  />
                  <ProfileSocial
                    style={styles.profileSocial}
                    hint="Following"
                    value={`${getFormattedFollowers(User.data.following)}`}
                  />
                  <ProfileSocial
                    style={styles.profileSocial}
                    hint="Posts"
                    value={`${User.data.posts.length}`}
                  />
                </View>
              </View>
            </ImageOverlay>
            <Text style={styles.sectionLabel} category="s1">
              Bio
            </Text>
            <Text style={styles.profileDescription} appearance="hint">
              {User.data.bio}
            </Text>
            <Text style={styles.sectionLabel} category="s1">
              Posts
            </Text>
          </>
        }
        data={User.data.posts}
        numColumns={3}
        renderItem={renderPostItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
      />
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
  postContainer: {
    flex: 1,
    margin: 2,
  },
  postItem: {
    aspectRatio: 1.0,
  },
});

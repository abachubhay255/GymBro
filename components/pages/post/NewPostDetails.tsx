import {StackScreenProps} from '@react-navigation/stack';
import {
  TopNavigationAction,
  TopNavigation,
  Text,
  Layout,
  Input,
  ListItem,
  Avatar,
  List,
  Autocomplete,
  AutocompleteItem,
  Button,
  Icon,
} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {Image, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Users} from '../../data/users';
import {useUser} from '../../hooks/useUser';
import {PostParamList} from '../Navigation';
import {BackIcon} from '../profile/extra/icons';
import {POST_HEIGHT} from './Post';
import KeyboardAwareView from '../../utils/KeyboardAwareView';
import {ScrollView} from 'react-native-gesture-handler';
import {CurrentUserContext} from '../../Main';
import {PostType} from '../post/Post';
import {PostsContext} from '../../DataContext';

type Props = StackScreenProps<PostParamList, 'NewPostDetails'>;

export default function NewPostDetails({navigation, route}: Props) {
  const {currentUser} = useContext(CurrentUserContext);
  const {postData, setPostData} = useContext(PostsContext);
  const photos = route.params.photos;
  const taggedUsers = route.params.taggedUsers;
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  const renderUserItem = ({
    item,
  }: ListRenderItemInfo<string>): React.ReactElement => {
    const User = useUser(item);
    return (
      <ListItem
        title={User.firstName + ' ' + User.lastName}
        description={`@${User.username}`}
        accessoryLeft={() => <Avatar source={{uri: User.data.profilePic}} />}
      />
    );
  };

  const onBackButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );

  const goToProfile = (username: string) => {
    navigation && (navigation as any).navigate('Profile', {username: username});
  };

  const createPost = () => {
    const post: PostType = {
      username: currentUser.username,
      timestamp: new Date(),
      caption: caption,
      likes: [],
      comments: [],
      photos: photos,
      location: location === '' ? undefined : location,
      tags: taggedUsers?.length === 0 ? undefined : taggedUsers,
    };
    setPostData([post, ...postData]);
    goToProfile(currentUser.username);
  };

  return (
    <>
      <TopNavigation
        accessoryLeft={BackAction}
        title={() => <Text style={{fontWeight: 'bold'}}>New Post</Text>}
        alignment="center"
      />
      <Layout>
        <Image
          style={{height: 380, width: 380, alignSelf: 'center'}}
          source={{uri: photos[0]}}
        />
        <Input
          style={styles.input}
          status="control"
          placeholder="Write a caption"
          value={caption}
          onChangeText={setCaption}
        />
        <Input
          style={styles.input}
          status="control"
          placeholder="Add location"
          value={location}
          onChangeText={setLocation}
        />
        <Button
          style={styles.button}
          status="primary"
          appearance="outline"
          accessoryRight={<Icon name="people" />}
          onPress={() =>
            navigation.navigate('NewPostTagging', {
              photos: photos,
              taggedUsers: taggedUsers,
            })
          }>
          Tag people
        </Button>
        <Text category="s1" style={{fontWeight: 'bold', alignSelf: 'center'}}>
          Tags
        </Text>
      </Layout>
      <List data={taggedUsers} renderItem={renderUserItem} />
      <Layout>
        <Button
          style={styles.button}
          status="primary"
          appearance="filled"
          accessoryRight={<Icon name="checkmark-circle-2" />}
          onPress={createPost}>
          Post
        </Button>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
});

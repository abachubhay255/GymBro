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
import React, {useEffect, useState} from 'react';
import {Image, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Users} from '../../data/users';
import {useUser} from '../../hooks/useUser';
import {PostParamList} from '../Navigation';
import {BackIcon} from '../profile/extra/icons';
import {POST_HEIGHT} from './Post';
import KeyboardAwareView from '../../utils/KeyboardAwareView';
import {ScrollView} from 'react-native-gesture-handler';

type Props = StackScreenProps<PostParamList, 'NewPostDetails'>;

export default function NewPostDetails({navigation, route}: Props) {
  const photos = route.params.photos;
  const taggedUsers = route.params.taggedUsers;

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
        />
        <Input
          style={styles.input}
          status="control"
          placeholder="Add location"
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
          accessoryRight={<Icon name="checkmark-circle-2" />}>
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

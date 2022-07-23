import {StackScreenProps} from '@react-navigation/stack';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
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
import React, {useEffect, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Users, UserType} from '../../data/users';
import {useUser} from '../../hooks/useUser';
import KeyboardAwareView from '../../utils/KeyboardAwareView';
import {PostParamList} from '../Navigation';
import {BackIcon} from '../profile/extra/icons';

type Props = StackScreenProps<PostParamList, 'NewPostTagging'>;

export default function NewPostTagging({navigation, route}: Props) {
  const styles = useStyleSheet(themedStyles);
  const [taggedUsers, setTaggedUsers] = useState<string[]>(
    route.params.taggedUsers ?? [],
  );
  const allUsers = [...Users].map(u => u.username);

  const [searchedUsers, setSearchedUsers] = useState(allUsers);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    setSearchedUsers(
      allUsers.filter(username => {
        const User = useUser(username);
        return (
          User.firstName.toLowerCase().includes(normalizedQuery) ||
          User.lastName.toLowerCase().includes(normalizedQuery) ||
          username.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [searchQuery]);
  const renderSelectButton = (isSelected: boolean) => (
    <View
      style={
        !isSelected
          ? styles.userSelector
          : [styles.userSelector, styles.selectedUser]
      }></View>
  );
  const renderProfilePic = (source: string) => (
    <Avatar source={{uri: source}} />
  );
  const renderUserItem = ({
    item,
  }: ListRenderItemInfo<string>): React.ReactElement => {
    const User = useUser(item);
    const isSelected = taggedUsers.includes(User.username);
    const selectUser = () => {
      isSelected
        ? setTaggedUsers(taggedUsers.filter(u => u !== User.username))
        : setTaggedUsers([...taggedUsers, User.username]);
    };
    return (
      <ListItem
        title={User.firstName + ' ' + User.lastName}
        description={`@${User.username}`}
        accessoryLeft={() => renderProfilePic(User.data.profilePic)}
        accessoryRight={() => renderSelectButton(isSelected)}
        onPress={selectUser}
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
        <Button
          status="primary"
          appearance="filled"
          onPress={() =>
            navigation.navigate('NewPostDetails', {
              photos: route.params.photos,
              taggedUsers: taggedUsers,
            })
          }>
          Done
        </Button>

        <Input
          style={styles.searchBar}
          status="control"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Layout>

      <List
        keyboardShouldPersistTaps="handled"
        data={searchedUsers}
        renderItem={renderUserItem}
      />
    </>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  userSelector: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'color-control-default',
  },
  selectedUser: {
    backgroundColor: 'color-primary-default',
  },
});

import {StackHeaderProps} from '@react-navigation/stack';
import {
  TopNavigationAction,
  TopNavigation,
  Divider,
  Avatar,
  Icon,
} from '@ui-kitten/components';
import React from 'react';
import {ImageBackground} from 'react-native';
import {useUser} from '../../hooks/useUser';

export default function MessagesHeader({navigation, route}: StackHeaderProps) {
  const {username} = route.params as {username: string};
  const User = useUser(username);
  const renderProfileAction = () => (
    <TopNavigationAction
      icon={() => (
        <Avatar
          source={{
            uri: User.data.profilePic,
          }}
          ImageComponent={ImageBackground}
        />
      )}
      onPress={() => navigation.navigate('Profile', {username: username})}
    />
  );

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<Icon name="arrow-back" />}
      onPress={() => navigation.goBack()}
    />
  );

  return (
    <>
      <TopNavigation
        title={User.firstName + ' ' + User.lastName}
        subtitle={'@' + username}
        accessoryLeft={renderBackAction}
        accessoryRight={renderProfileAction}
        alignment="center"
      />
      <Divider />
    </>
  );
}

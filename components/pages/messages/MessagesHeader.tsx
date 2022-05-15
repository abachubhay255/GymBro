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
import {ProfilePics} from './data';

export default function MessagesHeader({navigation, route}: StackHeaderProps) {
  const {username} = route.params as {username: string};
  const renderProfileAction = () => (
    <TopNavigationAction
      icon={() => (
        <Avatar
          source={{
            uri: ProfilePics.get(username),
          }}
          ImageComponent={ImageBackground}
        />
      )}
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
        title={username}
        subtitle="Last seen just now"
        accessoryLeft={renderBackAction}
        accessoryRight={renderProfileAction}
        alignment="center"
      />
      <Divider />
    </>
  );
}

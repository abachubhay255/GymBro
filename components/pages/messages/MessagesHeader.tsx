import {NavigationProp, useNavigation} from '@react-navigation/native';
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

type Props = {
  username: string
}

export default function MessagesHeader({username}: Props) {
  const navigation = useNavigation<NavigationProp<any>>();
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
      onPress={() =>
        navigation.navigate('Profile', {
          screen: 'ProfileHome',
          params: {username: username},
        })
      }
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

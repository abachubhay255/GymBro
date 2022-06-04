import {
  NavigationProp,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {StackHeaderProps, StackNavigationProp} from '@react-navigation/stack';
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
import { MessagesParamList } from '../Navigation';

type Props = {
  username: string;
};

export default function MessagesHeader({username}: Props) {
  const navigation =
    useNavigation<StackNavigationProp<MessagesParamList, 'Conversation'>>();
  const route = useRoute();
  const User = useUser(username);

  const goToProfile = () => {
    navigation &&
      navigation.push('UserProfile', {
        screen: 'Profile',
        params: {username: username},
      });
  };

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
      onPress={goToProfile}
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

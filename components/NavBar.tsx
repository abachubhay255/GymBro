import React, {ReactElement, useContext} from 'react';
import {
  Avatar,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useUser} from './hooks/useUser';
import {UserContext} from '../App';

const SettingsIcon = <Icon name="settings-outline" />;

type Props = {
  drawerNavigation: any;
  tabRoute: any;
  titleElement?: ReactElement;
};

export default function NavBar({
  drawerNavigation,
  tabRoute,
  titleElement,
}: Props) {
  const {user} = useContext(UserContext);
  const User = useUser(user?.username ?? '');

  const ProfileIcon = () => (
    <Avatar
      source={{
        uri: User.data.profilePic,
      }}
    />
  );
  const renderProfileAction = () => (
    <TopNavigationAction
      icon={ProfileIcon}
      onPress={() => drawerNavigation.openDrawer()}
    />
  );

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} />
  );

  return (
    <>
      <TopNavigation
        title={titleElement ? titleElement : tabRoute.name}
        accessoryLeft={renderProfileAction}
        accessoryRight={renderSettingsAction}
        alignment="center"
      />
      <Divider />
    </>
  );
}

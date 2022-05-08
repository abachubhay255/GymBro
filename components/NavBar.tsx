import React, {useContext} from 'react';
import {
  Avatar,
  AvatarProps,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {DrawerHeaderProps} from '@react-navigation/drawer';

const SettingsIcon = <Icon name="settings-outline" />;

export const ProfilePic = (props: any) => (
  <Avatar
    {...props}
    source={{
      uri: 'https://yt3.ggpht.com/uiFj7wHnDE-2Ezn93eQ8lNM8PFKK2_NJnkOIS4Q9lJ0IOId4INAmelmuqBUaU4SsWsBTSrrgoRU=s88-c-k-c0x00ffffff-no-rj',
    }}
  />
);

const ProfileIcon = () => (
  <Avatar
    source={{
      uri: 'https://yt3.ggpht.com/uiFj7wHnDE-2Ezn93eQ8lNM8PFKK2_NJnkOIS4Q9lJ0IOId4INAmelmuqBUaU4SsWsBTSrrgoRU=s88-c-k-c0x00ffffff-no-rj',
    }}
  />
);

export default function NavBar({navigation}: DrawerHeaderProps) {
  const renderProfileAction = () => (
    <TopNavigationAction
      icon={ProfileIcon}
      onPress={() => navigation.openDrawer()}
    />
  );

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} />
  );

  return (
    <>
      <TopNavigation
        title="GymBro"
        accessoryLeft={renderProfileAction}
        accessoryRight={renderSettingsAction}
        alignment="center"
      />
      <Divider />
    </>
  );
}

import React, {ReactElement, useContext} from 'react';
import {
  Avatar,
  AvatarProps,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';

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

import React, {useRef} from 'react';
import {
  Avatar,
  Drawer,
  DrawerItem,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const SettingsIcon = <Icon name="settings-outline" />;

const renderProfile = () => (
  <Avatar source={{uri: 'https://reactjs.org/logo-og.png'}} />
);

export default function NavBar() {
  const drawer = useRef(null);

  const renderDrawer = () => {
    return (
      <Drawer ref={drawer} header={<Text>Profile</Text>}>
        <DrawerItem title="Users" />
        <DrawerItem title="Orders" />
        <DrawerItem title="Transactions" />
        <DrawerItem title="Settings" />
      </Drawer>
    );
  };

  const renderProfileAction = () => (
    <TopNavigationAction icon={renderProfile} /> // TODO: Drawer Navigation using React Navigation
  );

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} />
  );

  return (
    <TopNavigation
      title="Notifications"
      accessoryLeft={renderProfileAction}
      accessoryRight={renderSettingsAction}
      alignment="center"
    />
  );
}

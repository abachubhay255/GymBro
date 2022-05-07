import React, {useContext} from 'react';
import {
  Avatar,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {TabContext} from './ProfileDrawer';

const SettingsIcon = <Icon name="settings-outline" />;

const renderProfile = () => (
  <Avatar source={{uri: 'https://reactjs.org/logo-og.png'}} />
);

export default function NavBar({navigation}: DrawerHeaderProps) {
  const {currentTab} = useContext(TabContext);

  const renderProfileAction = () => (
    <TopNavigationAction
      icon={renderProfile}
      onPress={() => navigation.openDrawer()}
    />
  );

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} />
  );

  return (
    <>
      <TopNavigation
        title={currentTab}
        accessoryLeft={renderProfileAction}
        accessoryRight={renderSettingsAction}
        alignment="center"
      />
      <Divider />
    </>
  );
}

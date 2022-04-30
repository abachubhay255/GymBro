import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const HomeIcon = <Icon name="home-outline" />;

const BellIcon = <Icon name="bell-outline" />;

const MessageIcon = <Icon name="message-square-outline" />;

export default function BottomTabs() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={BellIcon} />
      <BottomNavigationTab icon={MessageIcon} />
    </BottomNavigation>
  );
}

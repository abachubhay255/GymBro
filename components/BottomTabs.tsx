import React, {useContext, useEffect} from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

type Tab = 'Home' | 'Workouts' | 'Notifications' | 'Messages';
const tabs: Tab[] = ['Home', 'Workouts', 'Notifications', 'Messages'];

const HomeIcon = (filled: boolean) => (
  <Icon name={`home${filled ? '' : '-outline'}`} />
);

const WorkoutIcon = (filled: boolean) => (
  <Icon name={`flash${filled ? '' : '-outline'}`} />
);
const BellIcon = (filled: boolean) => (
  <Icon name={`bell${filled ? '' : '-outline'}`} />
);

const MessageIcon = (filled: boolean) => (
  <Icon name={`message-square${filled ? '' : '-outline'}`} />
);

export default function BottomTabs({navigation}: BottomTabBarProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    navigation.navigate(tabs[selectedIndex]);
  }, [selectedIndex]);

  return (
    <BottomNavigation
      style={{backgroundColor: 'black', marginTop: 3}}
      appearance="noIndicator"
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}>
      <BottomNavigationTab icon={HomeIcon(selectedIndex === 0)} />
      <BottomNavigationTab icon={WorkoutIcon(selectedIndex === 1)} />
      <BottomNavigationTab icon={BellIcon(selectedIndex === 2)} />
      <BottomNavigationTab icon={MessageIcon(selectedIndex === 3)} />
    </BottomNavigation>
  );
}

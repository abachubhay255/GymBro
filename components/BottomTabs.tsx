import React, {useContext, useEffect} from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

type Tab = 'Home' | 'Workouts' | 'Notifications' | 'Messages';
export const TABS: Tab[] = ['Home', 'Workouts', 'Notifications', 'Messages'];

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

export default function BottomTabs({state, navigation}: BottomTabBarProps) {
  return (
    <BottomNavigation
      style={{backgroundColor: 'black', marginTop: 3}}
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(TABS[index])}>
      <BottomNavigationTab icon={HomeIcon(state.index === 0)} />
      <BottomNavigationTab icon={WorkoutIcon(state.index === 1)} />
      <BottomNavigationTab icon={BellIcon(state.index === 2)} />
      <BottomNavigationTab icon={MessageIcon(state.index === 3)} />
    </BottomNavigation>
  );
}

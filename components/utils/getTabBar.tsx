import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import BottomTabs, {TABS} from '../BottomTabs';

export function getTabBar({
  state,
  navigation,
  ...restProps
}: BottomTabBarProps) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const currentTab = TABS[state.index];
  const currentRoute =
    state.routes.find(route => route.name === currentTab) ?? state.routes[0];
  const routeName = getFocusedRouteNameFromRoute(currentRoute) ?? 'Home';

  switch (routeName) {
    case 'Home':
    case 'Feed':
    case 'ExploreWorkouts':
    case 'MessageList':
      return <BottomTabs {...{state, navigation, ...restProps}} />;
    default:
      return <></>;
  }
}

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Drawer, DrawerItem, Icon, Text} from '@ui-kitten/components';
import React, {createContext, useState} from 'react';
import NavBar from './NavBar';
import Page from './pages/Page';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export type Tab = 'Home' | 'Notifications' | 'Messages' | 'Workouts';

export const TabContext = createContext<{
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}>({
  currentTab: 'Home',
  setCurrentTab: (tab: Tab) => {},
});

export default function ProfileDrawer() {
  const [currentTab, setCurrentTab] = useState<Tab>('Home');

  const renderDrawer = ({navigation}: any) => {
    return (
      <Drawer>
        <DrawerItem
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <DrawerItem
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </Drawer>
    );
  };

  const NavDrawer = createDrawerNavigator();

  return (
    <TabContext.Provider
      value={{currentTab: currentTab, setCurrentTab: setCurrentTab}}>
      <NavigationContainer>
        <NavDrawer.Navigator
          initialRouteName="Page"
          drawerContent={renderDrawer}
          screenOptions={{header: NavBar}}>
          <NavDrawer.Screen name="Page" component={Page} />
          <NavDrawer.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <NavDrawer.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
        </NavDrawer.Navigator>
      </NavigationContainer>
    </TabContext.Provider>
  );
}

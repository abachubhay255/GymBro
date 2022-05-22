import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserContext} from '../App';
import {useUser} from './hooks/useUser';
import Page from './pages/Page';
import Profile from './pages/profile/Profile';
import Settings from './pages/Settings';

export default function AppDrawer() {
  const {user} = useContext(UserContext);
  const User = useUser(user?.username ?? '');

  const renderHeader = () => {
    return (
      <>
        <Layout style={styles.header}>
          <View style={styles.heading}>
            <Avatar
              size="giant"
              source={{
                uri: User.data.profilePic,
              }}
            />
            <View style={styles.user}>
              <Text category="h6">{User.firstName + ' ' + User.lastName}</Text>
              <Text category="s1" appearance="hint">
                {'@' + user?.username}
              </Text>
            </View>
          </View>

          <View style={styles.follow}>
            <Text style={styles.following} category="s1" appearance="hint">
              <Text>{User.data.following}</Text> Following
            </Text>
            <Text style={styles.follower} category="s1" appearance="hint">
              <Text>{User.data.followers}</Text> Followers
            </Text>
          </View>
        </Layout>
        <Divider />
      </>
    );
  };

  const renderDrawer = ({navigation}: any) => {
    return (
      <Drawer header={renderHeader}>
        <DrawerItem
          title="Profile"
          accessoryLeft={<Icon name="person-outline" />}
          onPress={() => navigation.navigate('Profile')}
        />
        <DrawerItem
          title="Settings"
          accessoryLeft={<Icon name="settings-outline" />}
          onPress={() => navigation.navigate('Settings')}
        />
      </Drawer>
    );
  };

  const NavDrawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <NavDrawer.Navigator
        initialRouteName="Page"
        drawerContent={renderDrawer}
        screenOptions={{headerShown: false}}>
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
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 5,
  },
  heading: {
    flexDirection: 'row',
  },
  profilepic: {
    marginHorizontal: 10,
  },
  user: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  follow: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  following: {
    marginHorizontal: 5,
  },
  follower: {
    marginHorizontal: 5,
  },
});

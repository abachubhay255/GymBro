import React, {createContext, useState} from 'react';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './theme.json';
import BottomTabs from './components/BottomTabs';
import Login from './components/Login';
import Main from './components/Main';
import LoginNavigator from './components/LoginNavigator';

export type User = {
  username: string;
  password: string;
};

export type Tab = 'Home' | 'Notifications' | 'Messages' | 'Workouts';

export const UserContext = createContext<{
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}>({
  user: undefined,
  setUser: (user: User | undefined) => {},
});

export default function App() {
  const [user, setUser] = useState<User | undefined>();
  const [currentTab, setCurrentTab] = useState<Tab>('Home');

  const userValue = {
    user: user,
    setUser: setUser,
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <UserContext.Provider value={userValue}>
          {user ? (
            <>
              <Main currentTab={currentTab} />
              <BottomTabs setCurrentTab={setCurrentTab} />
            </>
          ) : (
            <LoginNavigator />
          )}
        </UserContext.Provider>
      </ApplicationProvider>
    </>
  );
}

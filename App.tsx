import React, {createContext, useState} from 'react';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './theme.json';
import Main from './components/Main';
import LoginNavigator from './components/LoginNavigator';

export type User = {
  username: string;
  password: string;
};

export const UserContext = createContext<{
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}>({
  user: undefined,
  setUser: (user: User | undefined) => {},
});

export default function App() {
  const [user, setUser] = useState<User | undefined>();

  const userValue = {
    user: user,
    setUser: setUser,
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <UserContext.Provider value={userValue}>
          {user ? <Main /> : <LoginNavigator />}
        </UserContext.Provider>
      </ApplicationProvider>
    </>
  );
}

import React, {createContext, useState} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Home from './components/Home';
import BottomTabs from './components/BottomTabs';
import Login from './components/Login';

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
      <ApplicationProvider {...eva} theme={eva.dark}>
        <UserContext.Provider value={userValue}>
          {user ? (
            <>
              <Home />
              <BottomTabs />
            </>
          ) : (
            <Login />
          )}
        </UserContext.Provider>
      </ApplicationProvider>
    </>
  );
}

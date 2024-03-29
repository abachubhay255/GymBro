import React, {createContext, StrictMode, useEffect, useState} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './theme.json';
import Main from './components/Main';
import AuthNavigator from './components/auth/AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loggedInUser');
      jsonValue != null && setUser(JSON.parse(jsonValue) as User);
    } catch (e) {
      throw new Error('Error readiing async storage');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const userValue = {
    user: user,
    setUser: setUser,
  };

  return (
    <StrictMode>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <UserContext.Provider value={userValue}>
          {user ? <Main /> : <AuthNavigator />}
        </UserContext.Provider>
      </ApplicationProvider>
    </StrictMode>
  );
}

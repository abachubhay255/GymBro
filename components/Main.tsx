import React, {createContext, useContext, useState} from 'react';
import {UserContext} from '../App';
import AppDrawer from './AppDrawer';
import DataContext from './DataContext';

export type CurrentUser = {
  username: string;
};

export const CurrentUserContext = createContext<{
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
}>({
  currentUser: {username: ''},
  setCurrentUser: (currentUser: CurrentUser) => {},
});

export default function Main() {
  const {user: loggedInUser} = useContext(UserContext);
  const [user, setUser] = useState<CurrentUser>();

  const userValue = {
    currentUser: loggedInUser ?? {username: 'spiderman'},
    setCurrentUser: setUser,
  };

  return (
    <CurrentUserContext.Provider value={userValue}>
      <DataContext>
        <AppDrawer />
      </DataContext>
    </CurrentUserContext.Provider>
  );
}

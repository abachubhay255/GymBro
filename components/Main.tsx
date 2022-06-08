import React, {createContext, useContext, useState} from 'react';
import {UserContext} from '../App';
import AppDrawer from './AppDrawer';
import {MessageDataItem, SpidermanMessageData} from './data/messages';
import {useUser} from './hooks/useUser';

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

export const MessagesContext = createContext<{
  messageData: MessageDataItem[];
  setMessageData: (messageData: MessageDataItem[]) => void;
}>({
  messageData: SpidermanMessageData,
  setMessageData: (messageData: MessageDataItem[]) => {},
});

export default function Main() {
  const {user: loggedInUser} = useContext(UserContext);
  const [user, setUser] = useState<CurrentUser>();
  const messages = useUser(loggedInUser?.username ?? 'spiderman').data.messages;
  const [messageData, setMessageData] = useState<MessageDataItem[]>(messages);

  const userValue = {
    currentUser: loggedInUser ?? {username: 'spiderman'},
    setCurrentUser: setUser,
  };

  const messagesValue = {
    messageData: messageData,
    setMessageData: setMessageData,
  };
  return (
    <CurrentUserContext.Provider value={userValue}>
      <MessagesContext.Provider value={messagesValue}>
        <AppDrawer />
      </MessagesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

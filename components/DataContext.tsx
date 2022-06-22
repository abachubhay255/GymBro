import React, {createContext, useContext, useState} from 'react';
import {UserContext} from '../App';
import {MessageDataItem, SpidermanMessageData} from './data/messages';
import {SpidermanPosts} from './data/posts';
import {useUser} from './hooks/useUser';
import {PostType} from './pages/post/Post';

type Props = {
  children: any;
};

export const MessagesContext = createContext<{
  messageData: MessageDataItem[];
  setMessageData: (messageData: MessageDataItem[]) => void;
}>({
  messageData: SpidermanMessageData,
  setMessageData: (messageData: MessageDataItem[]) => {},
});

export const PostsContext = createContext<{
  postData: PostType[];
  setPostData: (postData: PostType[]) => void;
}>({
  postData: SpidermanPosts,
  setPostData: (postData: PostType[]) => {},
});

export default function DataContext({children}: Props) {
  const {user} = useContext(UserContext);
  const User = useUser(user?.username ?? 'spiderman');

  const messages = User.data.messages;
  const [messageData, setMessageData] = useState<MessageDataItem[]>(messages);
  const messagesValue = {
    messageData: messageData,
    setMessageData: setMessageData,
  };

  const posts = User.data.posts;
  const [postData, setPostData] = useState<PostType[]>(posts);

  const postsValue = {
    postData: postData,
    setPostData: setPostData,
  };

  return (
    <MessagesContext.Provider value={messagesValue}>
      <PostsContext.Provider value={postsValue}>
        {children}
      </PostsContext.Provider>
    </MessagesContext.Provider>
  );
}

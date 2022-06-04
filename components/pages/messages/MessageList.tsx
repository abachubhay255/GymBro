import React, {useContext, useEffect, useState} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Input,
  Layout,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import NavBar from '../../NavBar';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import MessageListItem from './MessageListItem';
import {MessageDataItem} from '../../data/messages';
import {useUser} from '../../hooks/useUser';
import {UserContext} from '../../../App';
import { MessagesParamList } from '../Navigation';

type Props = StackScreenProps<MessagesParamList, 'MessageList'>;

export default function MessageList({navigation}: Props) {
  const styles = useStyleSheet(themedStyles);
  const drawerNav = useNavigation().getParent()?.getParent();
  const tabRoute = useRoute();
  const {user} = useContext(UserContext);
  const User = useUser(user?.username ?? '');
  const MessageData = User.data.messages;
  const [searchedMessages, setSearchedMessages] = useState(MessageData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    setSearchedMessages(
      MessageData.filter(message => {
        const messageUser = useUser(message.username);
        return (
          messageUser.firstName.toLowerCase().includes(normalizedQuery) ||
          messageUser.lastName.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [searchQuery]);

  const onItemPress = (username: string): void => {
    navigation && navigation.navigate('Conversation', {username: username});
  };

  const onProfilePress = (username: string): void => {
    navigation &&
      navigation.push('UserProfile', {
        screen: 'Profile',
        params: {username: username},
      });
  };

  const renderItem = (
    info: ListRenderItemInfo<MessageDataItem>,
  ): React.ReactElement => (
    <MessageListItem
      style={styles.item}
      messageData={info.item}
      onPress={() => onItemPress(info.item.username)}
      onProfilePress={() => onProfilePress(info.item.username)}
    />
  );

  return (
    <>
      <NavBar
        drawerNavigation={drawerNav}
        tabRoute={tabRoute}
        titleElement={
          <Layout level="1">
            <Input
              style={styles.searchBar}
              status="control"
              size="small"
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Layout>
        }
      />

      <List
        style={styles.list}
        data={searchedMessages}
        renderItem={renderItem}
      />
    </>
  );
}

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  searchBar: {
    width: 290,
    paddingLeft: 15,
    borderRadius: 100,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});

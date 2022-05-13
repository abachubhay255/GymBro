import React, {useContext, useEffect, useState} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Input,
  Layout,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {MessagesParamList} from './MessagesNavigator';
import NavBar from '../../NavBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MessageType} from './conversation/Message';
import MessageListItem from './MessageListItem';

export const initialMessages: MessageType[] = [
  {
    text: 'If your nothing without the suit, then you dont deserve it',
    username: 'Tony Stark',
    timestamp: new Date(),
  },
  {
    text: 'Do Avengers have to pay taxes?',
    username: 'Ned Leeds',
    timestamp: new Date(),
  },
  {
    text: "Josiah is so much hotter than you, I'm leaving you",
    username: 'MJ Watson',
    timestamp: new Date(),
  },
];

type Props = StackScreenProps<MessagesParamList, 'MessageList'>;

export default function MessageList({navigation}: Props) {
  const styles = useStyleSheet(themedStyles);
  const drawerNav = useNavigation().getParent()?.getParent();
  const tabRoute = useRoute();
  const [searchedMessages, setSearchedMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    setSearchedMessages(
      initialMessages.filter(message =>
        message.username.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [searchQuery]);

  const onItemPress = (): void => {
    navigation && navigation.navigate('Conversation');
  };

  const renderItem = (
    info: ListRenderItemInfo<MessageType>,
  ): React.ReactElement => (
    <MessageListItem
      style={styles.item}
      message={info.item}
      onPress={onItemPress}
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

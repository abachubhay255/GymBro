import React, {useContext} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Input,
  Layout,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {MessageItem} from './extra/message-item.component';
import {SearchIcon} from './extra/icons';
import {Message} from './extra/data';
import {StackScreenProps} from '@react-navigation/stack';
import {MessagesParamList} from './MessagesNavigator';

const initialMessages: Message[] = [
  Message.howAreYou(),
  Message.canYouSend(),
  Message.noProblem(),
];

type Props = StackScreenProps<MessagesParamList, 'MessageList'>;

export default function MessageList({navigation}: Props) {
  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = React.useState<string>();

  const onItemPress = (): void => {
    navigation && navigation.navigate('Conversation');
  };

  const renderItem = (
    info: ListRenderItemInfo<Message>,
  ): React.ReactElement => (
    <MessageItem
      style={styles.item}
      message={info.item}
      onPress={onItemPress}
    />
  );

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <Input
        placeholder="Search"
        value={searchQuery}
        accessoryRight={SearchIcon as any}
      />
    </Layout>
  );

  return (
    <List
      style={styles.list}
      data={initialMessages}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
}

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});

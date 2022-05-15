import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, ListItem, ListItemProps, Text} from '@ui-kitten/components';
import {formattedDate, MessageType} from './conversation/Message';
import {MessageDataItem, ProfilePics} from './data';

type MessageItemProps = ListItemProps & {
  message: MessageDataItem;
};

export default function MessageListItem(
  props: MessageItemProps,
): React.ReactElement {
  const {message, onPress, ...listItemProps} = props;
  const mostRecentMessage = message.messages[message.messages.length - 1];

  const renderMessageDate = () => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {formattedDate(mostRecentMessage.timestamp)}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar as any}
      source={{
        uri: ProfilePics.get(message.username),
      }}
    />
  );

  const getFormattedText = (text: string): string => {
    const isLong: boolean = text.length > 36;
    return isLong ? `${text.substring(0, 32)}...` : text;
  };

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={message.username}
      description={getFormattedText(mostRecentMessage.text ?? '')}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMessageDate}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
});

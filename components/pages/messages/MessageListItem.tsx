import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, View} from 'react-native';
import {Avatar, ListItem, ListItemProps, Text} from '@ui-kitten/components';
import {MessageDataItem} from '../../data/messages';
import {formattedDate} from './utils';
import {useUser} from '../../hooks/useUser';

type MessageItemProps = ListItemProps & {
  messageData: MessageDataItem;
  onProfilePress: ((event: GestureResponderEvent) => void) | undefined;
};

export default function MessageListItem(
  props: MessageItemProps,
): React.ReactElement {
  const {messageData, onProfilePress, onPress, ...listItemProps} = props;
  const mostRecentMessage =
    messageData.messages[messageData.messages.length - 1];
  const User = useUser(messageData.username);

  const renderMessageDate = () => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {formattedDate(mostRecentMessage.timestamp, true)}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Pressable onPress={onProfilePress}>
      <Avatar
        style={styles.avatar as any}
        source={{
          uri: User.data.profilePic,
        }}
      />
    </Pressable>
  );

  const getFormattedText = (text: string): string => {
    const isLong: boolean = text.length > 36;
    return isLong ? `${text.substring(0, 32)}...` : text;
  };

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={User.firstName + ' ' + User.lastName}
      description={getFormattedText(mostRecentMessage.text ?? 'Sent a message')}
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
    marginRight: 5,
    marginLeft: 8,
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

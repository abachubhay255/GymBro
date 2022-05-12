import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, ListItem, ListItemProps, Text} from '@ui-kitten/components';
import {MessageType} from './Message';

const profilePics = new Map();
profilePics.set(
  'Tony Stark',
  'https://i.ytimg.com/vi/Ddk9ci6geSs/maxresdefault.jpg',
);
profilePics.set(
  'Ned Leeds',
  'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/04/Jacob-Batalon-as-Ned-Leeds-in-NWH.jpg',
);
profilePics.set(
  'MJ Watson',
  'https://upload.wikimedia.org/wikipedia/en/0/0a/Zendaya_as_MJ.jpeg',
);

export type MessageItemProps = ListItemProps & {
  message: MessageType;
};

export default function MessageListItem(
  props: MessageItemProps,
): React.ReactElement {
  const {message, onPress, ...listItemProps} = props;

  const renderMessageDate = () => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {`${message.timestamp.getMinutes()} minutes ago`}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar as any}
      source={{
        uri: profilePics.get(message.username),
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
      description={getFormattedText(message.text ?? '')}
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

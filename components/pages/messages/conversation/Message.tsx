import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Avatar, Text, useStyleSheet} from '@ui-kitten/components';
import {User, UserContext} from '../../../../App';

import {formattedDate} from '../utils';
import MessageContent from './MessageContent';
import {useUser} from '../../../hooks/useUser';

export type MessageType = {
  text?: string;
  username: string;
  timestamp: Date;
  attachment?: string;
};

type MessageProps = {
  message: MessageType;
};

export default function Message({message}: MessageProps) {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(UserContext) as {user: User};
  const [showReceipt, setShowReceipt] = useState(false);

  const isMine = message.username === user.username;

  const messageProfilePic = useUser(message.username).data.profilePic;

  return (
    <View style={styles.messageWithReceipt}>
      <View
        style={[
          isMine ? styles.containerOut : styles.containerIn,
          styles.container,
        ]}>
        {!isMine && (
          <Avatar
            style={styles.avatar as any}
            source={{
              uri: messageProfilePic,
            }}
            ImageComponent={ImageBackground}
          />
        )}
        <TouchableWithoutFeedback onPress={() => setShowReceipt(!showReceipt)}>
          <MessageContent style={isMine ? styles.contentOut : styles.contentIn}>
            {message}
          </MessageContent>
        </TouchableWithoutFeedback>
      </View>
      {showReceipt && (
        <Text
          style={isMine ? styles.myDate : styles.date}
          appearance="hint"
          category="c2">
          {formattedDate(message.timestamp)}
        </Text>
      )}
    </View>
  );
}

const themedStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerIn: {
    flexDirection: 'row',
  },
  containerOut: {
    flexDirection: 'row-reverse',
  },
  contentIn: {
    backgroundColor: 'color-basic-600',
  },
  contentOut: {
    backgroundColor: 'color-primary-default',
  },
  messageWithReceipt: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  date: {
    marginHorizontal: 70,
  },
  myDate: {
    marginLeft: 'auto',
    marginHorizontal: 20,
  },
  avatar: {
    marginRight: 10,
  },
});

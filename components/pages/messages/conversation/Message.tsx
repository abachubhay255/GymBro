import React, {useContext} from 'react';
import {View} from 'react-native';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {User, UserContext} from '../../../../App';

import {formattedDate} from '../utils';
import MessageContent from './MessageContent';

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

  const isMine = message.username === user.username;

  return (
    <View
      style={[
        isMine ? styles.containerOut : styles.containerIn,
        styles.container,
        styles.message,
      ]}>
      <MessageContent style={isMine ? styles.contentOut : styles.contentIn}>
        {message}
      </MessageContent>
      <Text style={styles.date} appearance="hint" category="c2">
        {formattedDate(message.timestamp)}
      </Text>
    </View>
  );
}

const themedStyles = StyleService.create({
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
  date: {
    marginHorizontal: 18,
  },
  message: {
    marginVertical: 5,
  },
});

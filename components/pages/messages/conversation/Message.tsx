import React, {useContext} from 'react';
import {View, ViewProps} from 'react-native';
import {
  StyleService,
  StyleType,
  Text,
  TextElement,
  useStyleSheet,
} from '@ui-kitten/components';
import {User, UserContext} from '../../../../App';
import {format, isSameWeek, isSameDay, isYesterday} from 'date-fns';

export type MessageType = {
  text?: string;
  username: string;
  timestamp: Date;
  attachment?: string;
};

// @ts-ignore
export interface ChatMessageProps extends ViewProps {
  message: MessageType;
  children: (message: MessageType, style: StyleType) => React.ReactElement;
}

export const formattedDate = (date: Date): string => {
  const now = new Date();
  if (isSameDay(date, now)) {
    return format(date, 'h:mm a');
  }
  if (isYesterday(date)) {
    return 'Yesterday, ' + format(date, 'h:mm a');
  }
  if (isSameWeek(date, now)) {
    return format(date, 'eeee, h:mm a');
  }
  return format(date, 'M/d/yy, h:mm a');
};

export type ChatMessageElement = React.ReactElement<ChatMessageProps>;
export default function Message(props: ChatMessageProps) {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(UserContext) as {user: User};

  const {style, message, children, ...viewProps} = props;

  const renderDateElement = (): TextElement => (
    <Text style={styles.date} appearance="hint" category="c2">
      {formattedDate(message.timestamp)}
    </Text>
  );

  const isMine = message.username === user.username;

  const renderContentElement = (): React.ReactElement => {
    return children(message, {
      container: [isMine ? styles.contentOut : styles.contentIn],
    });
  };

  return (
    <View
      {...viewProps}
      style={[
        isMine ? styles.containerOut : styles.containerIn,
        styles.container,
        style,
      ]}>
      {renderContentElement()}
      {renderDateElement()}
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
});

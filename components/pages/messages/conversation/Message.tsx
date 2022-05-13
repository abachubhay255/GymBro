import React, {useContext} from 'react';
import {View, ViewProps} from 'react-native';
import {
  StyleService,
  StyleType,
  Text,
  TextElement,
  useStyleSheet,
} from '@ui-kitten/components';
import {ChatMessageIndicator} from './extra/chat-message-indicator.component';
import {User, UserContext} from '../../../../App';

export type MessageType = {
  text?: string;
  username: string;
  timestamp: Date;
  attachment?: string;
};
export interface ChatMessageProps extends ViewProps {
  message: MessageType;
  shouldShowIndicator: boolean;
  children: (message: MessageType, style: StyleType) => React.ReactElement;
}

export type ChatMessageElement = React.ReactElement<ChatMessageProps>;
export default function Message(props: ChatMessageProps) {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(UserContext) as {user: User};

  const {style, message, shouldShowIndicator, children, ...viewProps} = props;

  const renderDateElement = (): TextElement => (
    <Text style={styles.date} appearance="hint" category="c2">
      {message.timestamp.toDateString()}
    </Text>
  );

  const isReply = message.username !== user.username;

  const renderContentElement = (): React.ReactElement => {
    return children(message, {
      container: [isReply ? styles.contentOut : styles.contentIn],
    });
  };

  const renderIndicator = (): React.ReactElement => (
    <ChatMessageIndicator
      style={[
        isReply ? styles.indicatorOut : styles.indicatorIn,
        styles.indicator,
      ]}
      reverse={isReply}
    />
  );

  return (
    <View
      {...viewProps}
      style={[
        isReply ? styles.containerOut : styles.containerIn,
        styles.container,
        style,
      ]}>
      {shouldShowIndicator && renderIndicator()}
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
  indicator: {
    width: 6,
    height: 8,
  },
  indicatorIn: {
    backgroundColor: 'color-basic-600',
    transform: [{rotate: '-90deg'}, {translateY: 3}, {translateX: -12}],
  },
  indicatorOut: {
    backgroundColor: 'color-primary-default',
    transform: [{rotate: '90deg'}, {translateY: 3}, {translateX: 12}],
  },
});

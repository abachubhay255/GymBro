import React from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {List, ListProps, StyleType} from '@ui-kitten/components';
import {ChatMessageContent} from './extra/chat-message-content.component';
import Message, {MessageType} from './Message';

export interface ChatProps extends Omit<ListProps, 'renderItem'> {
  data: MessageType[];
  followEnd: boolean;
}

export default function Chat(props: ChatProps): React.ReactElement {
  const listRef: React.RefObject<any> = React.useRef();
  let contentHeight: number = 0;

  const {followEnd, contentContainerStyle, data, ...listProps} = props;

  const shouldShowMessageIndicator = (message: MessageType): boolean => {
    return !!message.text;
  };

  const scrollToEnd = (params: any): void => {
    scrollToOffset({offset: contentHeight, ...params});
  };

  const scrollToIndex = (params: any): void => {
    listRef.current.scrollToIndex(params);
  };

  const scrollToOffset = (params: any): void => {
    listRef.current.scrollToOffset(params);
  };

  const onContentSizeChange = (width: number, height: number): void => {
    contentHeight = height;

    props.followEnd && setTimeout(scrollToEnd, 0);

    listProps.onContentSizeChange &&
      listProps.onContentSizeChange(width, height);
  };

  const renderMessageContent = (
    message: MessageType,
    style: StyleType,
  ): React.ReactElement => (
    <ChatMessageContent style={style.container}>{message}</ChatMessageContent>
  );

  const renderMessage = (
    info: ListRenderItemInfo<MessageType>,
  ): React.ReactElement => (
    <Message style={styles.message} message={info.item}>
      {renderMessageContent}
    </Message>
  );

  return (
    <List
      ref={listRef}
      {...listProps}
      data={data}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      onContentSizeChange={onContentSizeChange}
      renderItem={renderMessage}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
  },
  message: {
    marginVertical: 4,
  },
});

import React, {useRef} from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {List, ListProps} from '@ui-kitten/components';
import Message, {MessageType} from './Message';
interface ChatProps extends Omit<ListProps, 'renderItem'> {
  data: MessageType[];
  followEnd: boolean;
}

export default function Chat({
  followEnd,
  contentContainerStyle,
  data,
  ...listProps
}: ChatProps): React.ReactElement {
  const listRef = useRef<any>();
  let contentHeight: number = 0;

  const scrollToEnd = (params: any): void => {
    scrollToOffset({offset: contentHeight, ...params});
  };

  const scrollToOffset = (params: any): void => {
    listRef.current.scrollToOffset(params);
  };

  const onContentSizeChange = (width: number, height: number): void => {
    contentHeight = height;

    followEnd && setTimeout(scrollToEnd, 0);

    listProps.onContentSizeChange &&
      listProps.onContentSizeChange(width, height);
  };

  const renderMessage = (
    info: ListRenderItemInfo<MessageType>,
  ): React.ReactElement => <Message message={info.item}></Message>;

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
});

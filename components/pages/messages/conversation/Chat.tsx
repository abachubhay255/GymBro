import React from 'react';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {List, ListProps} from '@ui-kitten/components';
import Message, {MessageType} from './Message';
interface ChatProps extends Omit<ListProps, 'renderItem'> {
  data: MessageType[];
}

export default function Chat({
  contentContainerStyle,
  data,
  ...listProps
}: ChatProps): React.ReactElement {
  const renderMessage = (
    info: ListRenderItemInfo<MessageType>,
  ): React.ReactElement => <Message message={info.item}></Message>;

  return (
    <List
      {...listProps}
      data={data}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      renderItem={renderMessage}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
  },
});

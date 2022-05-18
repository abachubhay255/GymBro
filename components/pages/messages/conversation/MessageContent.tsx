import React from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';
import {Text} from '@ui-kitten/components';
import {MessageType} from './Message';
// @ts-ignore
interface MessageContentProps extends ViewProps {
  children: MessageType;
}
export default function MessageContent({
  style,
  children,
  ...viewProps
}: MessageContentProps): React.ReactElement {
  const renderAttachment = (): React.ReactElement => (
    <Image style={styles.attachmentImage} source={{uri: children.attachment}} />
  );

  const renderText = (): React.ReactElement => (
    <Text style={styles.text} status="control">
      {children.text}
    </Text>
  );

  return (
    <View
      {...viewProps}
      style={[
        styles.container,
        style,
        children.attachment ? styles.attachmentContainer : styles.textContainer,
      ]}>
      {children.text && renderText()}
      {children.attachment && renderAttachment()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 48,
    minWidth: 48,
    maxWidth: 276,
  },
  textContainer: {
    borderRadius: 100,
  },
  attachmentContainer: {
    borderRadius: 10,
  },
  text: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  attachmentImage: {
    width: 124,
    height: 124,
  },
});

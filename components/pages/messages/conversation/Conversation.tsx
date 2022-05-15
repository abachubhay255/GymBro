import React, {useContext, useState} from 'react';
import {ImageSourcePropType, Keyboard, Platform, View} from 'react-native';
import {
  Button,
  Input,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {AttachmentsMenu} from './extra/attachments-menu.component';
import {MicIcon, PaperPlaneIcon, PlusIcon} from './extra/icons';
import {Message} from './extra/data';
import Chat from './Chat';
import {MessageType} from './Message';
import {User, UserContext} from '../../../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {MessagesParamList} from '../MessagesNavigator';
import {MessageData} from '../data';

const galleryAttachments: ImageSourcePropType[] = [
  require('./assets/image-attachment-1.png'),
  require('./assets/image-attachment-2.jpg'),
  require('./assets/image-attachment-1.png'),
  require('./assets/image-attachment-2.jpg'),
];

type Props = StackScreenProps<MessagesParamList, 'Conversation'>;
export default function Conversation({route, navigation}: Props) {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(UserContext) as {user: User};

  const loadedMessages =
    MessageData.find(data => data.username === route.params.username)
      ?.messages ?? [];

  const [messages, setMessages] = useState(loadedMessages);
  const [messageText, setMessageText] = useState('');
  const [attachmentsMenuVisible, setAttachmentsMenuVisible] =
    React.useState<boolean>(false);

  const toggleAttachmentsMenu = (): void => {
    setAttachmentsMenuVisible(!attachmentsMenuVisible);
  };

  const onSendButtonPress = (): void => {
    setMessages([
      ...messages,
      {text: messageText, username: user.username, timestamp: new Date()},
    ]);
    setMessageText('');
    Keyboard.dismiss();
  };

  const renderAttachmentsMenu = (): React.ReactElement => (
    <AttachmentsMenu
      attachments={galleryAttachments}
      onSelectPhoto={toggleAttachmentsMenu}
      onSelectFile={toggleAttachmentsMenu}
      onSelectLocation={toggleAttachmentsMenu}
      onSelectContact={toggleAttachmentsMenu}
      onAttachmentSelect={toggleAttachmentsMenu}
      onCameraPress={toggleAttachmentsMenu}
      onDismiss={toggleAttachmentsMenu}
    />
  );

  return (
    <React.Fragment>
      <Chat
        style={styles.list}
        contentContainerStyle={styles.listContent}
        followEnd={true}
        data={messages}
      />
      <View style={styles.messageInputContainer}>
        <Button
          style={[styles.iconButton, styles.attachButton]}
          accessoryLeft={PlusIcon as any}
          onPress={toggleAttachmentsMenu}
        />
        <Input
          style={styles.messageInput}
          placeholder="Message..."
          value={messageText}
          onChangeText={setMessageText}
          accessoryRight={MicIcon as any}
        />
        <Button
          appearance="ghost"
          style={[styles.iconButton, styles.sendButton]}
          accessoryLeft={PaperPlaneIcon as any}
          disabled={!(messageText && messageText.length > 0)}
          onPress={onSendButtonPress}
        />
      </View>
      {attachmentsMenuVisible && renderAttachmentsMenu()}
    </React.Fragment>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  messageInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: 'background-basic-color-1',
  },
  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  sendButton: {
    marginRight: 4,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
});

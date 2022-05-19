import React, {useContext, useState} from 'react';
import {
  ImageSourcePropType,
  Keyboard,
  Platform,
  Pressable,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {
  Button,
  Input,
  Layout,
  Popover,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {MicIcon, PaperPlaneIcon, GalleryIcon} from './Icons';
import Chat from './Chat';
import {User, UserContext} from '../../../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {MessagesParamList} from '../MessagesNavigator';
import {MessageData} from '../data';
import GalleryView from './GalleryView';
import {hasAndroidPermission} from '../../../Permissions';
import {MessageType} from './Message';

type Props = StackScreenProps<MessagesParamList, 'Conversation'>;
export default function Conversation({route, navigation}: Props) {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(UserContext) as {user: User};
  const [photos, setPhotos] = useState<any[]>([]);

  const loadedMessages =
    MessageData.find(data => data.username === route.params.username)
      ?.messages ?? [];

  const [messages, setMessages] = useState(loadedMessages);
  const [messageText, setMessageText] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  async function LoadImages() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        setPhotos(r.edges);
      })
      .catch(err => {
        console.log('error loading images');
      });
  }

  const onSendButtonPress = (): void => {
    if (selectedPhotos.length > 0) {
      const newMessages: MessageType[] = [];
      for (const photo of selectedPhotos) {
        const newMessage = {
          username: user.username,
          timestamp: new Date(),
          attachment: photo,
        };
        newMessages.push(newMessage);
      }
      setMessages([...messages, ...newMessages]);
      setSelectedPhotos([]);
      setShowGallery(false);
    } else {
      setMessages([
        ...messages,
        {text: messageText, username: user.username, timestamp: new Date()},
      ]);
      setMessageText('');
      Keyboard.dismiss();
    }
  };

  return (
    <>
      <Chat
        style={styles.list}
        contentContainerStyle={styles.listContent}
        followEnd={true}
        data={messages}
      />
      <View style={styles.messageInputContainer}>
        <Popover
          backdropStyle={styles.backdrop}
          visible={showGallery}
          anchor={() => <View style={styles.anchor} />}
          onBackdropPress={() => setShowGallery(false)}>
          <Layout style={styles.gallery}>
            <Button
              accessoryLeft={PaperPlaneIcon as any}
              disabled={selectedPhotos.length === 0}
              onPress={onSendButtonPress}
            />
            <GalleryView
              photos={photos}
              selectedPhotos={selectedPhotos}
              setSelectedPhotos={setSelectedPhotos}
            />
          </Layout>
        </Popover>
        <Button
          style={[styles.iconButton, styles.attachButton]}
          appearance="outline"
          accessoryLeft={GalleryIcon as any}
          onPress={() => {
            LoadImages();
            setShowGallery(!showGallery);
          }}
        />
        <Input
          style={styles.messageInput}
          placeholder="Message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <Button
          appearance="ghost"
          style={[styles.iconButton, styles.sendButton]}
          accessoryLeft={PaperPlaneIcon as any}
          disabled={!(messageText && messageText.length > 0)}
          onPress={onSendButtonPress}
        />
      </View>
    </>
  );
}

const themedStyles = StyleService.create({
  anchor: {
    position: 'absolute',
    bottom: 0,
  },
  gallery: {
    height: 400,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
  },
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
    marginHorizontal: 4,
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

import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {
  Button,
  Icon,
  Input,
  Layout,
  Popover,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {PaperPlaneIcon} from './Icons';
import Chat from './Chat';
import {User, UserContext} from '../../../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {SpidermanMessageData} from '../../../data/messages';
import GalleryView from './GalleryView';
import {hasAndroidPermission} from '../../../Permissions';
import {MessageType} from './Message';
import {useUser} from '../../../hooks/useUser';
import MessagesHeader from '../MessagesHeader';
import {MessagesParamList} from '../../Navigation';
import {MessagesContext} from '../../../Main';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import KeyboardAwareView from '../../../utils/KeyboardAwareView';

type Props = StackScreenProps<MessagesParamList, 'Conversation'>;
export default function Conversation({route, navigation}: Props) {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(UserContext) as {user: User};
  const User = useUser(user.username);
  const [photos, setPhotos] = useState<any[]>([]);

  const {messageData, setMessageData} = useContext(MessagesContext);

  const messages =
    messageData.find(data => data.username === route.params.username)
      ?.messages ?? [];

  const setMessages = (messages: MessageType[]) => {
    setMessageData(
      messageData.map(mData =>
        mData.username === route.params.username ? {...mData, messages} : mData,
      ),
    );
  };

  const [messageText, setMessageText] = useState('');
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['75%', '100%'], []);

  const openModal = useCallback(() => {
    LoadImages();
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

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
      closeModal();
    } else {
      setMessages([
        ...messages,
        {text: messageText, username: user.username, timestamp: new Date()},
      ]);
      setMessageText('');
      Keyboard.dismiss();
    }
  };

  const renderGalleryIcon = (props: any) => (
    <Pressable onPress={openModal}>
      <Icon {...props} name="image-outline" />
    </Pressable>
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  return (
    <Layout style={styles.container}>
      <KeyboardAwareView>
        <MessagesHeader username={route.params.username} />
        <Chat
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={[...messages].reverse()}
          inverted
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.messageInputContainer}>
          <Input
            style={styles.messageInput}
            status="control"
            accessoryRight={renderGalleryIcon}
            placeholder="Message..."
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={onSendButtonPress}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleStyle={styles.handle}
            handleIndicatorStyle={styles.handleIndicator}>
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
          </BottomSheetModal>
          <Button
            style={[styles.iconButton, styles.sendButton]}
            accessoryLeft={PaperPlaneIcon as any}
            disabled={!(messageText && messageText.length > 0)}
            onPress={onSendButtonPress}
          />
        </View>
      </KeyboardAwareView>
    </Layout>
  );
}

const themedStyles = StyleService.create({
  gallery: {
    flex: 1,
  },
  handle: {
    backgroundColor: 'color-basic-700',
  },
  handleIndicator: {
    backgroundColor: 'color-primary-default',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboard: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
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
  galleryIcon: {
    width: 24,
    height: 24,
  },
});

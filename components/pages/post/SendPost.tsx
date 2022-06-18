import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {
  Avatar,
  Button,
  Icon,
  Input,
  List,
  ListItem,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {Users, UserType} from '../../data/users';
import {useUser} from '../../hooks/useUser';
import {CurrentUserContext, MessagesContext} from '../../Main';
import {CustomBottomSheetTextInput} from '../../utils/CustomBottomSheetTextInput';
import {PaperPlaneIcon} from '../messages/conversation/Icons';
import {MessageType} from '../messages/conversation/Message';
import {PostType} from './Post';

type Props = {
  post: PostType;
};

export default function SendPost({post}: Props) {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const {currentUser} = useContext(CurrentUserContext);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['75%', '100%'], []);

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

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

  const allUsers = [...Users];

  const [searchedUsers, setSearchedUsers] = useState(allUsers);
  const [searchQuery, setSearchQuery] = useState('');

  const {messageData, setMessageData} = useContext(MessagesContext);

  const getMessages = (username: string) =>
    messageData.find(data => data.username === username)?.messages ?? [];

  const setMessages = (username: string, messages: MessageType[]) => {
    setMessageData(
      messageData.map(mData =>
        mData.username === username ? {...mData, messages} : mData,
      ),
    );
  };

  useEffect(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    setSearchedUsers(
      allUsers.filter(user => {
        return (
          user.firstName.toLowerCase().includes(normalizedQuery) ||
          user.lastName.toLowerCase().includes(normalizedQuery) ||
          user.username.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [searchQuery]);

  const renderSelectButton = (isSelected: boolean) => (
    <View
      style={
        !isSelected
          ? styles.userSelector
          : [styles.userSelector, styles.selectedUser]
      }></View>
  );
  const renderProfilePic = (source: string) => (
    <Avatar source={{uri: source}} />
  );
  const renderUserItem = ({
    item,
  }: ListRenderItemInfo<UserType>): React.ReactElement => {
    const isSelected = selectedUsers.includes(item.username);
    const selectUser = () => {
      isSelected
        ? setSelectedUsers(selectedUsers.filter(u => u !== item.username))
        : setSelectedUsers([...selectedUsers, item.username]);
    };
    return (
      <ListItem
        title={item.firstName + ' ' + item.lastName}
        description={`@${item.username}`}
        accessoryLeft={() => renderProfilePic(item.data.profilePic)}
        accessoryRight={() => renderSelectButton(isSelected)}
        onPress={selectUser}
      />
    );
  };

  const onSendButtonPress = () => {
    for (const username of selectedUsers) {
      setMessages(username, [
        ...getMessages(username),
        {
          post: post,
          username: currentUser.username,
          timestamp: new Date(),
        },
      ]);
    }
    setSelectedUsers([]);
    Keyboard.dismiss();
    closeModal();
  };

  const sendButtonText = useMemo(() => {
    if (selectedUsers.length === 0) {
      return `Send`;
    }
    if (selectedUsers.length === 1) {
      return `Send to ${selectedUsers[0]}`;
    }
    if (selectedUsers.length === 2) {
      return `Send to ${selectedUsers[0]} and ${selectedUsers[1]}`;
    }
    return `Send to ${selectedUsers[0]}, ${selectedUsers[1]}, and ${
      selectedUsers.length - 2
    } others`;
  }, [selectedUsers]);

  return (
    <>
      <Pressable onPress={openModal}>
        <Icon
          style={styles.icon}
          fill={theme['text-basic-color']}
          name="paper-plane-outline"
        />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
        android_keyboardInputMode="adjustPan"
        backgroundStyle={styles.background}
        handleStyle={styles.handle}
        handleIndicatorStyle={styles.handleIndicator}>
        <CustomBottomSheetTextInput
          style={styles.searchBar}
          status="control"
          size="small"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button
          disabled={selectedUsers.length === 0}
          onPress={onSendButtonPress}>
          {sendButtonText}
        </Button>
        <BottomSheetFlatList
          keyboardShouldPersistTaps="handled"
          data={searchedUsers}
          renderItem={renderUserItem}
        />
      </BottomSheetModal>
    </>
  );
}
const themedStyles = StyleService.create({
  background: {
    backgroundColor: 'color-basic-700',
  },
  handle: {
    backgroundColor: 'color-basic-700',
  },
  handleIndicator: {
    backgroundColor: 'color-primary-default',
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 10,
  },
  searchBar: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  userSelector: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'color-control-default',
  },
  selectedUser: {
    backgroundColor: 'color-primary-default',
  },
});

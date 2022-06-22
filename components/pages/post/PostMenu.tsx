import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {
  Button,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {Pressable} from 'react-native';
import {PostsContext} from '../../DataContext';
import {CurrentUserContext} from '../../Main';
import {PostType} from './Post';

type Props = {
  postId: number;
};

export default function PostMenu({postId}: Props) {
  const {currentUser} = useContext(CurrentUserContext);
  const {postData, setPostData} = useContext(PostsContext);
  const styles = useStyleSheet(themedStyles);

  const theme = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

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

  const deletePost = () => {
    setPostData(postData.filter((_, i) => postId !== i));
    closeModal();
  };

  return (
    <>
      <Pressable style={styles.iconContainer} onPress={openModal}>
        <Icon
          style={styles.icon}
          fill={theme['text-basic-color']}
          name="more-vertical-outline"
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
        <Button status="info" appearance="ghost">
          Edit Post
        </Button>
        <Button status="danger" onPress={deletePost}>
          Delete Post
        </Button>
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
  iconContainer: {
    marginLeft: 'auto',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

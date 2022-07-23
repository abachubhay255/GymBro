import React, {useEffect, useState} from 'react';
import {
  Button,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {hasAndroidPermission} from '../../Permissions';
import {Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import GalleryView from '../messages/conversation/GalleryView';
import {BackIcon} from '../profile/extra/icons';
import {StackScreenProps} from '@react-navigation/stack';
import {PostParamList} from '../Navigation';

type Props = StackScreenProps<PostParamList, 'NewPost'>;

export default function NewPost({navigation}: Props) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  useEffect(() => {
    LoadImages();
  }, []);

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

  const goToPostDetails = () => {
    navigation &&
      navigation.navigate('NewPostDetails', {photos: selectedPhotos});
  };

  const onBackButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackButtonPress} />
  );

  return (
    <>
      <TopNavigation
        accessoryLeft={BackAction}
        title={() => <Text style={{fontWeight: 'bold'}}>New Post</Text>}
        alignment="center"
      />
      <Button
        accessoryRight={<Icon name="arrow-forward" />}
        disabled={selectedPhotos.length === 0}
        onPress={goToPostDetails}
      />
      <GalleryView
        photos={photos}
        selectedPhotos={selectedPhotos}
        setSelectedPhotos={setSelectedPhotos}
      />
    </>
  );
}

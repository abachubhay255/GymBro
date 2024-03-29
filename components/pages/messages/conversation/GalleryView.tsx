import {List, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Pressable,
  View,
} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

type Props = {
  photos: any[];
  selectedPhotos: string[];
  setSelectedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  isBottomSheet?: boolean;
};

export default function GalleryView({
  photos,
  selectedPhotos,
  setSelectedPhotos,
  isBottomSheet,
}: Props) {
  const styles = useStyleSheet(themedStyles);

  const renderItem = ({item, index, separators}: ListRenderItemInfo<any>) => {
    const image: string = item.node.image.uri;
    const isSelected = selectedPhotos.includes(image);
    return (
      <Pressable
        key={index}
        onPress={() => {
          isSelected
            ? setSelectedPhotos(selectedPhotos.filter(p => p !== image))
            : setSelectedPhotos([...selectedPhotos, image]);
        }}>
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.image as any}
          source={{uri: image}}>
          <View
            style={[
              styles.imageSelector,
              isSelected ? styles.selectedCircle : styles.unselectedCircle,
            ]}>
            <Text category="label" style={styles.imageSelectorText}>
              {isSelected
                ? (selectedPhotos.findIndex(p => p === image) + 1).toString()
                : ''}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };
  return isBottomSheet ? (
    <BottomSheetFlatList data={photos} renderItem={renderItem} numColumns={3} />
  ) : (
    <List data={photos} renderItem={renderItem} numColumns={3} />
  );
}

const themedStyles = StyleService.create({
  imageBackground: {
    width: 125,
    height: 125,
    margin: 3,
  },
  image: {
    borderRadius: 5,
  },
  imageSelector: {
    marginTop: 4,
    marginLeft: 4,
    width: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'color-control-default',
  },
  imageSelectorText: {
    alignSelf: 'center',
    fontSize: 15,
  },
  selectedCircle: {
    backgroundColor: 'color-primary-default',
  },
  unselectedCircle: {
    backgroundColor: 'color-basic-transparent-600',
  },
});

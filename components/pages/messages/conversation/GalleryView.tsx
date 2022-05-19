import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Pressable,
  View,
} from 'react-native';

type Props = {
  photos: any[];
};

export default function GalleryView({photos}: Props) {
  const styles = useStyleSheet(themedStyles);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

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
  return (
    <Layout style={styles.gallery}>
      <FlatList data={photos} renderItem={renderItem} numColumns={3} />
    </Layout>
  );
}

const themedStyles = StyleService.create({
  gallery: {
    height: '50%',
  },
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
